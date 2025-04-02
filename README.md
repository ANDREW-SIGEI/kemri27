# KEMRI Dashboard

A modern web application for KEMRI management system built with Next.js and Express.

## Project Structure

- `/KEMRI` - Frontend Next.js application
- `/src` - Backend Express.js API
- `/prisma` - Database schema and migrations

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/ANDREW-SIGEI/kemri27.git
cd kemri27
```

2. Install dependencies:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd KEMRI
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env` in both root and KEMRI directories
- Update the variables with your configuration

4. Start the development servers:

Backend:
```bash
npm run dev
```

Frontend:
```bash
cd KEMRI
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000

## Technologies Used

- Frontend:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - React

- Backend:
  - Express.js
  - TypeScript
  - Prisma ORM
  - PostgreSQL

## License

MIT 