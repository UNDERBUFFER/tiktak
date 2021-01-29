import { UserDocument } from "src/user/schemas/user.schema";

export interface Clip {
    path: string,
    user: UserDocument
}