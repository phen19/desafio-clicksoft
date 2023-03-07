import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'enrollments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('student_id').unsigned().index('student_id')
      table.integer('room_id').unsigned().index('room_id')
      table.foreign('student_id').references('students.id').onDelete('CASCADE')
      table.foreign('room_id').references('rooms.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
