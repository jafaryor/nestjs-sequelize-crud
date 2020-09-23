import { IsNotEmpty, ArrayNotEmpty, IsInt, IsAlpha, IsPositive, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Permission {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
  SHARE = 'share',
  UPLOAD_FILES = 'upload_files',
}

export class GroupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  readonly name: string;

  @ApiProperty()
  @ArrayNotEmpty()
  @IsEnum(Permission, {
    each: true,
    message: `Permission values must be set from predefined values: ${Object.values(Permission).join(' | ')}`,
  })
  readonly permissions: Permission[];
}
