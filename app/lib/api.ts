const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  getAppointments: async (skip: number = 0, limit: number = 3) => {
    const response = await fetch(`${API_BASE_URL}/api/appointments?skip=${skip}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch appointments: ${response.statusText}`);
    }

    return response.json();
  },

  createAppointment: async (data: {
    patient_name: string;
    doctor: string;
    scheduled_at: string;
    notes?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to create appointment: ${response.statusText}`);
    }

    return response.json();
  },

  updateAppointment: async (id: number, data: {
    patient_name: string;
    doctor: string;
    scheduled_at: string;
    notes?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to update appointment: ${response.statusText}`);
    }

    return response.json();
  },

  updateStatus: async (id: number, status: string) => {
    const response = await fetch(`${API_BASE_URL}/api/appointments/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to update status: ${response.statusText}`);
    }

    return response.json();
  },

  deleteAppointment: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to delete appointment: ${response.statusText}`);
    }

    return response.json();
  },
};

