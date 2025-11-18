const supabase = require('../config/database');
const { invalidateAppointmentsCache } = require('../middleware/cache');

const getAppointments = async (req, res, next) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 3;

    if (skip < 0 || limit < 1 || limit > 100) {
      return res.status(400).json({
        error: 'Invalid pagination parameters. skip >= 0, 1 <= limit <= 100'
      });
    }

    const [countResult, dataResult] = await Promise.all([
      supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true }),
      supabase
        .from('appointments')
        .select('id, patient_name, doctor, scheduled_at, status, notes, created_at, updated_at')
        .order('scheduled_at', { ascending: true })
        .range(skip, skip + limit - 1)
    ]);

    if (countResult.error) {
      throw countResult.error;
    }

    if (dataResult.error) {
      throw dataResult.error;
    }

    const total = countResult.count || 0;
    const appointments = dataResult.data || [];

    const currentPage = Math.floor(skip / limit) + 1;
    const totalPages = Math.ceil(total / limit);
    const hasMore = skip + limit < total;
    const hasPrev = skip > 0;

    res.json({
      appointments,
      pagination: {
        skip,
        limit,
        total,
        currentPage,
        totalPages,
        hasMore,
        hasPrev
      }
    });
  } catch (error) {
    next(error);
  }
};

const createAppointment = async (req, res, next) => {
  try {
    const { patient_name, doctor, scheduled_at, notes } = req.body;

    if (!patient_name || !doctor || !scheduled_at) {
      return res.status(400).json({
        error: 'Missing required fields: patient_name, doctor, and scheduled_at are required'
      });
    }

    const scheduledDate = new Date(scheduled_at);
    if (isNaN(scheduledDate.getTime())) {
      return res.status(400).json({
        error: 'Invalid scheduled_at format. Use ISO 8601 format (e.g., 2025-11-20T10:00:00Z)'
      });
    }

    const now = new Date();
    if (scheduledDate <= now) {
      return res.status(400).json({
        error: 'scheduled_at must be a future datetime'
      });
    }

    const { data, error } = await supabase
      .from('appointments')
      .insert({
        patient_name: patient_name.trim(),
        doctor: doctor.trim(),
        scheduled_at: scheduledDate.toISOString(),
        notes: notes || null,
        status: 'scheduled'
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    invalidateAppointmentsCache();

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: data
    });
  } catch (error) {
    next(error);
  }
};

const updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { patient_name, doctor, scheduled_at, notes } = req.body;

    if (!patient_name || !doctor || !scheduled_at) {
      return res.status(400).json({
        error: 'Missing required fields: patient_name, doctor, and scheduled_at are required'
      });
    }

    const scheduledDate = new Date(scheduled_at);
    if (isNaN(scheduledDate.getTime())) {
      return res.status(400).json({
        error: 'Invalid scheduled_at format. Use ISO 8601 format (e.g., 2025-11-20T10:00:00Z)'
      });
    }

    const { data, error } = await supabase
      .from('appointments')
      .update({
        patient_name: patient_name.trim(),
        doctor: doctor.trim(),
        scheduled_at: scheduledDate.toISOString(),
        notes: notes || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({
        error: 'Appointment not found'
      });
    }

    // Invalidate cache after update
    invalidateAppointmentsCache();

    res.json({
      message: 'Appointment updated successfully',
      appointment: data
    });
  } catch (error) {
    next(error);
  }
};

const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['scheduled', 'completed', 'cancelled'];
    if (!status || !validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const { data, error } = await supabase
      .from('appointments')
      .update({
        status: status.toLowerCase(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({
        error: 'Appointment not found'
      });
    }

    // Invalidate cache after update
    invalidateAppointmentsCache();

    res.json({
      message: 'Appointment status updated successfully',
      appointment: data
    });
  } catch (error) {
    next(error);
  }
};

const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data: existing, error: checkError } = await supabase
      .from('appointments')
      .select('id')
      .eq('id', id)
      .single();

    if (checkError || !existing) {
      return res.status(404).json({
        error: 'Appointment not found'
      });
    }

    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    invalidateAppointmentsCache();

    res.json({
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment
};

