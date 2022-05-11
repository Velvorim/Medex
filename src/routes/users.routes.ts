import { Router } from "express";
import { UsersRepository } from "../modules/users/repositories/UsersRepository";
import { CreateUserService } from "../modules/users/services/CreateUserService";

const usersRoutes = Router();
const usersRepository = new UsersRepository();

usersRoutes.post("/name", (request, response) => {
    const { name } = request.body;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeName({ name });

    return response.status(201).send();
});

usersRoutes.post("/celular/:id", (request, response) => {
    const { celular } = request.body;
    const { id } = request.params;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeCelular({ celular, id });

    return response.status(201).send();
});

usersRoutes.post("/cep/:id", (request, response) => {
    const { cep } = request.body;
    const { id } = request.params;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeCep({ cep, id });

    return response.status(201).send();
});

usersRoutes.post("/produto/:id", (request, response) => {
    const { produto } = request.body;
    const { id } = request.params;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeProduto({ produto, id });

    return response.status(201).send();
});

usersRoutes.post("/email/:id", (request, response) => {
    const { email } = request.body;
    const { id } = request.params;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeEmail({ email, id });

    return response.status(201).send();
});

usersRoutes.get("/", (request, response) => {
    const all = usersRepository.list();

    return response.json(all);
});

export { usersRoutes };