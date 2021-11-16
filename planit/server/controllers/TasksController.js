import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'

export class TasksController extends BaseController {
  constructor() {
    super('api/projects/:projectId/tasks')
    this.router
      .get('', this.getTasks)
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .post('', this.create)
  }

  async getTasks(req, res, next) {
    try {
      const tasks = await tasksService.getTasks(req.params.projectId)
      return res.send(tasks)
    } catch (error) {
      next(error)
    }
  }
}
