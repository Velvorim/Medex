
// import { CreateUserService } from "../services/CreateUserService";
import { UsersRepository } from "./UsersRepository";


const expected = { name: "Cuca Beludo", id: '12345' };

// jest.mock("./UsersRepository", () => {
//     return { // need to add this nested `default` property
//         UsersRepository: jest.fn().mockImplementation(() => {
//             return {
//                 createName: jest.fn().mockImplementation(() => {return{ name: "Beijamin Arola", id: "1234"}}),
//                 findByName: jest.fn()
//             }   
//         }) 
//     }
// });

jest.mock("./UsersRepository")
jest.mock("./BancoJSon", () => {
    return {
        expected
    }
});
    

// const userRepositoryMock: jest.Mocked<UsersRepository> = {
//     createName: jest.fn()
// };

// const sutFactory = () => {
//     const createUserMock = new userRepositoryMock() as jest.Mocked<UsersRepository>;

//     const sut = new CreateUserService(createUserMock);

//     return {
//         sut,
//         createUserMock,
//     }
// }

test("Etapa 1 - Cadastro com sucesso", async () => {
    const sut = new UsersRepository;
    await sut.createName({name: "valor"});
    // const event = { 
    //     name: "Cuca Beludo",
    // }
    
    //const user = createUserMock.createName(event);
   expect(sut.createName).toHaveBeenCalledTimes(1);
});






// let createUser: CreateUserService;
// let userRepositoryInMemory: UserRepositoryInMemory;

// describe("Criar user", () => {
//     beforeEach(() => {
//         userRepositoryInMemory = new UserRepositoryInMemory();
//         createUser = new CreateUserService(
//             userRepositoryInMemory
//         );
//     })


//     it("Deve ser possível criar um nome para o usuário", async () => {
//         const user = {
//             name: "Teste Turbando"
//         }

//         await createUser.executeName({
//             name: user.name,
//         });

//         const userCreated = await userRepositoryInMemory.findByName(user.name);
        
//         expect(userCreated).toHaveProperty("id");
//     });

//     it("Não deve ser possível criar um nome que já exista para o usuário", async () => {
        
//         expect(async () => {
//             const user = {
//                 name: "Teste Turbando"
//             }
    
//             await createUser.executeName({
//                 name: user.name,
//             });
    
//             await createUser.executeName({
//                 name: user.name,
//             });
//         }).rejects.toBeInstanceOf(Error);

//     });
// });