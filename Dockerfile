FROM node:22-bookworm-slim

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    bzip2 ca-certificates clang curl g++ gcc default-jdk-headless pypy3 python3 time util-linux \
  && rm -rf /var/lib/apt/lists/* \
  && architecture="$(dpkg --print-architecture)" \
  && case "$architecture" in \
       amd64) pypy2_archive='pypy2.7-v7.3.22-linux64.tar.bz2'; pypy2_sha='c47a4030542cbd34d0cb673a0de1956c94c1ebe6c6b094f2ae6a167c55375f68' ;; \
       arm64) pypy2_archive='pypy2.7-v7.3.22-aarch64.tar.bz2'; pypy2_sha='49829ef97a36d50870b0a4a7d6d67c4817d98a0bbd936e7a86ac6ef615b07205' ;; \
       *) echo "Unsupported architecture for PyPy2: $architecture" >&2; exit 1 ;; \
     esac \
  && curl --fail --location --silent --show-error "https://downloads.python.org/pypy/$pypy2_archive" --output "/tmp/$pypy2_archive" \
  && echo "$pypy2_sha  /tmp/$pypy2_archive" | sha256sum --check --strict \
  && mkdir -p /opt/pypy2 \
  && tar --extract --bzip2 --file "/tmp/$pypy2_archive" --directory /opt/pypy2 --strip-components=1 \
  && ln -s /opt/pypy2/bin/pypy /usr/local/bin/python2 \
  && ln -s /opt/pypy2/bin/pypy /usr/local/bin/pypy2 \
  && rm -f "/tmp/$pypy2_archive" \
  && groupadd --system fzupta \
  && useradd --system --gid fzupta --home-dir /tmp/fzupta --create-home fzupta

WORKDIR /app
COPY --chown=fzupta:fzupta *.js *.html package*.json .nojekyll /app/
RUN npm ci --omit=dev \
  && npm cache clean --force
COPY --chown=fzupta:fzupta src /app/src
COPY --chown=fzupta:fzupta fzu-logo.png fzu-wordmark-official.jpg fzu-brand-lockup-red.jpg /app/
COPY --chown=fzupta:fzupta weekly-practice-2-tests.zip fuzhou-quality-check-20261018-tests.zip fuzhou-quality-check-b-20261018-tests.zip shenzhuo-round3-20260920-tests.zip gplt-2024-2026-tests.zip third-stage-weekly-20261025-tests.zip fuzhou-quality-check-2-20261031-tests.zip /app/

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
