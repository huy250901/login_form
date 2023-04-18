export interface LoginParams {
  email: string;
  password: string;
  //   rememberMe: boolean;
}

export interface LoginValidation {
  email: string;
  password: string;
}

export interface RegionParams {
  name: string;
  id: string | number;
  myFunction: (param1: string, param2: number) => boolean;
}

export interface LocationParams {
  name: string;
  id: string | number;
}
export interface IGenderParams {
  label: string;
  value: string;
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
  rememberMe: boolean;
  repeatPassword: string;
  name: string;
  gender: "male" | "female" | "other";
  region: string;
  state: string;
}
