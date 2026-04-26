# ?? Hostel Grievance System (HGS)

A full-stack web application for managing hostel complaints and grievances with role-based access control.

## ? Features

- ?? User Authentication (Login, Signup, Password Reset)
- ?? Role-Based Access (Admin & User)
- ?? Create, View, Edit, Delete Grievances
- ?? Responsive Design
- ?? Modern UI with Material UI

## ??? Tech Stack

### Frontend

| Technology | Version |
|------------|---------|
| React | ^18.2.0 |
| TypeScript | ^5.3.0 |
| Vite | ^5.0.0 |
| React Router DOM | ^6.20.0 |
| Material UI | ^5.14.20 |
| Emotion | ^11.11.1 |
| Axios | ^1.6.0 |
| Sass | ^1.69.0 |

### Backend

- **.NET 10** - Web API
- **Neon** - Serverless PostgreSQL Database

### Deployment

| Platform | Purpose |
|----------|---------|
| Vercel | Frontend Hosting |
| Azure | Backend Hosting |
| Neon | Serverless PostgreSQL Database |

## ??? Architecture

```
+-----------------------------------------------------------------+
�                         CLIENT (Vercel)                         �
�                    React + Vite + TypeScript                    �
+-----------------------------------------------------------------�
�  Components: Login | Home | HgsTypes | GrievanceList | Edit     �
�  Services: userService | typesService                           �
�  Guards: ProtectedRoute | Hooks: useAuth                        �
+-----------------------------------------------------------------+
                                � HTTP (Axios)
                                ?
+-----------------------------------------------------------------+
�                        SERVER (Azure)                           �
�                      .NET 10 Web API                            �
+-----------------------------------------------------------------�
�  Controllers: UserController | HgsInfoController                �
�  Endpoints: /api/User | /api/HgsInfo                            �
+-----------------------------------------------------------------+
                                � Entity Framework
                                ?
+-----------------------------------------------------------------+
�                       DATABASE (Neon)                           �
�                    Serverless PostgreSQL                        �
+-----------------------------------------------------------------+
```

## ?? Project Structure

```
src/
+-- components/
�   +-- Header/Header.tsx        # Navigation bar
�   +-- Login/Login.tsx          # Auth page (Login/Signup)
�   +-- Home/Home.tsx            # Dashboard
�   +-- HgsTypes/HgsTypes.tsx    # Create grievance form
�   +-- GrievanceList/GrievanceList.tsx  # List all grievances
�   +-- Edit/Edit.tsx            # Edit grievance form
+-- guards/
�   +-- ProtectedRoute.tsx       # Route protection HOC
+-- hooks/
�   +-- useAuth.ts               # Authentication hook
+-- models/
�   +-- types.ts                 # TypeScript interfaces
+-- services/
    +-- userService.ts           # User API calls
    +-- typesService.ts          # Grievance API calls
```

## ?? Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/` | Login, Signup, Forgot Password |
| Home | `/home` | Dashboard with system overview |
| Create Grievance | `/types` | Form to submit new grievance |
| Grievance List | `/grievanceList` | View all grievances (role-based) |
| Edit Grievance | `/updateList/:id` | Update existing grievance |

## ?? Roles & Permissions

| Role | Email Domain | Permissions |
|------|--------------|-------------|
| **Admin** | `*@hgs.com` | View/Edit/Delete ALL grievances |
| **User** | Any other domain | View/Edit/Delete ONLY own grievances |

```typescript
// Role determination logic
const getRole = (email: string): UserRole => {
  return email.toLowerCase().endsWith('@hgs.com') ? 'admin' : 'user';
};
```

## ?? API Endpoints

### User Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/User` | Register new user |
| GET | `/api/User` | Authenticate user |
| PUT | `/api/User/:id` | Reset password |

### Grievance Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/HgsInfo` | Create grievance |
| GET | `/api/HgsInfo` | List all grievances |
| GET | `/api/HgsInfo/:id` | Get single grievance |
| PUT | `/api/HgsInfo/:id` | Update grievance |
| DELETE | `/api/HgsInfo/:id` | Delete grievance |

## ?? Data Models

```typescript
interface HgsTypes {
  id: string;
  name: string;
  grievancetypes: string;
  room: number;
  course: string;
  mobile: number;
  description: string;
  userEmail?: string;
  status?: 'pending' | 'in-progress' | 'resolved';
}

interface User {
  token: string;
  username?: string;
  email?: string;
  role?: 'admin' | 'user';
}
```

## ?? Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd hgs-react

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ?? Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `vite` | Start dev server on port 3000 |
| `dev` | `vite` | Start dev server |
| `build` | `tsc && vite build` | Build for production |
| `preview` | `vite preview` | Preview production build |

## ?? Deployment

### Frontend (Vercel)

The app is configured for Vercel deployment with SPA routing.

### Backend (Azure)

- Deployed as Azure App Service
- .NET 10 Web API

### Database (Neon)

- Serverless PostgreSQL
- Auto-scaling enabled

---

**Built with ?? using React, TypeScript & Vite**
