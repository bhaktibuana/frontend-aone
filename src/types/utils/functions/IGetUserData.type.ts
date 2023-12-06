export interface IGetUserData {
  isExpired: boolean;
  isInvalidToken: boolean;
  payload: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    roleId: number;
    isVerified: boolean;
    loginLogId: number;
    Role: {
      id: number;
      code: string;
      name: string;
    };
    iat: number;
    exp: number;
  };
}
