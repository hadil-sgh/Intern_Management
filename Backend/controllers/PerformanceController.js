import Performance from '../models/performance.js';

export const createPerformance = async (req, res) => {
  try {
    const performance = await Performance.create(req.body);
    res.status(201).json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPerformances = async (req, res) => {
  try {
    const performances = await Performance.findAll();
    res.status(200).json(performances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPerformanceById = async (req, res) => {
  try {
    const performance = await Performance.findByPk(req.params.id);
    if (!performance) return res.status(404).json({ message: 'Performance not found' });
    res.status(200).json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPerformancesByUserId = async (req, res) => {
  try {
    const performances = await Performance.findAll({
      where: {
        userId: req.params.userId
      }
    });
    if (!performances.length) return res.status(404).json({ message: 'No performances found for this user' });
    res.status(200).json(performances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updatePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByPk(req.params.id);
    if (!performance) return res.status(404).json({ message: 'Performance not found' });
    
    await performance.update(req.body);
    res.status(200).json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByPk(req.params.id);
    if (!performance) return res.status(404).json({ message: 'Performance not found' });
    
    await performance.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
