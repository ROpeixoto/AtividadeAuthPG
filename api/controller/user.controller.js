import { registerUser, loginUser, getAllUsers } from '../services/user.services.js';

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const register = async (req, res) => {
    console.log("registering user:", req.body);

    if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({ message: 'Username, password and e-mail are required' });
    }

    const { username, password, email } = req.body;

    // Validação de e-mail
    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid e-mail format' });
    }

    // Validação de senha
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters long and include at least one uppercase and one lowercase letter',
        });
    }

    try {
        const savedUser = await registerUser({ username, password, email });
        console.log("saved user:", savedUser);
        return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error saving user:", error);
        return res.status(500).json({ message: 'Error saving user' });
    }
};

const login = async (req, res) => {
    console.log("logging in user:", req.body);

    if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({ message: 'Username, password, and e-mail are required' });
    }

    const { username, password, email } = req.body;

    try {
        const { user, token } = await loginUser({ username, password, email });
        console.log("User logged in successfully");
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error("Error logging in user:", error.message);
        return res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching users' });
    }
};

export default { register, login, getUsers };