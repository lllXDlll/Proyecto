"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Protect all user management routes to ADMINISTRADOR only
router.use(auth_middleware_1.authenticateToken);
router.use((0, auth_middleware_1.authorizeRole)(['ADMINISTRADOR']));
router.post('/', user_controller_1.createUser);
router.get('/', user_controller_1.listUsers);
router.put('/:id', user_controller_1.updateUser);
exports.default = router;
