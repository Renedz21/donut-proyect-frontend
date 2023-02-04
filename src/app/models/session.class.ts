import { User } from "./auth-request/user.model";

export class Session {
    authenticated: boolean = false;
    user?: User;
    accessToken?: string;
    // refreshToken?: RefreshToken;

    constructor(access_token: string, user?: User) {
        this.accessToken = access_token;
        this.user = user;
        // this.refreshToken = refreshToken;
    }
}

// export class RefreshToken {
//     tokenString?: string;
//     expireAt?: Date;
// }