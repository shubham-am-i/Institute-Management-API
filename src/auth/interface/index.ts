export interface JwtPayload {
    username: string;
}

export interface signInResponse {
    username: string;
    accessToken: string;
}