export type Auth = {
    errorMessage: string
    status: string,
    user: User,
}

export type User = {
    email: string,
    name: string,
    password: string,
    uid: string
}