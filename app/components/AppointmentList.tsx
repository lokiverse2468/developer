'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import EditAppointmentModal from './EditAppointmentModal';
import ConfirmDialog from './ConfirmDialog';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Appointment {
  id: number;
  patient_name: string;
  doctor: string;
  scheduled_at: string;
  status: string;
  notes?: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
  pagination: {
    total: number;
    hasMore: boolean;
    hasPrev?: boolean;
    currentPage?: number;
    totalPages?: number;
  };
  skip: number;
  limit: number;
  onRefresh?: () => void;
}

export default function AppointmentList({
  appointments: initialAppointments,
  pagination,
  skip,
  limit,
  onRefresh,
}: AppointmentListProps) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null);

  useEffect(() => {
    setAppointments(initialAppointments);
  }, [initialAppointments]);

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    setUpdatingStatus(id);
    try {
      const result = await api.updateStatus(id, newStatus);
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === id
            ? { ...apt, status: newStatus, ...result.appointment }
            : apt
        )
      );
    } catch (error: any) {
      alert(error.message || 'Failed to update status');
      if (onRefresh) onRefresh();
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDeleteClick = (id: number) => {
    setAppointmentToDelete(id);
    setShowConfirmDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!appointmentToDelete) return;

    const appointmentId = appointmentToDelete;
    const appointmentToRestore = appointments.find(apt => apt.id === appointmentId);
    
    setShowConfirmDialog(false);
    setDeleting(appointmentId);
    
    setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId));
    
    if (onRefresh) {
      setTimeout(() => {
        onRefresh();
      }, 200);
    }
    
    api.deleteAppointment(appointmentId).catch((error: any) => {
      if (appointmentToRestore) {
        setAppointments((prev) => {
          const exists = prev.find(apt => apt.id === appointmentId);
          if (!exists) {
            return [...prev, appointmentToRestore].sort((a, b) => 
              new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
            );
          }
          return prev;
        });
      }
      alert(error.message || 'Failed to delete appointment. Item restored.');
    }).finally(() => {
      setDeleting(null);
      setAppointmentToDelete(null);
    });
  };

  const handleDeleteCancel = () => {
    setShowConfirmDialog(false);
    setAppointmentToDelete(null);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (appointments.length === 0) {
    return (
      <div className="empty-state">
        <h3>No appointments found</h3>
        <p>Create your first appointment using the form above.</p>
      </div>
    );
  }

  const nextSkip = skip + limit;
  const prevSkip = Math.max(0, skip - limit);
  const hasPrev = pagination.hasPrev !== undefined ? pagination.hasPrev : skip > 0;
  const hasNext = pagination.hasMore;

  return (
    <>
      {editingAppointment && (
        <EditAppointmentModal
          appointment={editingAppointment}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingAppointment(null);
          }}
          onSuccess={(updatedAppointment) => {
            if (editingAppointment && updatedAppointment) {
              setAppointments((prev) =>
                prev.map((apt) =>
                  apt.id === editingAppointment.id
                    ? { ...apt, ...updatedAppointment }
                    : apt
                )
              );
            }
          }}
        />
      )}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor</th>
              <th>Scheduled Time</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patient_name}</td>
                <td>{appointment.doctor}</td>
                <td>{formatDateTime(appointment.scheduled_at)}</td>
                <td>
                  <select
                    value={appointment.status}
                    onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                    disabled={updatingStatus === appointment.id}
                    className="status-select"
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #d1d5db',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: updatingStatus === appointment.id ? 'not-allowed' : 'pointer',
                      backgroundColor: '#ffffff',
                      color: '#374151',
                      minWidth: '120px',
                      transition: 'all 0.2s ease',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>{appointment.notes || '-'}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleEdit(appointment)}
                      className="btn-action btn-edit"
                      title="Edit Appointment"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '0.375rem',
                        color: '#3b82f6',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(appointment.id)}
                      className="btn-action btn-delete"
                      disabled={deleting === appointment.id}
                      title="Delete Appointment"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: deleting === appointment.id ? 'not-allowed' : 'pointer',
                        padding: '0.5rem',
                        borderRadius: '0.375rem',
                        color: deleting === appointment.id ? '#9ca3af' : '#ef4444',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: deleting === appointment.id ? 0.5 : 1,
                      }}
                      onMouseEnter={(e) => {
                        if (deleting !== appointment.id) {
                          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.total > 0 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing {skip + 1} - {Math.min(skip + limit, pagination.total)} of {pagination.total} appointments
          </div>
          <div className="pagination-controls">
            <div className="pagination-buttons">
              {hasPrev && (
                <Link
                  href={`/appointments?skip=${prevSkip}&limit=${limit}`}
                  className="btn btn-secondary"
                >
                  ← Previous
                </Link>
              )}
              {hasNext && (
                <Link
                  href={`/appointments?skip=${nextSkip}&limit=${limit}`}
                  className="btn btn-secondary"
                >
                  Next →
                </Link>
              )}
            </div>
            {(() => {
              const currentPage = pagination.currentPage || Math.floor(skip / limit) + 1;
              const totalPages = pagination.totalPages || Math.ceil(pagination.total / limit);
              
              if (totalPages <= 1) return null;
              
              const maxPagesToShow = 5;
              let startPage, endPage;
              
              if (totalPages <= maxPagesToShow) {
                startPage = 1;
                endPage = totalPages;
              } else if (currentPage <= 3) {
                startPage = 1;
                endPage = maxPagesToShow;
              } else if (currentPage >= totalPages - 2) {
                startPage = totalPages - maxPagesToShow + 1;
                endPage = totalPages;
              } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
              }
              
              return (
                <div className="pagination-pages">
                  {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                    const pageNum = startPage + i;
                    const pageSkip = (pageNum - 1) * limit;
                    const isActive = pageNum === currentPage;
                    
                    return (
                      <Link
                        key={pageNum}
                        href={`/appointments?skip=${pageSkip}&limit=${limit}`}
                        className={`pagination-page ${isActive ? 'active' : ''}`}
                      >
                        {pageNum}
                      </Link>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Delete Appointment"
        message="Are you sure you want to delete this appointment? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
