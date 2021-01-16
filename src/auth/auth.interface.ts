import { CreateUserDto } from "src/user/dto/user.dto";

export interface Auth {
    code: string,
    user: CreateUserDto
}
