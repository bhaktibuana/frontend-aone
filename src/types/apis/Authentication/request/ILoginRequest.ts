/*
Login
POST: {{base_url}}{{api_route}}/auth/login
*/
export interface ILogin { 
  usernameOrEmail: string; 
  password: string; 
  encrypted: boolean; 
}