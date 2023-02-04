import express, { Application } from 'express';
import { startDataBase } from './database';
import { readMovies } from './logic';

const app: Application = express()

app.use(express.json())

app.get('/movies', readMovies)


app.listen(3000, async () => {
    await startDataBase()
    console.log("Server started!")
})
