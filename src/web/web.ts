import express from "express";
import path from "path";
import product from "../lib/product";
import expressSession from "express-session";
import ShoppingCart from "../lib/shoppingCart";
import CheckoutInformation from "../lib/checkoutInformation";

const products: product[] = require("../../products.json");

const app = express();

app.use(
  expressSession({
    secret: "IP4.9ã.)C4;y}o5OGæahq~à}>F",
    resave: false,
    saveUninitialized: true
  })
);
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "frontend")));

app.get("/api/product/list", (req, res) => {
  res.json(products);
});

app.get("/api/product/:id", (req, res) => {
  const product = products.find(x => x.id === Number(req.params.id));

  if (product) {
    res.json(product);
    return;
  }

  res.sendStatus(404);
});

app.get("/api/shoppingcart", (req, res) => {
  if (!req.session!.shoppingcart) {
    req.session!.shoppingcart = new ShoppingCart();
  }

  res.send(req.session!.shoppingcart);
});

app.get("/api/shoppingcart/price", (req, res) => {
  if (!req.session!.shoppingcart) {
    req.session!.shoppingcart = new ShoppingCart();
  }

  let cart = req.session!.shoppingcart;
  cart.getTotalPrice = new ShoppingCart().getTotalPrice;

  res.send(cart.getTotalPrice() + "");
});

app.put("/api/shoppingcart/add/:id", (req, res) => {
  const product = products.find(x => x.id === Number(req.params.id));

  if (!product) {
    res.sendStatus(400);
    return;
  }

  if (!req.session!.shoppingcart) {
    req.session!.shoppingcart = new ShoppingCart();
  }

  let shoppingcart = req.session!.shoppingcart as ShoppingCart;
  shoppingcart.allProducts = [...shoppingcart.allProducts, product!];

  res.sendStatus(200);
});

app.put("/api/shoppingcart/remove/:id", (req, res) => {
  const product = products.find(x => x.id === Number(req.params.id));

  if (!product) {
    res.sendStatus(400);
    return;
  }

  if (!req.session!.shoppingcart) {
    req.session!.shoppingcart = new ShoppingCart();
  }

  let shoppingcart = req.session!.shoppingcart as ShoppingCart;
  shoppingcart.allProducts.splice(
    shoppingcart.allProducts.findIndex(p => p.id === product.id),
    1
  );

  res.sendStatus(200);
});

app.post("/api/checkout", (req, res) => {
  let checkout = req.body as CheckoutInformation;

  if (isCheckoutInformationValid(checkout)) {
    req.session!.shoppingcart = new ShoppingCart();
    res.sendStatus(200);
    return;
  }

  res.sendStatus(400);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

function isCheckoutInformationValid(checkout: CheckoutInformation): boolean {
  if (
    checkout.firstname &&
    checkout.lastname &&
    checkout.email &&
    checkout.phone &&
    checkout.email.includes("@") &&
    /^\d*$/.test(checkout.phone)
  ) {
    return true;
  }

  return false;
}

export const start = (port: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve);
  });
};
