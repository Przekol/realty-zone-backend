export interface ForgetPasswordRequest {
  email: string;
}

export interface VerifyPasswordResetTokenRequest {
  userId: string;
  token: string;
}
