const request = require('supertest');
const express = require('express');
const movieController = require('../../controllers/MovieController');
const Movie = require('../../models/MovieModel');

// Mock Movie model
jest.mock('../../models/MovieModel');

const app = express();
app.use(express.json());

// Setup routes untuk testing
app.post('/movies', movieController.createMovie);
app.get('/movies', movieController.getAllMovies);
app.get('/movies/:id', movieController.getMovieById);
app.put('/movies/:id', movieController.updateMovie);
app.delete('/movies/:id', movieController.deleteMovie);

describe('Movie Controller Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /movies - Create Movie', () => {
        test('should create a new movie successfully', async () => {
            const movieData = {
                title: 'Test Movie',
                image: '/img/test.jpg',
                description: 'Test description',
                director: 'Test Director',
                year: 2023,
                duration: 120
            };

            const mockMovie = { id: 1, ...movieData };
            Movie.create.mockResolvedValue(mockMovie);

            const response = await request(app)
                .post('/movies')
                .send(movieData)
                .expect(201);

            expect(response.body).toEqual(mockMovie);
            expect(Movie.create).toHaveBeenCalledWith(movieData);
        });

        test('should return 400 when movie creation fails', async () => {
            const movieData = {
                title: 'Test Movie'
                // Missing required fields
            };

            Movie.create.mockRejectedValue(new Error('Validation error'));

            const response = await request(app)
                .post('/movies')
                .send(movieData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('GET /movies - Get All Movies', () => {
        test('should return all movies successfully', async () => {
            const mockMovies = [
                {
                    id: 1,
                    title: 'Movie 1',
                    image: '/img/movie1.jpg',
                    description: 'Description 1',
                    director: 'Director 1',
                    year: 2023,
                    duration: 120
                }
            ];

            Movie.findAll.mockResolvedValue(mockMovies);

            const response = await request(app)
                .get('/movies')
                .expect(200);

            expect(response.body).toEqual(mockMovies);
            expect(Movie.findAll).toHaveBeenCalled();
        });
    });

    describe('GET /movies/:id - Get Movie by ID', () => {
        test('should return movie by ID successfully', async () => {
            const mockMovie = {
                id: 1,
                title: 'Test Movie',
                image: '/img/test.jpg',
                description: 'Test description',
                director: 'Test Director',
                year: 2023,
                duration: 120
            };

            Movie.findByPk.mockResolvedValue(mockMovie);

            const response = await request(app)
                .get('/movies/1')
                .expect(200);

            expect(response.body).toEqual(mockMovie);
        });

        test('should return 404 when movie not found', async () => {
            Movie.findByPk.mockResolvedValue(null);

            const response = await request(app)
                .get('/movies/999')
                .expect(404);

            expect(response.body).toEqual({ error: 'Movie not found' });
        });
    });
});