# ---------- Base Stage ----------
FROM node:18 AS base
WORKDIR /app
COPY . .

# ---------- Backend ----------
FROM base AS backend
WORKDIR /app/server
RUN npm install

# ---------- Frontend ----------
FROM base AS frontend
WORKDIR /app
RUN npm install && npm run build

# ---------- Production ----------
FROM node:18 AS final
WORKDIR /app

# Copy built frontend
COPY --from=frontend /app/.next /app/.next
COPY --from=frontend /app/public /app/public
COPY --from=frontend /app/package.json /app/package.json
COPY --from=frontend /app/node_modules /app/node_modules
COPY --from=frontend /app/next.config.mjs /app/next.config.mjs

# Copy backend
COPY --from=backend /app/server /app/server

# Install PM2 for running multiple services
RUN npm install -g pm2

# Copy PM2 config
COPY pm2.config.js .

EXPOSE 3000
CMD ["pm2-runtime", "pm2.config.js"]
