/*
200 - Login ResponseBody
*/
export interface I200_LoginResponseBody { 
  message: string; 
  status: boolean; 
  statusCode: number; 
  data: {  userId: number; 
  email: string; 
  iat: number; 
  exp: number; 
}; 
  pagination: {}; 
}