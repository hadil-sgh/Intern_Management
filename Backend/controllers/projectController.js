import Project from '../models/Project.js';
import User from '../models/user.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

export const createProject = async (req, res) => {
  const { name, description } = req.body;
  try {
    const project = await Project.create({ name, description });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    await project.update({ name, description });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    await project.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

/**
 * Assigns a user to a project.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const assignUserToProject = async (req, res) => {
  const { userId, projectId } = req.body;

  try {
    // Find the user and project
    const user = await User.findByPk(userId);
    const project = await Project.findByPk(projectId);

    // Check if user and project exist
    if (!user || !project) {
      return res.status(404).json({ error: 'User or Project not found' });
    }

    // Assign the user to the project
    project.userId = user.id;
    await project.save();

    res.status(200).json({
      message: `User with ID ${userId} has been assigned to Project with ID ${projectId}`,
      project,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign user to project' });
  }
};
