# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy root config files
COPY package*.json tsconfig.json ./

# Copy the specific gateway package and the shared package
COPY packages/apiGateway ./packages/apiGateway
COPY packages/shared ./packages/shared

# IMPORTANT FIX: Install dev dependencies to get http-proxy-middleware
RUN npm install --include=dev

# If http-proxy-middleware is in the service's package.json, also install it explicitly
RUN cd packages/apiGateway && npm install http-proxy-middleware --save

# Build shared package first
RUN npx tsc -p packages/shared/tsconfig.json

# Build api gateway
RUN npx tsc -p packages/apiGateway/tsconfig.json

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app

# 1. Copy the ROOT node_modules (where hoisted deps live)
COPY --from=builder /app/node_modules ./node_modules

# 2. Copy the SHARED package dist (if Gateway depends on it)
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/package.json

# 3. Copy the GATEWAY dist
COPY --from=builder /app/packages/apiGateway/dist ./dist
COPY --from=builder /app/packages/apiGateway/package.json ./
COPY --from=builder /app/packages/apiGateway/node_modules ./node_modules

# 4. DEBUG: Verify http-proxy-middleware exists
RUN ls -la node_modules | grep http-proxy-middleware || \
    echo "http-proxy-middleware not found in root node_modules"
RUN ls -la ./node_modules | grep http-proxy-middleware || \
    echo "http-proxy-middleware not found in local node_modules"

EXPOSE 3000
CMD ["node", "dist/index.js"]