import express from 'express';
import {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  addMemberToTeam,
  getTeamByUserId,
} from '../controllers/teamController.js';

const router = express.Router();

router.post('/', createTeam);
router.get('/', getTeams);
router.get('/:id', getTeamById);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);
router.get('/user/:userId', getTeamByUserId);
router.post('/:id/addMember', addMemberToTeam);

export default router;
