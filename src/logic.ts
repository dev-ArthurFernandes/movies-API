import { Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "./database";
import { queryResult } from "./interfaces";

const readMovies = async (request: Request, response: Response): Promise<Response> => {

    const query: string = `
        SELECT
            *
        FROM
            mymovies;
    `

    const queryResult: queryResult = await client.query(query)
    console.log(queryResult)

    return response.status(200).json(queryResult.rows)
}

const createMovie = async (request: Request, response: Response): Promise<Response> => {

    const query: string = format(`
            INSERT INTO
                mymovies(%I)
            VALUES
                (%L)
            RETURNING *;
        `,
        Object.keys(request.body),
        Object.values(request.body)
    )

    const queryResult: queryResult = await client.query(query)
    
    return response.status(201).json(queryResult.rows[0])
}

const deleteMovie = async (request: Request, response: Response): Promise<Response> => {

    const id: number = parseInt(request.params.id)

    const query: string = `
        DELETE FROM
            mymovies
        WHERE
            id = $1;
    `

    const queryConfig: QueryConfig = {
        text: query,
        values: [id]
    }

    const queryResult: queryResult = await client.query(queryConfig)

    if(!queryResult.rowCount){
        return response.status(404).json({
            message: 'Movie not found!'
        })
    }

    return response.status(204).send()
}

const changeMovies = async (request: Request, response: Response): Promise<Response> => {

    const id: number = parseInt(request.params.id)
    const keys = Object.keys(request.body)
    const values = Object.values(request.body)


    const query: string = format(`
        UPDATE
            mymovies
        SET(%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING *;
    `,
        keys,
        values
    )

    const queryConfig: QueryConfig = {
        text: query,
        values: [id]
    }

    const queryResult: queryResult = await client.query(queryConfig) 
    
    return response.status(200).json(queryResult.rows[0])
}

export { readMovies, createMovie, deleteMovie, changeMovies}