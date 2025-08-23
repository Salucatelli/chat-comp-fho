import express from "express";
import testeRoutes from "./routes/testeRoutes";

const app = express();

app.use(express.json());
app.use("/teste", testeRoutes)

export default app;