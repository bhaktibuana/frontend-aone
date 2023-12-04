/*
200 - Verify Login ResponseBody
*/
export interface I200_VerifyLoginResponseBody { 
  message: string; 
  status: boolean; 
  statusCode: number; 
  data: {  accessToken: string; 
}; 
  pagination: {}; 
}