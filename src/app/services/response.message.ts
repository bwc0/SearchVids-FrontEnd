import { User } from "../profile/model/user";

export class ResponseMessage {

    message: string;
    status: string;

    constructor(message: string, status: string) {
        this.message = message;
        this.status = status;
    }
    
}

export class ResponseMessageWithUser {

    message: string;
    status: string;
    user: User;

    constructor(message: string, status: string, user: User) {
        this.message = message;
        this.status = status;
        this.user = user;
    }

}