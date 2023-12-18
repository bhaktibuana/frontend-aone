/*
Change Password
PUT: {{base_url}}{{api_route}}/auth/profile/changePassword
*/
export interface IChangePassword { 
  oldPassword: string; 
  newPassword: string; 
  newPasswordConfirmation: string; 
  encrypted: boolean; 
}