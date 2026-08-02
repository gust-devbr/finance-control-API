import { User } from "@prisma/client";

export class UserResponse {

    static from(user: User) {
        const { password, ...userWithoutPassword } = user
        return userWithoutPassword
    }
}