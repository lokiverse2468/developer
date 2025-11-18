'use client';

import { useState, FormEvent, useEffect } from 'react';
import { api } from '@/lib/api';

interface Appointment {
  id: number;
  patient_name: string;
  doctor: string;
  scheduled_at: string;
  status: string;
  notes?: string;
}

interface EditAppointmentModalProps {
  appointment: Appointment;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedAppointment?: Appointment) => void;
}

const DOCTORS = [
  { name: 'Dr. Rajesh Kumar', specialization: 'Cardiology' },
  { name: 'Dr. Priya Sharma', specialization: 'Pediatrics' },
  { name: 'Dr. Amit Patel', specialization: 'Orthopedics' },
  { name: 'Dr. Anjali Singh', specialization: 'Dermatology' },
  { name: 'Dr. Vikram Mehta', specialization: 'Neurology' },
  { name: 'Dr. Sneha Reddy', specialization: 'Gynecology' },
  { name: 'Dr. Rohit Gupta', specialization: 'Oncology' },
  { name: 'Dr. Meera Joshi', specialization: 'Psychiatry' },
  { name: 'Dr. Arjun Nair', specialization: 'Gastroenterology' },
  { name: 'Dr. Kavita Desai', specialization: 'Ophthalmology' },
  { name: 'Dr. Sanjay Verma', specialization: 'Urology' },
  { name: 'Dr. Neha Kapoor', specialization: 'Endocrinology' },
  { name: 'Dr. Manoj Tiwari', specialization: 'Pulmonology' },
  { name: 'Dr. Sunita Rao', specialization: 'Rheumatology' },
  { name: 'Dr. Karan Malhotra', specialization: 'General Surgery' },
];

export default function EditAppointmentModal({
  appointment,
  isOpen,
  onClose,
  onSuccess,
}: EditAppointmentModalProps) {
  const [formData, setFormData] = useState({
    patient_name: appointment.patient_name,
    doctor: appointment.doctor,
    scheduled_at: '',
    notes: appointment.notes || '',
  });
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const date = new Date(appointment.scheduled_at);
      const localDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      
      setFormData({
        patient_name: appointment.patient_name,
        doctor: appointment.doctor,
        scheduled_at: localDateTime,
        notes: appointment.notes || '',
      });
      setErrors({});
      setMessage(null);
    }
  }, [isOpen, appointment]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.patient_name.trim()) {
      newErrors.patient_name = 'Patient name is required';
    }

    if (!formData.doctor.trim()) {
      newErrors.doctor = 'Doctor is required';
    }

    if (!formData.scheduled_at) {
      newErrors.scheduled_at = 'Scheduled date/time is required';
    } else {
      const scheduledDate = new Date(formData.scheduled_at);
      if (isNaN(scheduledDate.getTime())) {
        newErrors.scheduled_at = 'Invalid date format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsPending(true);
    setMessage(null);

    try {
      const scheduledDate = new Date(formData.scheduled_at);
      const isoDateTime = scheduledDate.toISOString();

      const result = await api.updateAppointment(appointment.id, {
        patient_name: formData.patient_name,
        doctor: formData.doctor,
        scheduled_at: isoDateTime,
        notes: formData.notes || undefined,
      });

      setMessage({ type: 'success', text: 'Appointment updated successfully!' });
      setTimeout(() => {
        onSuccess(result.appointment);
        onClose();
      }, 1000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update appointment' });
    } finally {
      setIsPending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (message) {
      setMessage(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Appointment</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {message && (
          <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit_patient_name">
              Patient Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              id="edit_patient_name"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              placeholder="Enter patient name"
              disabled={isPending}
            />
            {errors.patient_name && (
              <div className="error">{errors.patient_name}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="edit_doctor">
              Doctor <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              id="edit_doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              disabled={isPending}
            >
              <option value="">Select a doctor</option>
              {DOCTORS.map((doctor, index) => (
                <option key={index} value={doctor.name}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
            {errors.doctor && (
              <div className="error">{errors.doctor}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="edit_scheduled_at">
              Scheduled Date & Time <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="datetime-local"
              id="edit_scheduled_at"
              name="scheduled_at"
              value={formData.scheduled_at}
              onChange={handleChange}
              disabled={isPending}
            />
            {errors.scheduled_at && (
              <div className="error">{errors.scheduled_at}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="edit_notes">Notes (Optional)</label>
            <textarea
              id="edit_notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter any additional notes"
              disabled={isPending}
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isPending}
            >
              {isPending ? 'Updating...' : 'Update Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

