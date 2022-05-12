import { v4 as uuidV4 } from "uuid";
import { Locale } from "./locale";
import { Sms } from "./sms";

class User {
    id?: string;
    name: string;
    sms: Sms;
    locale: Locale;
    produto: string;
    email: string;

    constructor() {

        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { User };