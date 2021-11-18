import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

// NOTE NEED ROUTE FOR CREATE IN NOTESCOMPONENT and the whole note to send
class NotesService {
  async createNote(pId, note){
    const res = await api.post(`api/projects/${pId}/notes`, note)
    logger.log(res.data)
    AppState.notes = [...AppState.notes, res.data]
  }
  // NOTE need a task id on the body like the task for the sprints
  async getNotesForProject(pId){
    const res = await api.get(`api/projects/${pId}/notes`)
    AppState.notes = res.data
  }
  async removeNote(pId, nId){
    await api.delete(`api/projects/${pId}/notes/${nId}`)
    AppState.notes = AppState.notes.filter(n => n.id !== AppState.notes.id)
    this.getNotesForProject(pId)
    
  }


}

export const notesService = new NotesService()