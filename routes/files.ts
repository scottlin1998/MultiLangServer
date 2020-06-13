import express from "express";
import { readdir, statSync } from "fs";
import path from "path";
const resolve = path.resolve;
const router = express.Router();
router.get("/", (req, res) => {
    const path = req.query.path as string || "./";
    console.log(path);
    readdir(path, (err, data) => {
        const result = data.map((name) => {
            try {
                const stat = statSync(resolve(path, name));
                const { size } = stat;
                const isFile = stat.isFile();
                return { name, size, isFile, ok: true }
            } catch (error) {
                return { name, ok: false, error }
            }

        });
        const dirs = result.filter(item => !item.isFile);
        const files = result.filter(item => item.isFile);
        res.json({ data: [...dirs, ...files] });
    });
});
export default router;