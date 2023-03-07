import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import Enrollment from 'App/Models/Enrollment'
import Teacher from 'App/Models/Teacher'
import Student from 'App/Models/Student'
import Database from '@ioc:Adonis/Lucid/Database'

export default class EnrollmentsController {
  public async store({ params, request, response }: HttpContextContract) {
    const teacherId = Number(request.header('teacher-id'))
    const body = request.body()

    const room = await Room.findOrFail(body.room_id)
    const teacher = await Teacher.findOrFail(teacherId)
    const student = await Student.findOrFail(body.student_id)

    if (teacher.id !== room.owner_id) {
      return response.status(403).json({ message: 'Professor não autorizado' })
    }

    if (!student) {
      return response.status(404).json({ message: 'Aluno não encontrado' })
    }

    const studentAlreadyInRoom = await Database.from('enrollments')
      .select('*')
      .where('enrollments.student_id', '=', body.student_id)
      .andWhere('enrollments.room_id', '=', body.room_id)
    if (studentAlreadyInRoom.length > 0) {
      return response.status(409).json({ message: 'Conflito. Aluno já alocado nesta sala.' })
    }

    const totalStudents = await Database.from('enrollments')
      .join('students', (query) => {
        query.on('enrollments.student_id', 'students.id')
      })
      .select('students.*')
      .where('enrollments.room_id', '=', body.room_id)

    if (totalStudents.length === room.capacity) {
      return response
        .status(401)
        .json({ message: 'Não autorizado. Sala com capacidade máxima preenchida' })
    }

    const enrollment = await Enrollment.create(body)
    if (totalStudents.length === room.capacity - 1) {
      const notAvailable = { available: false }
      room.merge(notAvailable)
      await room.save()
      return enrollment
    }
    return enrollment
  }

  public async index() {
    const enrollments = await Enrollment.all()

    return enrollments
  }

  public async show({ params, request, response }) {
    const totalStudents = await Database.from('enrollments')
      .select('*')
      .where('room_id', '=', params.id)

    const teacherId = Number(request.header('teacher-id'))
    const room = await Room.findOrFail(params.id)

    if (room.owner_id !== teacherId) {
      return response
        .status(403)
        .json({ message: 'Não autorizado. Professor não é o dono da sala.' })
    }

    return totalStudents
  }

  public async findAllRoomsByStudent({ params }: HttpContextContract) {
    const studentId = params.id
    const rooms = await Database.rawQuery(
      "SELECT s.name, json_group_array(json_object('teacher', t.name, 'room number', r.number)) AS 'Rooms' FROM enrollments LEFT JOIN students s ON enrollments.student_id = s.id JOIN rooms r ON enrollments.room_id = r.id JOIN teachers t ON r.owner_id = t.id WHERE enrollments.student_id = ? GROUP BY s.name",
      [studentId]
    )
    console.log(rooms[0].Rooms)
    return rooms
  }

  public async destroy({ params, request, response }) {
    const teacherId = Number(request.header('teacher-id'))
    const body = request.body()
    const studentId = params.id

    const room = await Room.findOrFail(body.room_id)
    const teacher = await Teacher.findOrFail(teacherId)
    const student = await Student.findOrFail(studentId)

    const studentInRoom = await Database.from('enrollments')
      .select('*')
      .where('enrollments.student_id', '=', studentId)
      .andWhere('enrollments.room_id', '=', body.room_id)

    console.log(studentInRoom)

    if (teacher.id !== room.owner_id) {
      return response.status(403).json({ message: 'Professor não autorizado' })
    }

    if (!student) {
      return response.status(404).json({ message: 'Aluno não encontrado' })
    }

    if (studentInRoom.length === 0) {
      return response.status(404).json({ message: 'Aluno não encontrado na sala buscada' })
    }
    const totalStudents = await Database.from('enrollments')
      .join('students', (query) => {
        query.on('enrollments.student_id', 'students.id')
      })
      .select('students.*')
      .where('enrollments.room_id', '=', body.room_id)

    if (totalStudents.length - 1 < room.capacity) {
      await Database.from('enrollments')
        .delete()
        .where('enrollments.student_id', '=', studentId)
        .andWhere('enrollments.room_id', '=', body.room_id)
      const available = { available: true }
      room.merge(available)
      await room.save()
    }
  }
}
