
import { UsersRepository } from "./UsersRepository";

const expected = { 
    "id": "e9bd655c-3f2a-418f-96eb-6f37da7ab126",
    "name": "Cuca Beludo",
    "produto": "",
    "created_at": "2022-05-16T13:51:57.682Z",
    "sms": {},
    "locale": {},
    "email": {}
   };

jest.mock("./UsersRepository", () => {
    return { // need to add this nested `default` property
        UsersRepository: jest.fn().mockImplementation(() => {
            return {
                createName: jest.fn().mockImplementation(() => {
                return{
                    "id": "e9bd655c-3f2a-418f-96eb-6f37da7ab126",
                    "name": "Cuca Beludo",
                    "produto": "",
                    "created_at": "2022-05-16T13:51:57.682Z",
                    "sms": {},
                    "locale": {},
                    "email": {}
            }
        }),
                findByName: jest.fn()
            }   
        }) 
    }
});

test("Etapa 1 - Cadastro com sucesso", async () => {
    const sut = new UsersRepository;
    const event = { 
        name: "Cuca Beludo",
    }
    
    const user =  sut.createName(event);
    expect(user.id).toEqual(expected.id);
    
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