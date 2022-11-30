import express from "express";
import bp from "body-parser";
import dotenv from "dotenv";
import nunjucks from "nunjucks";
import routes from "./routes/routes.js"
dotenv.config();
const app = new express();
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server is running at port ${process.env.SERVER_PORT}`);
});

app.set("view engine", "njk");
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use('/',routes);
