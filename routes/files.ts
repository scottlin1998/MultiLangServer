import express from "express";
import { readFolder } from "./utils";
const router = express.Router();
router.get("/", (req, res) => {
    const path = req.query.path as string || "./";
    // 获取指定目录下的文件
    readFolder(path).then((result) => {
        const dirs = result.filter(item => !item.isFile);
        const files = result.filter(item => item.isFile);
        res.json({ code: 1, content: [...dirs, ...files] });
    }).catch((err) => {
        res.json({ code: 0, err });
    });
});
export default router;