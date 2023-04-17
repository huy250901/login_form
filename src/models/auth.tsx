export interface LoginParams {
  email: string;
  password: string;
  //   rememberMe: boolean;
}

export interface LoginValidation {
  email: string;
  password: string;
}

// export interface RegisterParams {
//   email: string;
//   password: string;
//   repeatPassword: string;
//   name: string;
//   gender: string;
//   region: string;
//   state: string;
// }

export interface RegisterParams {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: "male" | "female" | "other";
  region: string;
  state: string;
}
