import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  Validate,
  Unique,
  AllowNull
} from 'sequelize-typescript'

@Table
class User extends Model {
  @PrimaryKey
  @Validate({
    is: /[A-Za-z\d]+/g // - Only alphanumeric characters can be used for username
  })
  @AllowNull(false)
  @Unique // - Usernames should be unique values
  @Column(DataType.TEXT)
    username: string

  @Column(DataType.TEXT)
    password: string

  @UpdatedAt
    updatedAt: Date

  @CreatedAt
    createdAt: Date
}

export default User
