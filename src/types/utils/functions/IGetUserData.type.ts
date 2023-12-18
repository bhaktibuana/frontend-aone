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
    UserSubscription:
      | [
          {
            id: number;
            userId: number;
            subscriptionId: number;
            startDate: Date;
            endDate: Date;
            Subscription: {
              id: number;
              code: string;
              name: string;
              price: string;
            };
          }
        ]
      | [];
    iat: number;
    exp: number;
  };
}
