import User from '../models/user.model.js';

export const validateRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });
    if (String(password).length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters long' });

    const normalizedEmail = String(email).toLowerCase().trim();
    req.body.email = normalizedEmail;

    const userExists = await User.exists({ email: normalizedEmail });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    return next();
  } catch (err) {
    return next(err);
  }
};
