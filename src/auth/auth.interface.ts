import { UserDocument } from "src/user/schemas/user.schema";

export interface Auth {
    code: string,
    user: UserDocument
}
