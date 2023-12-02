/*
Register
POST: {{base_url}}{{api_route}}/auth/register
*/
export interface IRegister { 
  firstName: string; 
  lastName: string; 
  username: string; 
  email: string; 
  password: string; 
  encrypted: boolean; 
  subscriptionCode: string; 
  cardholderName: string; 
  cardNumber: string; 
  cardCCV: string; 
  cardExpiration: string; 
}