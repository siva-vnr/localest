export interface userInterface {
    id? : number | undefined,
    name: string,
    email: string,
    password?: string | undefined,
    token?: string | undefined,
    roleId: number
}
