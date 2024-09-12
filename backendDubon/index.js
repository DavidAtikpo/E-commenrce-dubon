import bodyParser from "body-parser";
import express from "express";
import dbConnect  from "./config/dbConfig.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js"
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRouter.js"
import morgan from "morgan";
import blogRoute from "./routes/blogRoute.js"
import prodcategoryRoute from "./routes/prodcategoryRoute.js"
import blogCatRoute from "./routes/blogCatRoute.js"
import cors from 'cors'


const app = express();
const PORT = process.env.PORT || 4000;
dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(
  {
    origin:["http://localhost:3000"],
    methods:["POST","GET","DELETE","PUT"],
    credentials:true
  }
))
app.use(cookieParser())


app.use("/api/blog",blogRoute)
app.use("/api/prodcategory",prodcategoryRoute)
app.use("/api/blogcategory",blogCatRoute)
app.use("/api/user",authRouter)
app.use("/api/product",productRouter)
app.use("/", (req, res) => {
  res.send("Hello from the server side");
});
app.use(errorHandler.notFound)
app.use(errorHandler.errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
