import { Role } from "./employee";

export interface DecodedToken {
    id: string,
    role: Role,
    email: string,
}

