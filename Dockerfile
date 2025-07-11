# ---------- Base Stage ----------
FROM node:18 AS base
WORKDIR /app
COPY . .

# ---------- Backend ----------
FROM base AS backend
WORKDIR /app/src/server
RUN npm install
RUN npx prisma generate --schema=prisma/schema.prisma

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
COPY --from=frontend /app/.env /app/.env

# Copy backend
COPY --from=backend /app/src/server /app/src/server
COPY --from=backend /app/src/server/package.json /app/src/server/package.json
COPY --from=backend /app/src/server/node_modules /app/src/server/node_modules

# Prisma migration (uncomment if needed)
# RUN npx prisma migrate deploy

# Install PM2 for running multiple services
RUN npm install -g pm2

# Copy PM2 config
COPY pm2.config.js ./

EXPOSE 3000 3001
CMD ["pm2-runtime", "pm2.config.js"]