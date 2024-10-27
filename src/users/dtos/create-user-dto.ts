import { PASSWORD_REGEX, PASSWORD_VALIDATION_ERROR_MSG } from "@/common";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  @Matches(PASSWORD_REGEX, { message: PASSWORD_VALIDATION_ERROR_MSG })
  password: string

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  first_name: string

  @IsString()
  @MinLength(0)
  @MaxLength(255)
  last_name: string
}