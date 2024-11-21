import { Router } from "express";

import UserController from "../controllers/UserController";

const UserRouter = Router();


//Listar usuários
UserRouter.get("/users", UserController.listUser);

//Buscar um usuário por ID
UserRouter.get("/users/:id", UserController.listUserById);

//Inserir usuários
UserRouter.post("/users/create", UserController.createUser);

//Atualizar usuários
UserRouter.put("/users/:id", UserController.updateUser);

//Deletar usuários
UserRouter.delete("/users/delete/:id", UserController.deleteUser);

export default UserRouter;