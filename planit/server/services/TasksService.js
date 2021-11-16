import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TasksService {
  async getTasks(id) {
    const foundTask = await dbContext.Task.find({ projectId: id }).populate('creator')
    if (!foundTask) {
      throw new BadRequest('null checking issue')
    }
    return foundTask
  }
}

export const tasksService = new TasksService()
