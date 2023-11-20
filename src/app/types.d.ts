export interface Models{
    Id?: number,
    name: string,
    description: string,
    Iduser: number,
    price: number,
    model?: Buffer
}

export interface user{
    Id?: number,
    name: string,
    cell: string,
    email: string,
    key_stripe?: string
}