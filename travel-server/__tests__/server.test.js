const request = require("supertest");
const app = require("../app");
const { User, Destination, Review } = require("../models");

describe("Travel Server API", () => {
  let authToken;

  beforeAll(async () => {
    // Reset database
    await User.destroy({ where: { email: "test@example.com" } });
    await User.sync({ force: true });
    await Destination.sync({ force: true });
    await Review.sync({ force: true });
  });

  describe("User Routes", () => {
    it("should register a new user", async () => {
      const res = await request(app)
        .post("/register")
        .send({ email: "test@example.com", password: "password123" });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("email", "test@example.com");
    });

    it("should not register a user with an existing email", async () => {
      const res = await request(app)
        .post("/register")
        .send({ email: "test@example.com", password: "password123" });
      expect(res.statusCode).toBe(400);
    });

    it("should login a user", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password123" });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
      authToken = res.body.token; // Save the auth token for later use
    });

    it("should not login with incorrect credentials", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "wrongpassword" });
      expect(res.statusCode).toBe(401);
    });

    it("should get user profile with valid token", async () => {
      const res = await request(app)
        .get("/profile")
        .set("Authorization", `Bearer ${authToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("email", "test@example.com");
    });

    it("should not get profile without auth token", async () => {
      const res = await request(app).get("/profile");
      expect(res.statusCode).toBe(401);
    });

    it("should logout a user", async () => {
      const res = await request(app)
        .post("/logout")
        .set("Authorization", `Bearer ${authToken}`);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Destination Routes", () => {
    let destinationId;

    it("should create a new destination with auth", async () => {
      const res = await request(app)
        .post("/destinations")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "Test Destination",
          description: "A beautiful place",
          location: "Test Location",
          price: 100,
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id");
      destinationId = res.body.id;
    });

    it("should not create a destination without auth", async () => {
      const res = await request(app)
        .post("/destinations")
        .send({
          name: "Test Destination",
          description: "A beautiful place",
          location: "Test Location",
          price: 100,
        });
      expect(res.statusCode).toBe(401);
    });

    it("should get all destinations", async () => {
      const res = await request(app)
      .get("/destinations")
      .set("Authorization", `Bearer ${authToken}`)
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });

    it("should update a destination with auth", async () => {
      const res = await request(app)
        .put(`/destinations/${destinationId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "Updated Destination",
          description: "An even more beautiful place",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name", "Updated Destination");
    });

    it("should not update a non-existent destination", async () => {
      const res = await request(app)
        .put("/destinations/999999")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ name: "Updated Destination" });
      expect(res.statusCode).toBe(404);
    });

    it("should delete a destination with auth", async () => {
      const res = await request(app)
        .delete(`/destinations/${destinationId}`)
        .set("Authorization", `Bearer ${authToken}`);
      expect(res.statusCode).toBe(200);
    });

    it("should not delete a non-existent destination", async () => {
      const res = await request(app)
        .delete("/destinations/999999")
        .set("Authorization", `Bearer ${authToken}`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe("Review Routes", () => {
    let destinationId, reviewId;

    beforeAll(async () => {
      const destination = await Destination.create({
        name: "Review Test Destination",
        description: "For testing reviews",
        location: "Test Location",
        price: 100,
      });
      destinationId = destination.id;
    });

    it("should create a new review with auth", async () => {
      const res = await request(app)
        .post(`/destination/${destinationId}/reviews`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ content: "Great place!", rating: 5 });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id");
      reviewId = res.body.id;
    });

    it("should not create a review for non-existent destination", async () => {
      const res = await request(app)
        .post("/destination/999999/reviews")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ content: "Great place!", rating: 5 });
      expect(res.statusCode).toBe(404);
    });

    it("should get reviews for a destination", async () => {
      const res = await request(app).get(
        `/destination/${destinationId}/reviews`
      );
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });

    it("should update a review with auth", async () => {
      const res = await request(app)
        .put(`/reviews/${reviewId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ content: "Updated review", rating: 4 });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("content", "Updated review");
    });

    it("should not update a non-existent review", async () => {
      const res = await request(app)
        .put("/reviews/999999")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ content: "Updated review", rating: 4 });
      expect(res.statusCode).toBe(404);
    });

    it("should delete a review with auth", async () => {
      const res = await request(app)
        .delete(`/reviews/${reviewId}`)
        .set("Authorization", `Bearer ${authToken}`);
      expect(res.statusCode).toBe(200);
    });

    it("should not delete a non-existent review", async () => {
      const res = await request(app)
        .delete("/reviews/999999")
        .set("Authorization", `Bearer ${authToken}`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe("Gemini Routes", () => {
    it("should generate Gemini content", async () => {
      const res = await request(app)
        .post("/gemini/generate-gemini-content")
        .send({ prompt: "Test prompt" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("candidates");
      expect(Array.isArray(res.body.candidates)).toBe(true);
      expect(res.body.candidates[0]).toHaveProperty("content");
      expect(Array.isArray(res.body.candidates[0].content.parts)).toBe(true);
      expect(typeof res.body.candidates[0].content.parts[0].text).toBe(
        "string"
      );
    });
  });
});
