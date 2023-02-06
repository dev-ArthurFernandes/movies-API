import { QueryResult } from "pg";

interface iRequestMovie{
    name: string,
    duration: number,
    description: string,
    price: number
}

interface iQueryRequest extends iRequestMovie{
    id: number
}

type requiredRequestKeys = 'name' | 'duration' | 'description' | 'price'

type queryResult = QueryResult<iQueryRequest>

export { iRequestMovie, iQueryRequest, requiredRequestKeys, queryResult }