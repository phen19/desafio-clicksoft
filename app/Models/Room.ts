import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Teacher from './Teacher'
/* import Student from './Student' */

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public number: number

  @column()
  public capacity: number

  @column()
  public available: boolean

  @column()
  public owner_id: number

  @belongsTo(() => Teacher, {
    foreignKey: 'owner_id',
  })
  public owner: BelongsTo<typeof Teacher>

  /*   @hasMany(() => Student)
  public students: HasMany<typeof Student> */

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
