import { Request, Response } from "express";
import { client } from "./database";

const readMovies = async (request: Request, response: Response): Promise<Response> => {

    const query: string = `
        SELECT
            *
        FROM
            mymovies;
    `

    const queryResult = await client.query(query)
    console.log(queryResult)

    return response.status(200).json(queryResult.rows)
}

const createMovie = async (request: Request, resopnse: Response): Promise<Response> => {

    const query: string = `
        INSERT INTO
            mymovies(%I)
        VALUES(%L)
    `

    
}

export { readMovies }