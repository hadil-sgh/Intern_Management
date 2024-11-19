import Team from '../models/team.js';
import User from '../models/user.js'; 

export const createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const team = await Team.create({ name });
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({ include: 'users' });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id, { include: 'users' });
    if (team) res.json(team);
    else res.status(404).json({ error: 'Team not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (team) {
      const { name } = req.body;
      await team.update({ name });
      res.json(team);
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (team) {
      await team.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addMemberToTeam = async (req, res) => {
  try {
    const { userId } = req.body;
    const team = await Team.findByPk(req.params.id);
    const user = await User.findByPk(userId);
    if (team && user) {
      await team.addUser(user);
      res.status(200).json({ message: 'User added to team' });
    } else {
      res.status(404).json({ error: 'Team or User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getTeamByUserId = async (req, res) => {
  try {
    const team = await Team.findOne({
      where: {
        userId: req.params.userId
      },
      include: [{ model: User, as: 'users' }] 
    });

    if (!team) {
      return res.status(404).json({ message: 'No team found for this user' });
    }

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
