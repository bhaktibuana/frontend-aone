import { ILogin } from "@/types/apis/Authentication/request/ILoginRequest";

export interface IFormData {
  loading: boolean;
  data: ILogin;
}
