const request = require('supertest');
const express = require('express');
const movieRoutes = require('../../routes/MovieRoute');
const movieController = require('../../controllers/MovieController');

// Mock controller
jest.mock('../../controllers/MovieController');

const app = express();
app.use(express.json());
app.use('/api', movieRoutes);

describe('Movie Routes Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('POST /api/movies should call createMovie controller', async () => {
        movieController.createMovie.mockImplementation((req, res) => {
            res.status(201).json({ message: 'Movie created' });
        });

        await request(app)
            .post('/api/movies')
            .send({
                title: 'Test Movie',
                image: '/img/test.jpg',
                description: 'Test description',
                director: 'Test Director',
                year: 2023,
                duration: 120
            })
            .expect(201);

        expect(movieController.createMovie).toHaveBeenCalled();
    });

    test('GET /api/movies should call getAllMovies controller', async () => {
        movieController.getAllMovies.mockImplementation((req, res) => {
            res.status(200).json([]);
        });

        await request(app)
            .get('/api/movies')
            .expect(200);

        expect(movieController.getAllMovies).toHaveBeenCalled();
    });
});