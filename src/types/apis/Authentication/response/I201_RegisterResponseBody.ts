/*
201 - Register ResponseBody
*/
export interface I201_RegisterResponseBody { 
  message: string; 
  status: boolean; 
  statusCode: number; 
  data: {  isVerified: boolean; 
  isActive: boolean; 
  isDeleted: boolean; 
  id: number; 
  firstName: string; 
  lastName: string; 
  username: string; 
  email: string; 
  roleId: number; 
  createdAt: string; 
  createdBy: string; 
  updatedAt: string; 
  updatedBy: string; 
}; 
  pagination: {}; 
}