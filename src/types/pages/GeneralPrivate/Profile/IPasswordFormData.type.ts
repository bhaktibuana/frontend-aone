import { IChangePassword } from "@/types/apis/Authentication/request/IChangePasswordRequest";

export interface IPasswordFormData {
  loading: boolean;
  data: IChangePassword;
}
