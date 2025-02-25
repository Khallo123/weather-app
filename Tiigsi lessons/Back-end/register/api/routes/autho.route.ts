import { Router } from "express";
import { register } from "../controllers/autho.controller";
const route = Router()

route.post('/register', register)

export default route