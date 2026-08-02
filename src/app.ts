import express, { Express } from "express";
import cors from "cors"

import authRoutes from "./modules/auth/routes/AuthRoutes.js";
import userRoutes from "./modules/user/routes/UserRoutes.js";
import settingsRoutes from "./modules/settings/routes/SettingsRoutes.js";
import categoryRoutes from "./modules/category/routes/CategoryRoutes.js";
import transactionRoutes from "./modules/transaction/routes/TransactionRoutes.js";

const app: Express = express()

app.use(express.json())
app.use(cors({ origin: "*" }))

//PUBLIC
app.use("/api/auth", authRoutes)

//PRIVATE
app.use("/api/me", userRoutes)
app.use("/api/settings", settingsRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/transaction", transactionRoutes)

export default app