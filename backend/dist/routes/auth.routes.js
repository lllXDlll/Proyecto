"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Public login route
router.post('/login', auth_controller_1.login);
// Protected test/verification route
router.get('/me', auth_middleware_1.authenticateToken, (req, res) => {
    return res.status(200).json({
        authenticated: true,
        user: req.user
    });
});
exports.default = router;
