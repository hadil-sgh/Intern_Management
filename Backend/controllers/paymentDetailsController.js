import PaymentDetails from '../models/PaymentDetails.js';

export const createPaymentDetails = async (req, res) => {
    try {
        const paymentDetails = await PaymentDetails.create(req.body);
        res.status(201).json(paymentDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllPaymentDetails = async (req, res) => {
    try {
        const paymentDetails = await PaymentDetails.findAll();
        res.status(200).json(paymentDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPaymentDetailsById = async (req, res) => {
    try {
        const paymentDetails = await PaymentDetails.findByPk(req.params.id);
        if (paymentDetails) {
            res.status(200).json(paymentDetails);
        } else {
            res.status(404).json({ error: 'Payment Details not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePaymentDetails = async (req, res) => {
    try {
        const [updated] = await PaymentDetails.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedPaymentDetails = await PaymentDetails.findByPk(req.params.id);
            res.status(200).json(updatedPaymentDetails);
        } else {
            res.status(404).json({ error: 'Payment Details not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePaymentDetails = async (req, res) => {
    try {
        const deleted = await PaymentDetails.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Payment Details not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
