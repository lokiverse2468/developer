'use client';

import { useState, FormEvent } from 'react';
import { api } from '@/lib/api';

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

export default function AppointmentForm() {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: '',
    doctor: '',
    scheduled_at: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.patient_name.trim()) {
      newErrors.patient_name = 'Patient name is required';
    }

    if (!formData.doctor.trim()) {
      newErrors.doctor = 'Doctor name is required';
    }

    if (!formData.scheduled_at) {
      newErrors.scheduled_at = 'Scheduled date/time is required';
    } else {
      const scheduledDate = new Date(formData.scheduled_at);
      const now = new Date();

      if (isNaN(scheduledDate.getTime())) {
        newErrors.scheduled_at = 'Invalid date format';
      } else if (scheduledDate <= now) {
        newErrors.scheduled_at = 'Scheduled time must be in the future';
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

    setMessage(null);
    setIsPending(true);

    try {
      const scheduledDate = new Date(formData.scheduled_at);
      const isoDateTime = scheduledDate.toISOString();

      const result = await api.createAppointment({
        patient_name: formData.patient_name,
        doctor: formData.doctor,
        scheduled_at: isoDateTime,
        notes: formData.notes || undefined,
      });

      setMessage({ type: 'success', text: result.message || 'Appointment created successfully!' });
      setFormData({
        patient_name: '',
        doctor: '',
        scheduled_at: '',
        notes: '',
      });
      setErrors({});
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to create appointment' });
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

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    return now.toISOString().slice(0, 16);
  };

  return (
    <>
      {message && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patient_name">
            Patient Name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            id="patient_name"
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
          <label htmlFor="doctor">
            Doctor <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select
            id="doctor"
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
          <label htmlFor="scheduled_at">
            Scheduled Date & Time <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="datetime-local"
            id="scheduled_at"
            name="scheduled_at"
            value={formData.scheduled_at}
            onChange={handleChange}
            min={getMinDateTime()}
            disabled={isPending}
          />
          {errors.scheduled_at && (
            <div className="error">{errors.scheduled_at}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter any additional notes"
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create Appointment'}
        </button>
      </form>
    </>
  );
}
