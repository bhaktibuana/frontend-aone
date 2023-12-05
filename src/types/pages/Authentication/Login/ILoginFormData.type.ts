import { ILogin } from "@/types/apis/Authentication/request/ILoginRequest";

export interface ILoginFormData {
  loading: boolean;
  data: ILogin;
}
