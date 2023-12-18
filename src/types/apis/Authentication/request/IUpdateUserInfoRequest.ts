/*
Update User Info
PUT: {{base_url}}{{api_route}}/auth/profile/userInfo
*/
export interface IUpdateUserInfo { 
  firstName: string; 
  lastName: string; 
}