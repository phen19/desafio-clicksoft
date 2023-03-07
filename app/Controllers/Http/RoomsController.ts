import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'

export default class RoomsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const teacherId = Number(request.header('teacher-id'))
    const data = {
      number: body.number,
      capacity: body.capacity,
      available: body.available,
      owner_id: teacherId,
    }
    console.log(data)
    const room = await Room.create(data)
    console.log(room)
    response.status(201)
    return {
      message: 'Sala criada com sucesso',
      data: room,
    }
  }

  public async index() {
    const rooms = await Room.all()
    return rooms
  }

  public async show({ params, request, response }: HttpContextContract) {
    const room = await Room.findOrFail(params.id)
    const teacherId = Number(request.header('teacher-id'))
    if (room.owner_id !== teacherId) {
      return response
        .status(403)
        .json({ message: 'Não autorizado. Professor não é o dono da sala' })
    }

    return {
      id: room.id,
      number: room.number,
      capacity: room.capacity,
      available: Boolean(room.available),
      owner_id: room.owner_id,
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const room = await Room.findOrFail(params.id)
    const teacherId = Number(request.header('teacher-id'))
    if (room.owner_id !== teacherId) {
      return response
        .status(403)
        .json({ message: 'Não autorizado. Professor não é o dono da sala' })
    }
    const body = request.body()
    room.merge(body)
    await room.save()

    return {
      message: 'Sala atualizada com sucesso',
      data: room,
    }
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    const room = await Room.findOrFail(params.id)
    const teacherId = Number(request.header('teacher-id'))
    if (room.owner_id !== teacherId) {
      return response
        .status(403)
        .json({ message: 'Não autorizado. Professor não é o dono da sala' })
    }
    await room.delete()
    return {
      message: 'Sala excluída com sucesso',
      data: room,
    }
  }
}
