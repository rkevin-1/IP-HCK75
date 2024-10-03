const request = require('supertest');
const app = require('../app');
const { User, Destination, Review } = require('../models');

describe('Travel Server API', () => {
  let authToken;

  beforeAll(async () => {
    await User.sync({ force: true });
    await Destination.sync({ force: true });
    await Review.sync({ force: true });
  });

  describe('User Routes', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/register')
        .send({ email: 'test@example.com', password: 'password123' });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('email', 'test@example.com');
    });

    it('should login a user', async () => {
      const res = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password123' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      authToken = res.body.token;
    });

    it('should get user profile', async () => {
      const res = await request(app)
        .get('/profile')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('email', 'test@example.com');
    });
  });

  describe('Destination Routes', () => {
    let destinationId;

    it('should create a new destination', async () => {
      const res = await request(app)
        .post('/destinations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Test Destination', description: 'A beautiful place' });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      destinationId = res.body.id;
    });

    it('should get all destinations', async () => {
      const res = await request(app).get('/destinations');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should update a destination', async () => {
      const res = await request(app)
        .put(`/destinations/${destinationId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Updated Destination', description: 'An even more beautiful place' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('name', 'Updated Destination');
    });

    it('should delete a destination', async () => {
      const res = await request(app)
        .delete(`/destinations/${destinationId}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.statusCode).toBe(200);
    });
  });

  describe('Review Routes', () => {
    let destinationId, reviewId;

    beforeAll(async () => {
      const destination = await Destination.create({ name: 'Review Test Destination', description: 'For testing reviews' });
      destinationId = destination.id;
    });

    it('should create a new review', async () => {
      const res = await request(app)
        .post(`/destination/${destinationId}/reviews`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ content: 'Great place!', rating: 5 });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      reviewId = res.body.id;
    });

    it('should get reviews for a destination', async () => {
      const res = await request(app).get(`/destination/${destinationId}/reviews`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should update a review', async () => {
      const res = await request(app)
        .put(`/reviews/${reviewId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ content: 'Updated review', rating: 4 });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('content', 'Updated review');
    });

    it('should delete a review', async () => {
      const res = await request(app)
        .delete(`/reviews/${reviewId}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.statusCode).toBe(200);
    });
  });
});
