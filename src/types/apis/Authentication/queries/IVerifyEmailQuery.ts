/*
Verify Email
POST: {{base_url}}{{api_route}}/auth/emailVerification?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTcwMTUzOTU1OX0.VY0nnBCulMZjBHl2lmC-Od7GoVMwoxS2-9zq12LxEUg
*/
export interface IVerifyEmail { 
  token: string; 
}