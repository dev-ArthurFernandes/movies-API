import { Request, Response } from "express";
import { QueryConfig } from "pg";
import format, { string } from "pg-format";
import { client } from "./database";
import { queryResult } from "./interfaces";

function isNumber(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const readMovies = async (request: Request, response: Response): Promise<Response> => {

    let page: any = !isNumber(request.query.page) ? 1 : request.query.page
    let perPage: any = !isNumber(request.query.perPage) ? 5 : request.query.perPage
    
    const nextPage: number = + page + 1

    const previousPage: number | null = page === 1 ? null : page - 1

    const queryString: string = `
        SELECT
            *
        FROM
            movies
        LIMIT $1 OFFSET $2;
    `

    const queryConfig: QueryConfig ={ 
        text: queryString,
        values: [perPage, page]
    }

    const queryResult: queryResult = await client.query(queryConfig)

    return response.status(200).json({
        "previousPage": previousPage,
        "nextPage": `http://localhost:3000/movies?page=${nextPage}&perPage=${perPage}`,
        "count": perPage,
        "data": queryResult.rows
    })
}

const createMovie = async (request: Request, response: Response): Promise<Response> => {

    const query: string = format(`
            INSERT INTO
                movies(%I)
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
            movies
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
            movies
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

export { readMovies, createMovie, deleteMovie, changeMovies }