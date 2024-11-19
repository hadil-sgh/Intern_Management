import Credit from '../models/Credit.js';
import nodemailer from 'nodemailer';
import User from '../models/user.js'; 
import sequelize from '../connection/database.js'; 


export const createCredit = async (req, res) => {
    try {
        const credit = await Credit.create(req.body);
        res.status(201).json(credit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const deleteMultipleCredits = async (req, res) => {
    try {
        const { creditIds } = req.body;

        if (!Array.isArray(creditIds) || creditIds.length === 0) {
            return res.status(400).json({ error: "No credit IDs provided" });
        }

        const ids = creditIds.map(id => {
            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId)) {
                return null;
            }
            return parsedId;
        }).filter(id => id !== null); 
        if (ids.length === 0) {

            return res.status(400).json({ error: "Invalid credit IDs provided" });
        }

        const deleteCount = await Credit.destroy({
            where: {
                id: ids
            }
        });

        if (deleteCount === 0) {
            return res.status(404).json({ error: "No credits found to delete" });
        }

        res.status(200).json({ message: "Credits deleted successfully", deletedCount: deleteCount });
    } catch (error) {
        console.error("Error deleting credits:", error);
        res.status(500).json({ error: "Server error" });
    }
};




export const getAllCredits = async (req, res) => {
    try {
        const credits = await Credit.findAll();
        res.status(200).json(credits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCreditById = async (req, res) => {
    try {
        const credit = await Credit.findByPk(req.params.id);
        if (credit) {
            res.status(200).json(credit);
        } else {
            res.status(404).json({ error: 'Credit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCredit = async (req, res) => {
    try {
        const [updated] = await Credit.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCredit = await Credit.findByPk(req.params.id);
            res.status(200).json(updatedCredit);
        } else {
            res.status(404).json({ error: 'Credit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCredit = async (req, res) => {
    try {
        const deleted = await Credit.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Credit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const updateCreditStatuswithEmail = async (req, res) => {
    try {
        const [updated] = await Credit.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedCredit = await Credit.findByPk(req.params.id, {
                include: {
                    model: User,
                    as: 'user',
                    attributes: ['email'] 
                }
            });

            if (!updatedCredit || !updatedCredit.user) {
                return res.status(404).json({ error: 'Credit or associated user not found' });
            }

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'careerlinkcontact@gmail.com',
                    pass: 'uiagglhthiipwzzq'
                }
            });

            const mailOptions = {
                from: 'careerlinkcontact@gmail.com',
                to: updatedCredit.user.email, 
                subject: 'Credit Status Updated',
                text: `The status of your credit (ID: ${updatedCredit.id}) has been updated to ${updatedCredit.creditStatus}.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });

            res.status(200).json(updatedCredit);
        } else {
            res.status(404).json({ error: 'Credit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};








export const getCreditPercentagesByType = async (req, res) => {
    try {
        const totalCredits = await Credit.count();

        if (totalCredits === 0) {
            return res.json([]);
        }

        const creditCountsByType = await Credit.findAll({
            attributes: [
                'creditType',
                [sequelize.fn('COUNT', sequelize.col('creditType')), 'count'],
            ],
            group: 'creditType',
        });

        const percentages = creditCountsByType.map((creditType) => {
            const count = creditType.getDataValue('count');
            return {
                creditType: creditType.getDataValue('creditType'),
                percentage: ((count / totalCredits) * 100).toFixed(2), 
            };
        });

        res.json(percentages);
    } catch (error) {
        console.error('Error:', error);
       
    }
};
