import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TasksService {
  async createTask(task, pId) {
    const res = await api.post(`api/projects/${pId}/tasks`, task)
    AppState.tasks = [...AppState.tasks, res.data]
  }
  async getTasksByProjectId(pId) {
    const res = await api.get(`api/projects/${pId}/tasks`)
    AppState.tasks = res.data
  }
  async removeTask(task) {
    await api.delete(`api/projects/${task.projectId}/tasks/${task.id}`)
    AppState.tasks = AppState.tasks.filter(t => t.id !== AppState.tasks.id)
    this.getTasksByProjectId(task.projectId)
  }
  async toggleCheckbox(pId, task) {
    task.isComplete = !task.isComplete
    const res = await api.put(`api/projects/${pId}/tasks/${task.id}`, task)
    logger.log(res.data)

  }

}

export const tasksService = new TasksService()