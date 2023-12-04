/*
Verify Login
POST: {{base_url}}{{api_route}}/auth/login/verifyLogin
*/
export interface IVerifyLogin { 
  userId: number; 
  otp: string; 
}