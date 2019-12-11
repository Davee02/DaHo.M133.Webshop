import express from "express";
import path from "path";

const app = express();

app.use("/assets", express.static(path.join(__dirname, "frontend")));

app.set("view engine", "ejs");
app.set("views", "public");

app.get("/*", (req, res) => {
    res.render("index");
})

export const start = (port: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        app.listen(port, resolve);
    });
};