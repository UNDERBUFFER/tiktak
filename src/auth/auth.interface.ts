import { CreateUserDto } from "src/user/user.dto";

export interface Auth {
    code: string,
    user: CreateUserDto
}
