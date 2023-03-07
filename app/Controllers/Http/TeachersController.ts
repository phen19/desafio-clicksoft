import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Teacher from 'App/Models/Teacher'

export default class TeachersController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const teacher = await Teacher.create(body)
    response.status(201)
    return {
      message: 'Professor criado com sucesso',
      data: teacher,
    }
  }

  public async index() {
    const teachers = await Teacher.all()

    return teachers
  }

  public async show({ params }: HttpContextContract) {
    const teacher = await Teacher.findOrFail(params.id)

    return {
      data: teacher,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const teacher = await Teacher.findOrFail(params.id)
    await teacher.delete()
    return {
      message: 'Professor excluído com sucesso',
      data: teacher,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const teacher = await Teacher.findOrFail(params.id)

    teacher.merge(body)
    await teacher.save()

    return {
      message: 'Professor atualizado com sucesso',
      data: teacher,
    }
  }
}
