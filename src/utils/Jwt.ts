import "dotenv/config"
import jwt from "jsonwebtoken"

const ACCESS_SECRET = process.env.JWT_SECRET!
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!

interface TokenPayload { id: string }

export class Jwt {

    static generateAccessToken(userId: string) {
        return jwt.sign(
            { id: userId },
            ACCESS_SECRET,
            { expiresIn: "15m" }
        )
    }

    static generateRefreshToken(userId: string) {
        return jwt.sign(
            { id: userId },
            REFRESH_SECRET,
            { expiresIn: "30d" }
        )
    }

    static verifyAccessToken(token: string) {
        return jwt.verify(
            token,
            ACCESS_SECRET
        ) as TokenPayload
    }

    static verifyRefreshToken(token: string) {
        return jwt.verify(
            token,
            REFRESH_SECRET
        ) as TokenPayload
    }

}