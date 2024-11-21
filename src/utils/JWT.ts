import jwt from "jsonwebtoken";

interface User{
    id: number,
    name: string | null,
    email: string,
    password: string
}

const privateKey = "MIICWwIBAAKBgHeJfxh9DV8rpWfQOu5PozzytrHCDcdlnTDG8WkOTFWSn4e0zLxp"

export async function generateJWToken(user: User){
    const token = jwt.sign(user, privateKey, {algorithm: "HS256"})
    return token;
}

export async function decodeToken(token: string){
    try {
        const decodedUser = jwt.verify(token, privateKey, { algorithms: ["HS256"] }) as User;
        return decodedUser;
    } catch (error) {
        throw new Error("Token inválido");
    }
}