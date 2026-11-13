import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// metodos normales: get, head , post
// metodos complejos: put, patch, delete CORS-PreFlight OPTIONS

const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware)

app.get('/', (req, res) => {
  res.json({ message: 'lola' })
})

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
