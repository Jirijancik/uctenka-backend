import { generateBasicClients } from "./client"
import { generateBasicUsers } from "./user"


export const generateData = async () => {
   await generateBasicUsers()
   await generateBasicClients()
}