# OMS × PTA 智能程序评测原型

直接双击 `index.html` 即可预览。页面包含 OMS 考生顶栏、PTA 风格的题目导航和代码工作区、教师考试管理页，以及创建/参加考试的交互。

## 自建评测机

提交代码时，浏览器只访问本站的 `POST /api/judge`。服务器在随机临时目录中完成一次编译，再逐个运行题库中的固定测试点并比较输出，不再调用 OneCompiler、DeepSeek 或其他外部判题 API。

支持的语言：

- C++：g++、clang++
- C：gcc、clang
- Java
- Python 3

评测进程具有编译时限、运行时限、内存地址空间限制、文件大小限制、进程数限制、输出长度限制和并发队列。Docker 镜像使用非 root 用户运行；每次评测结束后只清理系统临时目录下由评测机创建的随机工作目录。

## 运行

推荐使用 Docker 构建并运行，因为镜像会自动安装所需编译器：

```text
docker build -t fzupta .
docker run --rm -p 4173:10000 fzupta
```

仓库根目录提供了 `render.yaml`。在 Render 中将现有服务的 Runtime 改为 **Docker**，Dockerfile Path 保持 `./Dockerfile`，随后部署最新提交；健康检查路径使用 `/api/health`。如果该服务由 Blueprint 管理，则同步 Blueprint 即可应用同一配置。

也可以直接执行 `npm start`，但系统必须自行安装相应编译器。Windows 会依次检查 `FZUPTA_RUNTIME_ROOT`、`%USERPROFILE%\fzupta-runtime` 和项目同级的 `fzupta-runtime`；MSYS2/GCC 运行时应放在不含中文的实际路径中，目录连接仍可能被编译器解析回原路径。在 Windows 本地直接运行时仅提供超时、输出和队列限制；面向公网部署应使用 Docker/Linux 环境。

当前单容器版本通过非 root 用户和 `prlimit` 限制资源，但不提供独立网络命名空间或完整系统调用隔离。它适合受控考试和原型验证；若允许完全不可信的公网用户提交代码，应把评测工作进程迁移到独立沙箱节点，并为每次任务禁用网络、使用只读文件系统和容器级 CPU/内存限制。

可通过环境变量调整限制：`JUDGE_MAX_CONCURRENCY`、`JUDGE_MAX_QUEUE`、`JUDGE_COMPILE_TIMEOUT_MS`、`JUDGE_RUN_TIMEOUT_MS`、`JUDGE_MEMORY_LIMIT_KB`、`JUDGE_OUTPUT_LIMIT_BYTES`。

健康检查地址为 `GET /api/health`，返回本机评测机状态、支持语言和当前队列信息。
