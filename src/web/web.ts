import express from "express";
import path from "path";
import product from "../lib/product"

const products: product[] = require("../../products.json");

const app = express();

app.use("/assets", express.static(path.join(__dirname, "frontend")));

app.set("view engine", "ejs");
app.set("views", "public");

app.get("/api/product/list", (req, res) => {
    res.json(products);
})

app.get("/*", (req, res) => {
    res.render("index");
})


export const start = (port: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        app.listen(port, resolve);
    });
};