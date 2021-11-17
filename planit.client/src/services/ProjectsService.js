import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProjectsService {
  async createProject(newProject) {
    const res = await api.post('api/projects', newProject)
    AppState.projects = [...AppState.projects, res.data]
    // NOTE
    AppState.activeProject = res.data
    // logger.log(res.data)
    logger.log(AppState.account)
  }

  async getAllProjects() {
    const res = await api.get('api/projects')
    // logger.log(res.data)
    AppState.projects = res.data
  }

}

export const projectsService = new ProjectsService()