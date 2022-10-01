import { Router } from "express";
import { getDataUser, login, register } from "../Controllers/Users/user.controller";
import { ValidateLoginCampos, ValidateRegisterCampos, validateToken } from "../validators/user.validator";
const router = Router()

router.post("/register", ValidateRegisterCampos, register)
router.post("/login", ValidateLoginCampos, login)
router.get("/getUser", validateToken, getDataUser)


export default router