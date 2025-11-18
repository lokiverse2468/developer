'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import Navigation from '@/components/Navigation';
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
  const limit = 10;

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    hasMore: false,
    hasPrev: false,
    currentPage: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAppointments(skip, limit);
      const appointmentsList = data.appointments || [];
      setAppointments(appointmentsList);
      setPagination(data.pagination || { 
        total: appointmentsList.length, 
        hasMore: false,
        currentPage: 1,
        totalPages: 1,
        hasPrev: false
      });
    } catch (err: any) {
      setError(err.message || 'Failed to load appointments');
      setAppointments([]);
      setPagination({ total: 0, hasMore: false, currentPage: 1, totalPages: 1, hasPrev: false });
    } finally {
      setLoading(false);
    }
  }, [skip, limit]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <div className="appointments-layout">
      <div className="card appointment-form-card">
        <h2>Create New Appointment</h2>
        <AppointmentForm onSuccess={fetchAppointments} />
      </div>

      <div className="card appointment-list-card">
        <h2>Appointments List</h2>
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
    <>
      <Navigation hideBookButton={true} />
      <div className="container">
        <div className="header">
          <div className="logo-wrapper">
            <ApolloLogo width={100} height={100} />
          </div>
          <h1>Appointment Management</h1>
          <p>Create and manage patient appointments</p>
        </div>

        <Suspense fallback={<div className="loading">Loading...</div>}>
          <AppointmentsContent />
        </Suspense>
      </div>
    </>
  );
}
