import Event from '../models/events.js';
import User from '../models/user.js';

export const createEvent = async (req, res) => {
  try {
    const { event, date, userIds } = req.body; // Accept userIds from the request body
    const newEvent = await Event.create({ event, date });

    // Add users to the event if userIds are provided
    if (userIds && userIds.length > 0) {
      const users = await User.findAll({ where: { id: userIds } });
      await newEvent.addUsers(users); // Associate the users with the new event
    }

    // Return the newly created event, including associated users
    const eventWithUsers = await Event.findByPk(newEvent.id, { include: 'users' });
    res.status(201).json(eventWithUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ include: 'users' });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, { include: 'users' });
    if (event) res.json(event);
    else res.status(404).json({ error: 'Event not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      const { event: eventType, date } = req.body;
      await event.update({ event: eventType, date });
      res.json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      await event.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addMemberToEvent = async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findByPk(req.params.id);
    const user = await User.findByPk(userId);
    if (event && user) {
      await event.addUser(user);
      res.status(200).json({ message: 'User added to event' });
    } else {
      res.status(404).json({ error: 'Event or User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getEventsByUserId = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        userId: req.params.userId 
      }
    });

    if (!events.length) {
      return res.status(404).json({ message: 'No events found for this user' });
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};