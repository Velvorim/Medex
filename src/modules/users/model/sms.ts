import { v4 as uuidV4 } from "uuid";

class Sms {

        id?: string;
        code: string;
        status: string;
        verified: boolean;
        number: string;
    

    constructor() {       
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Sms };