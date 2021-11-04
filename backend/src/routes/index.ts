import { response, Router } from "express"
import auth from "./auth"
import shop from "./shop"

const routes = Router()

routes.use("/auth", auth)
routes.use("/shop", shop)

routes.use("/", async (req, res) => { res.redirect('http://localhost:4200/home') })

export default routes
