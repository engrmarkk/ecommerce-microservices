// login
export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}


export interface IVerifyAccountRequest {
  email: string;
  otp: string;
}

export interface IResendOtpRequest {
  email: string;
  sendType: string;
}