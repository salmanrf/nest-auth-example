import { PASSWORD_REGEX, PASSWORD_VALIDATION_ERROR_MSG } from "@/common";
import { IsEmail, IsString, Matches } from "class-validator";

export class SigninDto {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(PASSWORD_REGEX, { message: PASSWORD_VALIDATION_ERROR_MSG })
  password: string;
}