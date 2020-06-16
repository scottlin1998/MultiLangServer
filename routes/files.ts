import express from "express";
import { readFolder } from "./utils";
const router = express.Router();
router.get("/", (req, res) => {
    const path = req.query.path as string || "./";
    const filter: string = req.query.filter as string || ".*";
    // const filterExp = new RegExp(filter);
    // 获取指定目录下的文件
    readFolder(path, new RegExp(filter)).then((result) => {
        const dirs = result.filter(item => item.isDirectory);
        const files = result.filter(item => item.isFile);
        console.log(files,result);
        res.json([...dirs, ...files]);
    }).catch((error) => {
        res.json(error);
    });
});
export default router;