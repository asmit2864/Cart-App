const express = require("express");
const { cartController } = require("../../controllers/index");
const auth = require("../../middlewares/auth");
const router = express.Router();

router.get("/",auth, cartController.getCart);

router.post("/add",auth,cartController.addProductToCart )

router.put("/",auth,cartController.updateProductInCart)
router.delete("/remove",auth,cartController.removeProductFromCart)
router.put("/checkout",auth,cartController.checkout)

module.exports = router