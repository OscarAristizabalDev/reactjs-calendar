export type Auth = {
    errorMessage: string
    status: string,
    user: User,
}

export type User = {
    name: string,
    email: string,
    password: string
}