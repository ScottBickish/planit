import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProjectsService {
  async createProjec(newProject) {
    const res = await api.post('api/projects', newProject)
    AppState.projects = [...AppState.projects, res.data]
    logger.log(res.data)
  }

}

export const projectsService = new ProjectsService()