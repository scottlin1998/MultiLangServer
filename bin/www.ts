// 表明是node可执行文件
// #!/usr/bin/env node

// 引入上面导出的app实例
import app from "../app";
import http from "http";

// 设置端口号
// var port = normalizePort(process.env.PORT || '3000');
const PORT = 1998;
app.set('port', PORT);

// 启动工程
const server = http.createServer(app);

// 监听端口号
server.listen(PORT);
server.on('error', () => {
    console.log("onError");
});
server.on('listening', () => {
    console.log("onListening");
});