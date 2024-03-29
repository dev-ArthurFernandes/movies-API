import express, { Application } from 'express';
import { startDataBase } from './database';
import { createMovie, deleteMovie, readMovies, changeMovies } from './logic';
import { validateId, validateKeys, validateName} from './middleware'

const app: Application = express()

app.use(express.json())

app.get('/movies', readMovies)
app.post('/movies', validateKeys, validateName, createMovie)
app.delete('/movies/:id', deleteMovie)
app.patch('/movies/:id', validateId, validateName, changeMovies)

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

app.listen(3000, async () => {
    await startDataBase()
    console.log("Server started!")
})
