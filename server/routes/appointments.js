const express = require('express');
const router = express.Router();
const { 
  getAppointments, 
  createAppointment, 
  updateAppointment, 
  updateAppointmentStatus, 
  deleteAppointment 
} = require('../controllers/appointmentsController');
const { cacheMiddleware } = require('../middleware/cache');

router.get('/', cacheMiddleware, getAppointments);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.patch('/:id/status', updateAppointmentStatus);
router.delete('/:id', deleteAppointment);

module.exports = router;

