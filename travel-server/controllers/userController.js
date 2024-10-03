const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = await User.create({ email, password });
        res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.status(200).json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ id: user.id, email: user.email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const googleAuth = async (req, res) => {
    const { googleToken } = req.body;
  
    try {
      // Verify Google token
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
      const { email } = payload;
  
      // Find or create the user in your database
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
          provider: 'google',
          password: 'google_id'  // Placeholder password for Google OAuth
        },
        hooks: false  // Disable any hooks if not required for OAuth
      });
  
      // Generate a JWT token for the user
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  
      res.status(200).json({ access_token: token, user });
  
    } catch (error) {
      res.status(500).json({ error: 'Failed to authenticate with Google' });
    }
  };
  

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    googleAuth,
};
