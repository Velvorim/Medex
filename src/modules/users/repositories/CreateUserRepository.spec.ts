import { CreateUserService } from "../services/CreateUserService";
import { UserRepositoryInMemory } from "./in-memory/UserRepositoryInMemory";


let createUser: CreateUserService;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Criar user", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUser = new CreateUserService(
            userRepositoryInMemory
        );
    })


    it("Deve ser possível criar um nome para o usuário", async () => {
        const user = {
            name: "Teste Turbando"
        }

        await createUser.executeName({
            name: user.name,
        });

        const userCreated = await userRepositoryInMemory.findByName(user.name);
        
        expect(userCreated).toHaveProperty("id");
    });

    it("Não deve ser possível criar um nome que já exista para o usuário", async () => {
        
        expect(async () => {
            const user = {
                name: "Teste Turbando"
            }
    
            await createUser.executeName({
                name: user.name,
            });
    
            await createUser.executeName({
                name: user.name,
            });
        }).rejects.toBeInstanceOf(Error);

    });
});