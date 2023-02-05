import { NextFunction, request, Request, response, Response } from "express";

const validateKeys = (request: Request, resopnse: Response, next: NewableFunction): Response | void => {

  const keys: Array<string> = Object.keys(request.body)

  const requiredKeys: Array<requiredRequestKeys> = ['name','duration','description','price']

  const checkAllKeys: boolean = requiredKeys.every((key: string) => {
    return keys.includes(key)
  })

  if(!checkAllKeys){
    return response.status(400).json({
      message: `These keys are required: ${requiredKeys}`
    })
  }

  return next()
}

const validateValues = (request: Request, Response: Response, next: NextFunction): Response | void => {

  if(!request.body.name?.isNaN()){
    console.log('name is a number')
  }

  if(request.body.duration?.isNaN()){
    console.log('duration is a string')
  }

  if(!request.body.description?.isNaN()){
    console.log('description is a number')
  }

  if(request.body.price?.isNan()){
    console.log('price is a string')
  }

  return next()
}

const validateName = (request: Request, response: Response, next: NextFunction): Response | void => {



  return next()
}


export { validateKeys, validateName, validateValues}