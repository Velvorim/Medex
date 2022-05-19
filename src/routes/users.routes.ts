import { Router } from "express";
import { UsersRepository } from "../modules/users/repositories/UsersRepository";
import { CreateUserService } from "../modules/users/services/CreateUserService";

const usersRoutes = Router();
const usersRepository = new UsersRepository();

const requestName = async (request, response) => {
    const { name } = request.body;

    const createUserService = new CreateUserService(
        usersRepository,
    );

 
    const user = await createUserService.executeName({ name });
    

    return  response.status(201).send(user);
}

usersRoutes.post("/name", requestName);

const requestSms = async (request, response) => {
    const { number } = request.body;
    const { id } = request.params;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeSms({ number, id });

    return response.status(201).send();
};

usersRoutes.post("/:id/sms", requestSms);

usersRoutes.post("/:id/sms/mensagem", (request, response) => {
    const { code } = request.body;
    const { id } = request.params;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeSmsMessage({ code, id });

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
    const { name, quantidade } = request.body;
    const { id } = request.params;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeProduto({ name, quantidade, id });

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
    const { code } = request.body;
    const { id } = request.params;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeEmailCode({ code, id });

    return response.status(201).send();
});

usersRoutes.post("/:id/senha", (request, response) => {
    const { senha } = request.body;
    const { id } = request.params;

    const createUserService = new CreateUserService(
        usersRepository,
    );

    createUserService.executeSenha({ senha, id });

    return response.status(201).send();
});

usersRoutes.get("/", (request, response) => {
    const all = usersRepository.list();

    return response.json(all);
});

export { usersRoutes, requestName, requestSms };