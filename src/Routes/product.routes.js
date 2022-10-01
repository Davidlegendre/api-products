import { Router } from "express";
import { deleteOneProduct, getAllProducts, getOneProduct, registerProduct, updateOneProduct } from "../Controllers/Products/products.controller";
import { validarCreateCampos, validarUpdateCampos, validateIDParams } from "../validators/product.validators";
import { validateToken } from "../validators/user.validator";
const router = Router()

router.get("/", validateToken, getAllProducts)
router.post("/create", validateToken, validarCreateCampos, registerProduct)
router.get("/getone/:id", validateToken, validateIDParams, getOneProduct)
router.delete("/delete/:id", validateToken, validateIDParams, deleteOneProduct)
router.patch("/update/:id", validateToken, validateIDParams, validarUpdateCampos, updateOneProduct)

export default router