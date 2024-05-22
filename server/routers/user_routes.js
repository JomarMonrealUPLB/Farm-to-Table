import { getAllUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser } from '../controllers/user_controller.js';

const userRouter = (app) => {
    
    app.get('/users', getAllUsers);
    app.get('/users/:id', getUserById);
    app.get('/users/email/:email', getUserByEmail);
    app.post('/users', createUser);
    app.patch('/users', updateUser);
    app.delete('/users/:id', deleteUser);

}

export default userRouter;