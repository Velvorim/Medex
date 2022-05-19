
import { requestName } from "./users.routes";


jest.mock("../modules/users/repositories/UsersRepository", () => {
    return {
        UsersRepository: jest.fn().mockImplementation(() => {
            return {
                findByName: jest.fn().mockImplementation(() => {
                    return {
                        "id": "e9bd655c-3f2a-418f-96eb-6f37da7ab126",
                        "name": "Treobaldo",
                        "produto": "",
                        "created_at": "2022-05-16T13:51:57.682Z",
                        "sms": {},
                        "locale": {},
                        "email": {}
                    }
                })
            }
        })
    }
});

test("Não deve ser possível criar um usuário com o mesmo nome", async () => {
    try {
        const request = {
            body: {
                name: "Treobaldo"
            }
        }
        const response = {
            status: function (code) {
                return {
                    send: function (err) {
                        return {
                            status: code,
                            msg: err

                        }
                    }
                }
            }
        }
        const {user , status} = await requestName(request, response);

    } catch (e) {
        expect(e.message).toBe("Nome já existe");
    }

});
