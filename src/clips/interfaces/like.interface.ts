import { UserDocument } from "src/user/schemas/user.schema";
import { ClipDocument } from "../schemas/clip.schema";

export interface Like {
    clip: ClipDocument,
    user: UserDocument
}