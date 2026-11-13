import { MovieModel } from '../models/local-file/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById(id)
    if (movie) res.json(movie)

    res.status(404).json({ message: 'not found' })
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: result.error.message })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validatePartialMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: result.error.message })
    }

    const updatedMovie = await MovieModel.update({ id, input: req.body })

    if (updatedMovie === false) {
      return res.status(404).json({ message: 'not found' })
    }

    res.json(updatedMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await MovieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }
}
