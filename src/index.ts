import "dotenv/config"
import app from "./app.js"

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Rodando em http://localhost:${PORT} ou http://192.168.0.107:${PORT}`)
})