import { readdir, statSync } from "fs";
import { resolve } from "path";

// 读取指定目录下的文件
function readFolder(path: string) {
    return new Promise((res: (value?: ({
        name: string;
        size: number;
        isFile: boolean;
        ok: boolean;
        error?: undefined;
    } | {
        name: string;
        ok: boolean;
        error: any;
        size?: undefined;
        isFile?: undefined;
    })[]) => void, rej) => {
        readdir(path, (err, data) => {
            // 错误处理
            if (err) rej(err);
            const result = data.map((name) => {
                // 尝试格式化
                try {
                    const stat = statSync(resolve(path, name));
                    const { size } = stat;
                    const isFile = stat.isFile();
                    return { name, size, isFile, ok: true }
                } catch (error) {
                    return { name, ok: false, error }
                }
            });
            // 成功执行
            res(result);
        });
    });
}

export { readFolder }


