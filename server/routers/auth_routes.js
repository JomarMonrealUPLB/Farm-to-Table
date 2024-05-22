import { createNewSession, deleteSession, getUserProfile } from "../controllers/auth_controller.js";

const authRouter =(app) =>{
    app.post('/auth', createNewSession)
    app.get("/auth/:id",getUserProfile)
    app.delete('/logout', deleteSession)
}

export default authRouter