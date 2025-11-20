"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(express.static((0, path_1.join)(__dirname, '..', 'public')));
    const apiPrefixes = ['/auth', '/patients', '/medicines', '/deliveries'];
    app.use((req, res, next) => {
        const isApiRoute = apiPrefixes.some((prefix) => req.path.startsWith(prefix));
        const isAsset = req.path.includes('.');
        if (req.method === 'GET' && !isApiRoute && !isAsset) {
            return res.sendFile((0, path_1.join)(__dirname, '..', 'public', 'index.html'));
        }
        next();
    });
    await app.listen(3000);
    console.log('✅ Servidor corriendo en http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map