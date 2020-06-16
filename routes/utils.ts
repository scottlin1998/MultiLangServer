import { readdir, statSync, fstat, readdirSync } from "fs";
import { resolve } from "path";

// 读取指定目录下的文件
function readFolder(path: string, filterExp: RegExp = new RegExp(".*")) {
    console.log(filterExp);

    return new Promise((res: (value?: ({
        name: string;
        size?: number;
        isFile?: boolean;
        // accessible: boolean;
        isDirectory?: boolean,
        amount?: number,
        extension: string,
        fullName: string,
        fullPath: string
    })[]) => void, rej) => {
        // 匹配名字
        const pathExp = /(.*\/)?([^/]+)(\.[^/]+)?$/;
        const nameExp = /^([^/]+)\.([^/]+)?$/;
        readdir(path, { withFileTypes: true }, (error, data) => {
            // 错误处理
            if (error) rej(error);
            // 捕捉错误
            try {
                // 返回结果储存在这里
                const result: {
                    name: string;
                    size?: number;
                    isFile?: boolean;
                    // accessible: boolean;
                    isDirectory?: boolean,
                    amount?: number,
                    extension: string,
                    fullName: string,
                    fullPath: string
                }[] = [];
                // 遍历文件基础信息
                for (let i = 0, len = data.length; i < len; i++) {
                    const fullName = data[i].name;
                    const matched = nameExp.exec(data[i].name);
                    // 解构赋值
                    const [, name, extension] = matched as string[] || [, fullName];
                    const fullPath = resolve(path, fullName);
                    // 尝试格式化
                    try {
                        // const stat = statSync(fullPath);
                        // const { size } = stat;
                        // const isFile = stat.isFile();
                        // const isDirectory = stat.isDirectory();
                        // const amount = isDirectory ? readdirSync(fullPath).length : undefined;
                        const isFile = data[i].isFile();
                        const isDirectory = data[i].isDirectory();
                        const isAccessible = isDirectory || isFile;
                        // 白名单 过滤无法访问的 文件或文件架 || 按格式过滤文件
                        if (!isAccessible || isFile && filterExp && !filterExp.test(fullName)) continue;
                        // 文件夹 -- 统计文件夹内的数据
                        if (isDirectory) {
                            // 统计白名单后的子级文件个数
                            const amount = readdirSync(fullPath, { withFileTypes: true })
                                // 筛选出 文件夹 或 符合白名单规则的文件
                                .filter((item) => item.isDirectory() || (item.isFile() && filterExp.test(item.name)))
                                .length;
                            // childDirs.filter
                            console.log(fullPath, isDirectory, isFile);
                            result.push({ name, isFile, isDirectory, amount, extension, fullName, fullPath });
                            // 文件 -- 不做其他操作
                        } else result.push({ name, isFile, isDirectory, extension, fullName, fullPath });
                    } catch (error) {
                        console.log(error);
                        result.push({ name, extension, fullName, fullPath });
                    }
                }
                // 成功执行
                res(result);
            } catch (error) {
                rej(error);
            }
        });
    });
}

export { readFolder }


