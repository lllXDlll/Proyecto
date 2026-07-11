"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const equipment_routes_1 = __importDefault(require("./routes/equipment.routes"));
const loan_routes_1 = __importDefault(require("./routes/loan.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const report_routes_1 = __importDefault(require("./routes/report.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/equipment', equipment_routes_1.default);
app.use('/api/loans', loan_routes_1.default);
app.use('/api/dashboard', dashboard_routes_1.default);
app.use('/api/reports', report_routes_1.default);
app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});
if (process.env.NODE_ENV === 'production') {
    const frontendDist = path_1.default.resolve(__dirname, '../../frontend/dist');
    app.use(express_1.default.static(frontendDist));
    app.get('*', (_req, res) => {
        res.sendFile(path_1.default.join(frontendDist, 'index.html'));
    });
}
exports.default = app;
