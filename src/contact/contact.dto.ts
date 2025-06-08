import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches
} from 'class-validator'

export class ContactDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(4)
  subject: string

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  message: string
}
