import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Permission } from './dto/group.dto';
import { User } from '../users/user.entity';
import { UserGroup } from '../user-groups/user-group.entity';


@Table({
  // The table name in database.
  tableName: 'Groups',
  // Don't add the timestamp attributes (updatedAt, createdAt).
  timestamps: false,
})
export class Group extends Model<Group> {
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
    allowNull: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: DataType.ARRAY(DataType.ENUM({
      values: Object.values(Permission)
    })),
    allowNull: false,
  })
  permissions: Permission[];

  // Specifies the n:m relationship between the Users table and Groups table.
  @BelongsToMany(() => User, () => UserGroup, 'groupId')
  user: User;
}
