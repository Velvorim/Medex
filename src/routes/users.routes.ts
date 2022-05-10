import { Router } from "express";
import { UsersRepository } from "../modules/users/repositories/UsersRepository";
import { CreateUserService } from "../modules/users/services/CreateUserService";

const usersRoutes = Router();
const usersRepository = new UsersRepository();

usersRoutes.post("/", (request, response) => {
    const { name, celular, cep, produto, email } = request.body;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.execute({ name, celular, cep, produto, email });

    return response.status(201).send();
});

usersRoutes.get("/", (request, response) => {
    const all = usersRepository.list();

    return response.json(all);
});

export { usersRoutes };