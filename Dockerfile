FROM node:22-bookworm-slim

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    ca-certificates clang g++ gcc default-jdk-headless python3 time util-linux \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd --system fzupta \
  && useradd --system --gid fzupta --home-dir /tmp/fzupta --create-home fzupta

WORKDIR /app
COPY --chown=fzupta:fzupta *.js *.css *.html package*.json .nojekyll /app/
COPY --chown=fzupta:fzupta fzu-logo.png fzu-wordmark-official.jpg fzu-brand-lockup-red.jpg /app/
COPY --chown=fzupta:fzupta weekly-practice-2-tests.zip /app/

ENV NODE_ENV=production \
    PORT=10000 \
    JUDGE_MAX_CONCURRENCY=2 \
    JUDGE_MAX_QUEUE=20 \
    JUDGE_COMPILE_TIMEOUT_MS=15000 \
    JUDGE_RUN_TIMEOUT_MS=2000 \
    JUDGE_MEMORY_LIMIT_KB=262144 \
    JUDGE_OUTPUT_LIMIT_BYTES=65536 \
    JUDGE_USE_PRLIMIT=1

USER fzupta
EXPOSE 10000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 10000) + '/api/health').then(response => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD ["node", "server.js"]
