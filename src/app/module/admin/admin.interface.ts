export interface IAdmin {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  adminRole: "SUPER_ADMIN" | "ADMIN" | "STAFF";
}
