import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { issueTokens, setAuthCookies, clearAuthCookies } from '../config/authToken.js';
import jwt from 'jsonwebtoken';
import { JWT_REFRESH_KEY } from '../config/env.js';

export const register = async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name,  surname,  email,  password: passwordHash, role: "customer" });

        const tokens = await issueTokens(newUser);
        setAuthCookies(res, tokens);

        res.status(201).json({ 
            message: 'User registered successfully',
            user: { id: newUser._id, name: newUser.name, surname: newUser.surname, email: newUser.email, role: newUser.role} 
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
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
        
        const tokens = await issueTokens(user);
        setAuthCookies(res, tokens);

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
    try {
        const token = req.cookies?.refreshToken;
        if (token) {
            const payload = jwt.verify(token, JWT_REFRESH_KEY);
            console.log('Logout payload:', payload);
            await User.findByIdAndUpdate(payload.id, { refreshTokenHash: null });
        }
        clearAuthCookies(res);
        return res.status(204).send();
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};