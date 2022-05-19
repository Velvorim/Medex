
import { requestName } from "./users.routes";

const expected = { 
    "id": "e9bd655c-3f2a-418f-96eb-6f37da7ab126",
    "name": "Cuca Beludo",
    "produto": "",
    "created_at": "2022-05-16T13:51:57.682Z",
    "sms": {},
    "locale": {},
    "email": {}
   };

jest.mock("../modules/users/services/CreateUserService", () => {
    return { 
        CreateUserService: jest.fn().mockImplementation(() => {
        return {
                executeName: jest.fn().mockImplementation(() => {
                return{
                    "id": "e9bd655c-3f2a-418f-96eb-6f37da7ab126",
                    "name": "Treobaldo",
                    "produto": "",
                    "created_at": "2022-05-16T13:51:57.682Z",
                    "sms": {},
                    "locale": {},
                    "email": {}
            }
        }),
        
        findByName: jest.fn(),

         }   
      }) 
    }
});


test("Deve ser possivél criar um usuário", async () => {
    const request = {
        body: {
            name: "Treobaldo"   
        }
    }
    const response = {
        status: function(code) {
            return {
                send: function(obj) {
                  return {
                    status: code,
                     user: obj
                    
                  }
                }
            }
         }
    }

  const {user , status} = await requestName(request, response);
  console.log(user)
    expect(user.id).toEqual(expected.id);
    expect(status).toBe(201);
});







// test("Etapa 1 - Cadastro com sucesso", async () => {
//     const sut = new UsersRepository;
//     const event = { 
//         name: "Valor",
//     }
    
//     const user = await sut.createName(event);
//     expect(user.id).toEqual(expected.id);
    
// });

// test("deve ser possivél procurar o usuario pelo nome", async () => {
//     const sut = new UsersRepository;
//     const event = { 
//         name: "Valor",
//     }

//     const user = await sut.findByName(event as any);
//     expect(user).toEqual(expected);
// });
// const usersRepository = new UsersRepository();
// const createService = new CreateUserService(usersRepository);

// test("Etapa 2 - Usuário com status inválido", async () => {
//     const sut = new UsersRepository;
//     const event = { 
//         id: "e9bd655c-3f2a-418f-96eb-6f37da7ab126",
//         telefone: "+5517996517077"
//     }

//     const user = await sut.createSms(event as any);
//     expect(user.id).toEqual(expected.id);
// });





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
//             name: "Teste"
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
//                 name: "Teste"W
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