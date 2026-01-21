import express from "express";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: 'http://localhost:3001', // Allow requests only from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow sending cookies/authentication headers
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/", authRoutes)

export default app;