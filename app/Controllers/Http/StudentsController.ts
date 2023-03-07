import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Student from 'App/Models/Student'

export default class StudentsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const student = await Student.create(body)
    response.status(201)
    return {
      message: 'Aluno criado com sucesso',
      data: student,
    }
  }

  public async index() {
    const students = await Student.all()

    return students
  }

  public async show({ params }: HttpContextContract) {
    const student = await Student.findOrFail(params.id)

    return {
      data: student,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const student = await Student.findOrFail(params.id)
    await student.delete()
    return {
      message: 'Aluno excluído com sucesso',
      data: student,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const student = await Student.findOrFail(params.id)

    student.merge(body)
    await student.save()

    return {
      message: 'Aluno atualizado com sucesso',
      data: student,
    }
  }
}
