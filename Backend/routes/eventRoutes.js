import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addMemberToEvent,
  getEventsByUserId,
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.get('/user/:userId', getEventsByUserId);
router.post('/:id/addMember', addMemberToEvent);

export default router;
