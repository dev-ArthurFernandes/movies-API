import { NextFunction, query, Request, Response } from "express";
import { QueryConfig } from "pg";
import { string } from "pg-format";
import { client } from "./database";
import { queryResult } from "./interfaces";

const validateKeys = (request: Request, response: Response, next: NextFunction): Response | void => {

  const keys: Array<string> = Object.keys(request.body)

  let requiredKeys: Array<string> = ['name','duration','price', 'description']

  const checkAllKeys: boolean = keys.every((key) => {
    return requiredKeys.includes(key)
  })

  if(!checkAllKeys){
    return response.status(400).json({
      message: `These keys are required: ${requiredKeys}`
    })
  }

  return next()
}


const validateName = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

  const movieName: string = request.body.name

  const queryString: string = `
    SELECT
      *
    FROM
      movies
    WHERE
      name = $1;
  `

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [movieName]
  }

  const queryResult: queryResult = await client.query(queryConfig)

  if(queryResult.rowCount){
    return response.status(409).json({
      message: "Name already exist!"
    })
  }

  return next()
}

const validateId = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

  const id: number = parseInt(request.params.id)

  const queryString: string = `
    SELECT
      *
    FROM 
      movies
    WHERE
      id = $1;
  `

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id]
  }

  const queryResult: queryResult = await client.query(queryConfig)

  if(!queryResult.rowCount){
    return response.status(404).json({
      message: "Id not found!"
    })
  }

  return next()
}


export { validateKeys, validateName, validateId}