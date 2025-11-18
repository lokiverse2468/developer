'use client';

import { useState, useEffect, Suspense } from 'react';
import ApolloLogo from '@/components/ApolloLogo';
import AppointmentForm from '@/components/AppointmentForm';
import AppointmentList from '@/components/AppointmentList';
import { api } from '@/lib/api';
import { useSearchParams } from 'next/navigation';

interface Appointment {
  id: number;
  patient_name: string;
  doctor: string;
  scheduled_at: string;
  status: string;
  notes?: string;
}

function AppointmentsContent() {
  const searchParams = useSearchParams();
  const skip = parseInt(searchParams.get('skip') || '0');
  const limit = 3;

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    hasMore: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAppointments(skip, limit);
      setAppointments(data.appointments || []);
      setPagination(data.pagination || { total: 0, hasMore: false });
    } catch (err: any) {
      setError(err.message || 'Failed to load appointments');
      setAppointments([]);
      setPagination({ total: 0, hasMore: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [skip, limit]);

  return (
    <div className="appointments-layout">
      <div className="card appointment-form-card">
        <h2 style={{ marginBottom: '1.5rem', color: '#374151' }}>
          Create New Appointment
        </h2>
        <AppointmentForm />
      </div>

      <div className="card appointment-list-card">
        <h2 style={{ marginBottom: '1.5rem', color: '#374151' }}>
          Appointments List
        </h2>
        {loading ? (
          <div className="loading">Loading appointments...</div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : (
          <AppointmentList
            appointments={appointments}
            pagination={pagination}
            skip={skip}
            limit={limit}
            onRefresh={fetchAppointments}
          />
        )}
      </div>
    </div>
  );
}

export default function AppointmentsPage() {
  return (
    <div className="container">
      <div className="header">
        <ApolloLogo width={100} height={100} />
        <h1>Appointment Management</h1>
        <p>Create and manage patient appointments</p>
      </div>

      <Suspense fallback={<div className="loading">Loading...</div>}>
        <AppointmentsContent />
      </Suspense>
    </div>
  );
}
