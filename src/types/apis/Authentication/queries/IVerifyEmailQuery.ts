/*
Verify Email
POST: {{base_url}}{{api_route}}/auth/emailVerification?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzAxNjE2NDcwfQ.izHBAK3tZmjNQW1p0Lkbn6L3HhoKzQM59VU0v6E9wfg
*/
export interface IVerifyEmail { 
  token: string; 
}