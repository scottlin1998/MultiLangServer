import express from "express";
import path from "path";
import bodyParser from "body-parser";
import files from "./routes/files";
const app = express();
app.use("/api/files",files);

export default app;