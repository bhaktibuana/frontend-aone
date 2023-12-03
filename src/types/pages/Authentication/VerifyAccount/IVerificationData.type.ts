export interface IVerificationData {
  isVerifying: boolean;
  status: "success" | "error";
  message: string;
}
