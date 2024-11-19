import crypto from 'crypto'; 
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/user.js'; 

const generateRandomPassword = (length = 12) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
};

const sendPasswordEmail = async (userEmail, userName, password) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'careerlinkcontact@gmail.com',
            pass: 'uiagglhthiipwzzq',
        },
    });

    const mailOptions = {
        from: 'careerlinkcontact@gmail.com',
        to: userEmail,
        subject: 'Account Created Successfully',
        text: `Hello ${userName},\n\nYour account has been created successfully. Here are your login details:\n\nUsername: ${userName}\nPassword: ${password}\n\nPlease change your password after logging in.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

const createUser = async (req, res) => {
    try {
        const { userName, email, nom, prenom, dateNaissance, cin, NumTel, role } = req.body;

        if (!userName || !email || !nom || !prenom || !dateNaissance || !cin || !NumTel || !role) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const password = generateRandomPassword();

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            userName,
            password: hashedPassword,
            email,
            nom,
            prenom,
            dateNaissance,
            cin,
            NumTel,
            role
        });

        await sendPasswordEmail(email, userName, password);

        res.status(201).json({ message: 'User created and password sent via email', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error); 
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ where: { userName } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, userName: user.userName, role: user.role }, 
            'your_jwt_secret', 
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const logoutUser = async (req, res) => {
    try {
        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    logoutUser,
    loginUser
};
