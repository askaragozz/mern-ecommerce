import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
             name, 
             surname, 
             email, 
             password: passwordHash });

        res.status(201).json({ 
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                surname: newUser.surname,
                email: newUser.email,
            } 
        });

    } catch (error) {
        if (error?.code === 11000) return res.status(400).json({ message: 'User already exists' });

        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }

};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ 
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
            } 
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const logout = async (req, res) => {
    res.send('User logged out');
};