import { IRegister } from "@/types/apis/Authentication/request/IRegisterRequest";

type TFormData = Omit<
  IRegister,
  "cardholderName" | "cardNumber" | "cardCCV" | "cardExpiration"
> & {
  cardholderName?: string;
  cardNumber?: string;
  cardCCV?: string;
  cardExpiration?: string;
};

export interface IRegisterFormData {
  loading: boolean;
  data: TFormData;
}
