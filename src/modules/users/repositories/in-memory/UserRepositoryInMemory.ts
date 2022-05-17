// import { User } from "../../model/user";
// import { IUsersRepository } from "../IUsersRepository";


// class UserRepositoryInMemory implements IUsersRepository {

    
//     users: User[] = [];
    
//     findByName(name: string): User {
//         const user = this.users.find((user) => user.name === name);
//         return user;
//     }

//     findByData(data: string): User {
//         throw new Error("Method not implemented.");
//     }

    
//     list(): User[] {
//         const all = this.users;
//         return all;
//     }
//     // createName({ name }: { name: any; }) {
//     //     const user = new User();
        
//     //     Object.assign(user, { name });
        
//     //     this.users.push(user);
//     // }
//     createSms({ number, id }: { number: any; id: any; }): void {
//         throw new Error("Method not implemented.");
//     }
    
//     createSmsMessage({ code, status, verified, id }: { code: any; status: any; verified: any; id: any; }){
//         throw new Error("Method not implemented.");
//     }

//     createCep({ cep, id }: { cep: any; id: any; }): void {
//         throw new Error("Method not implemented.");
//     }
//     createProduto({ produto, id }: { produto: any; id: any; }): void {
//         throw new Error("Method not implemented.");
//     }
//     createEmail({ value, id }: { value: any; id: any; }): void {
//         throw new Error("Method not implemented.");
//     }
//     createLocale({ cep, id }: { cep: any; id: any; }): void {
//         throw new Error("Method not implemented.");
//     }
//     createEmailCode({ code, verified, id }: { code: any; verified: any; id: any; }): void {
//         throw new Error("Method not implemented.");
//     }
    

    
// }

// export { UserRepositoryInMemory };