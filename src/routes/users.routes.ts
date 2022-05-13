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

usersRoutes.post("/:id/sms", (request, response) => {
    const { number } = request.body;
    const { id } = request.params;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeSms({ number, id });

    return response.status(201).send();
});

usersRoutes.post("/:id/sms/mensagem", (request, response) => {
    const { code, status, verified } = request.body;
    const { id } = request.params;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeSmsMessage({  code, status, verified, id });

    return response.status(201).send();
});

usersRoutes.post("/:id/cep", (request, response) => {
    const { cep } = request.body;
    const { id } = request.params;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeLocale({ cep, id });

    return response.status(201).send();
});

usersRoutes.post("/:id/produto", (request, response) => {
    const { produto } = request.body;
    const { id } = request.params;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeProduto({ produto, id });

    return response.status(201).send();
});

usersRoutes.post("/:id/email", (request, response) => {
    const { value } = request.body;
    const { id } = request.params;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeEmail({ value, id });

    return response.status(201).send();
});


usersRoutes.post("/:id/email/code", (request, response) => {
    const { code, verified } = request.body;
    const { id } = request.params;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeEmailCode({ code, verified, id });

    return response.status(201).send();
});

usersRoutes.get("/", (request, response) => {
    const all = usersRepository.list();

    return response.json(all);
});

export { usersRoutes };