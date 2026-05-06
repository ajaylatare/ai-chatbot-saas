const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { success, error } = require('../utils/responseFormatter');
require('dotenv').config();

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kya email pehle se exist karti hai?
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return error(res, 'Email already registered', 400);
    }

    // Password encrypt karo (kabhi plain text save mat karo)
    const hashedPassword = await bcrypt.hash(password, 10);

    // User save karo database mein
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return success(res, { id: user.id, name: user.name, email: user.email }, 'Registered successfully', 201);

  } catch (err) {
    return error(res, err.message);
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // User dhundo
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return error(res, 'Invalid email or password', 400);
    }

    // Password match karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return error(res, 'Invalid email or password', 400);
    }

    // Token banao
    const token = jwt.sign(
      { id: user.id, email: user.email, plan: user.plan },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return success(res, {
      token,
      user: { id: user.id, name: user.name, email: user.email, plan: user.plan }
    }, 'Login successful');

  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { register, login };