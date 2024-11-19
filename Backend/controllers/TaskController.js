import Task from '../models/task.js';

export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    await task.update(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getTasksByUserId = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: {
        userId: req.params.userId
      }
    });
    if (!tasks.length) return res.status(404).json({ message: 'No tasks found for this user' });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    await task.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
};
