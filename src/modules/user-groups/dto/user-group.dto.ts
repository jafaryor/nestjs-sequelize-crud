import { IsNotEmpty, ArrayNotEmpty, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UserGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  readonly groupId: number;

  @ApiProperty()
  @ArrayNotEmpty()
  @IsInt({each: true})
  @IsPositive({each: true})
  readonly userIds: number[];
}
