export class User {
  username: string;
  email: string;
  fullname: string;
  passwords: Passwords;
}

export class Passwords {
  password: string;
  confirmPassword: string;
}
