import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import Room from './Room'

export default class Enrollment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Student, {
    foreignKey: 'student_id',
  })
  public student: BelongsTo<typeof Student>

  @column()
  public student_id: number

  @belongsTo(() => Room, {
    foreignKey: 'room_id',
  })
  public room: BelongsTo<typeof Room>

  @column()
  public room_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
