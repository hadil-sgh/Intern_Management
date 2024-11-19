import RepaymentPlan from '../models/RepaymentPlan.js';

export const createRepaymentPlan = async (req, res) => {
    try {
        const repaymentPlan = await RepaymentPlan.create(req.body);
        res.status(201).json(repaymentPlan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllRepaymentPlans = async (req, res) => {
    try {
        const repaymentPlans = await RepaymentPlan.findAll();
        res.status(200).json(repaymentPlans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRepaymentPlanById = async (req, res) => {
    try {
        const repaymentPlan = await RepaymentPlan.findByPk(req.params.id);
        if (repaymentPlan) {
            res.status(200).json(repaymentPlan);
        } else {
            res.status(404).json({ error: 'Repayment Plan not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateRepaymentPlan = async (req, res) => {
    try {
        const [updated] = await RepaymentPlan.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedRepaymentPlan = await RepaymentPlan.findByPk(req.params.id);
            res.status(200).json(updatedRepaymentPlan);
        } else {
            res.status(404).json({ error: 'Repayment Plan not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteRepaymentPlan = async (req, res) => {
  try {
      const deleted = await RepaymentPlan.destroy({
          where: { id: req.params.id }
      });
      if (deleted) {
          res.status(204).json();
      } else {
          res.status(404).json({ error: 'Repayment Plan not found' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};