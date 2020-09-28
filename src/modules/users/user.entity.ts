import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Group } from '../groups/group.entity';
import { UserGroup } from '../user-groups/user-group.entity';

@Table({
  // The table name in database.
  tableName: 'Users',
  // Don't add the timestamp attributes (updatedAt, createdAt).
  timestamps: false,
})
export class User extends Model<User> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  login: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  age: number;

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isDeleted: boolean;

  // Specifies the n:m relationship between the Users table and Groups table.
  @BelongsToMany(() => Group, () => UserGroup, 'userId')
  group: Group;
}
