import express from "express";
import path from "path";
import files from "./routes/files";
const app = express();
app.use("/api/files",files);

export default app;