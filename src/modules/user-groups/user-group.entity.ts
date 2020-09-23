import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Group } from '../groups/group.entity';


@Table({
  // The table name in database.
  tableName: 'UserGroups',
  // Don't add the timestamp attributes (updatedAt, createdAt).
  timestamps: false,
})
export class UserGroup extends Model<UserGroup> {
    @ApiProperty()
    // userId column is the id of the Users table.
    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    userId: number;

    @ApiProperty()
    // groupId column is the id of the Groups table.
    @ForeignKey(() => Group)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    groupId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Group)
    group: Group;
}
