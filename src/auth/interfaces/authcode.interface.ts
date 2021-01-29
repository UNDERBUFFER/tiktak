import { UserDocument } from 'src/user/schemas/user.schema';

export interface AuthCode {
  code: string;
  user: UserDocument;
}
