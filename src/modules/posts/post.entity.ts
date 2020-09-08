import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../users/user.entity';


@Table({
  tableName: 'Posts',
})
export class Post extends Model<Post> {
  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty()
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;

  @ApiProperty()
  // userId column is the id of the User table.
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  // Specifies the relationship between the Post table and User table.
  @BelongsTo(() => User)
  user: User;
}
