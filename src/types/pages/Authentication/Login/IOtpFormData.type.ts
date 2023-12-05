export interface IOtpFormData {
  otp: string;
  isOtpWrong: boolean;
  loading: boolean;
  otpLength: 4 | 5 | 6;
}
