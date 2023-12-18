/*
200 - My Token ResponseBody
*/
export interface I200_MyTokenResponseBody { 
  message: string; 
  status: boolean; 
  statusCode: number; 
  data: {  accessToken: string; 
}; 
  pagination: {}; 
}