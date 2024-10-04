User Management

a. Register User

Endpoint: POST /api/users/register
Body: { email, password }
Response: { id, email }
b. Login User

Endpoint: POST /api/users/login
Body: { email, password }
Response: { token, user: { id, email } }
c. Logout User

Endpoint: POST /api/users/logout
d. Get User Profile

Endpoint: GET /api/users/profile
Authentication: Required
e. Google OAuth Login

Endpoint: POST /api/users/google-login
Body: { googleToken }
Response: { access_token, user }
Destination Management

a. Create Destination

Endpoint: POST /api/destinations
Body: { name, description, location, price }
Response: Created destination object
b. Get All Destinations

Endpoint: GET /api/destinations
Response: Array of destination objects
c. Update Destination

Endpoint: PUT /api/destinations/:id
Body: Updated destination fields
Response: Updated destination object
d. Delete Destination

Endpoint: DELETE /api/destinations/:id
Review Management

a. Create Review

Endpoint: POST /api/destinations/:destinationId/reviews
Authentication: Required
Body: { content, rating }
Response: Created review object
b. Update Review

Endpoint: PUT /api/reviews/:reviewId
Authentication: Required
Body: { content, rating }
Response: Updated review object
c. Delete Review

Endpoint: DELETE /api/reviews/:reviewId
Authentication: Required