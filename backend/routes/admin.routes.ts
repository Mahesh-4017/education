import express from "express";
import {
  setupInitialAdmin,
  loginAdmin,
  createRole,
  viewRoles,
  deleteRole,
  createUser,
  updateUser,
  deleteUser,
  tokenAdminLogin,
  getPermissions,
  getAdminUsers,
  updateRole
} from "../controllers/admin.controller";
import { adminAuthMiddleware, hasPermission } from "../middleware/adminAuth";

const router = express.Router();

router.post("/admin/setup", setupInitialAdmin);
router.post("/admin/login", loginAdmin);
router.post("/admin/token", adminAuthMiddleware, tokenAdminLogin);
router.get("/admin/permissions", adminAuthMiddleware, getPermissions);


router.post("/admin/role", adminAuthMiddleware, hasPermission("role:create"), createRole);
router.get("/admin/roles", adminAuthMiddleware, hasPermission("role:view"), viewRoles);
router.delete("/admin/role/:id", adminAuthMiddleware, hasPermission("role:delete"), deleteRole);
router.put("/admin/role/:id", adminAuthMiddleware, hasPermission("role:update"), updateRole);

router.post("/admin", adminAuthMiddleware, hasPermission("admin:create"), createUser);
router.put("/admin/:id", adminAuthMiddleware, hasPermission("admin:update"), updateUser);
router.delete("/admin/:id", adminAuthMiddleware, hasPermission("admin:delete"), deleteUser);
router.get("/admin/users", adminAuthMiddleware, hasPermission("admin:view"), getAdminUsers);


export default router;
