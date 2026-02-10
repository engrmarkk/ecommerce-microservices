import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = 3000;

// Use environment variables or fall back to localhost for non-docker testing
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3002';
// const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3003';

app.use('/api/users', createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/users': '' }, // Removes /api/users before sending to service
}));

// app.use('/api/products', createProxyMiddleware({
//     target: PRODUCT_SERVICE_URL,
//     changeOrigin: true,
//     pathRewrite: { '^/api/products': '' },
// }));

app.listen(PORT, () => console.log(`Gateway live on port ${PORT}`));