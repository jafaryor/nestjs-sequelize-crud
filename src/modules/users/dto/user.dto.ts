import {
  IsNotEmpty,
  MinLength,
  Min,
  Max,
  IsInt,
  IsBoolean,
  IsString,
  IsAlphanumeric,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  readonly login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(4)
  @Max(130)
  readonly age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly isDeleted: boolean;
}
