# Appointment Management System

A full-stack appointment management application with Express.js backend and Next.js frontend.

## Architecture

- **Backend (Express.js)**: Handles all database operations via Supabase
- **Frontend (Next.js)**: Client-side application that communicates with the backend API
- **Database**: Supabase (PostgreSQL)

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server/` directory:
   ```env
   PORT=3001
   SUPABASE_URL=https://vqcoyrbzqxhmqihqp.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the app directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the `app/` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

   The app will run on `http://localhost:3000`

## Important Notes

- **Backend handles all database operations** - The frontend does NOT have database credentials
- **Backend API**: `http://localhost:3001/api/appointments`
- **Frontend**: `http://localhost:3000`

## API Endpoints

### GET /api/appointments
Get appointments with pagination.

**Query Parameters:**
- `skip` (optional): Number of records to skip (default: 0)
- `limit` (optional): Number of records to return (default: 3, max: 100)

**Example:**
```
GET http://localhost:3001/api/appointments?skip=0&limit=3
```

### POST /api/appointments
Create a new appointment.

**Request Body:**
```json
{
  "patient_name": "John Doe",
  "doctor": "Dr. Smith",
  "scheduled_at": "2025-11-20T10:00:00Z",
  "notes": "Optional notes"
}
```

**Response:**
- `201 Created` on success
- `400 Bad Request` on validation error

## Project Structure

```
.
├── server/              # Express.js backend
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Middleware (caching, etc.)
│   ├── routes/         # API routes
│   └── index.js        # Server entry point
├── app/                # Next.js frontend
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   ├── lib/            # Utilities (API client)
│   └── public/         # Static files (logo, etc.)
└── schema.sql          # Database schema
```

## Features

- ✅ Create appointments with validation
- ✅ List appointments with pagination
- ✅ Application-level caching (backend)
- ✅ Browser-level caching (frontend)
- ✅ Professional UI design
- ✅ Responsive layout
