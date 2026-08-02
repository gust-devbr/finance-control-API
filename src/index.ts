import "dotenv/config"
import app from "./app.js"

const PORT = Number(process.env.PORT) || 3000

// HEALTH CHECK
app.get("/", (_, res) => {
    res.json({ status: "online" })
})

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Rodando na porta ${PORT}`)
})