import { Router } from "express"
import ShopController from "../controllers/ShopController";

const router = Router()

router.post("/create-checkout-session", ShopController.createCheckoutSession);

router.get("/success/:token/:itemId", ShopController.onSuccess);
router.get("/cancel", ShopController.onCancel);

router.get("/themes/:id", ShopController.getThemes);

export default router
