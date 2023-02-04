interface iRequestMovie{
    name: string,
    duration: number,
    description: string,
    price: number
}

interface iQueryRequest extends iRequestMovie{
    id: number
}