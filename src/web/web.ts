import express from "express";
import path from "path";
import product from "../lib/product";
import expressSession from "express-session";
import ShoppingCart from "../lib/shoppingCart";

const products: product[] = require("../../products.json");

const app = express();

app.use(expressSession({
    secret: "IP4.9ã.)C4;y}o5OGæahq~à}>F",
    resave: false,
    saveUninitialized: true
}));

app.use("/assets", express.static(path.join(__dirname, "frontend")));

app.get("/api/product/list", (req, res) => {
    res.json(products);
});

app.get("/api/product/:id", (req, res) => {
    const product = products.find(x => x.id === Number(req.params.id));

    if (product) {
        res.json(product);
    }
    else {
        res.sendStatus(404);
    }
});

app.get("/api/shoppingcart", (req, res) => {
    if (!req.session!.shoppingcart) {
        req.session!.shoppingcart = new ShoppingCart();
    }

    res.send(req.session!.shoppingcart);
});

app.put("/api/shoppingcart/add/:id", (req, res) => {
    const product = products.find(x => x.id === Number(req.params.id));

    if(!product) {
        res.sendStatus(400);
    }

    if (!req.session!.shoppingcart) {
        req.session!.shoppingcart = new ShoppingCart();
    }

    let shoppingcart = req.session!.shoppingcart as ShoppingCart;
    shoppingcart.allProducts = [...shoppingcart.allProducts, product!];

    res.send();
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

export const start = (port: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        app.listen(port, resolve);
    });
};