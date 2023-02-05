import express, { Application } from 'express';
import { startDataBase } from './database';
import { readMovies } from './logic';
import { validateKeys, validateName, validateValues} from './middleware'

const app: Application = express()

app.use(express.json())

app.get('/movies', readMovies)
app.post('/movies', validateKeys, validateValues, validateName, createMovie)

app.listen(3000, async () => {
    await startDataBase()
    console.log("Server started!")
})
