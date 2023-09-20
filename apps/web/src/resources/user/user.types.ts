export interface User {
  _id: string;
  createdOn?: Date;
  updatedOn?: Date;
  lastRequest?: Date;
  deletedOn?: Date | null;
  email: string;
  passwordHash: string;
  isEmailVerified: boolean;
  isShadow: boolean | null;
  signupToken: string | null;
  resetPasswordToken?: string | null;
  avatarUrl?: string | null;
  oauth?: {
    google: boolean;
  };
}
