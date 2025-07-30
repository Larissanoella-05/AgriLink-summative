# AgriLink Rwanda 🌾

A modern agricultural marketplace connecting farmers with buyers across Rwanda. Built with React, TypeScript, and Supabase.

## 🚀 Live Demo

[Visit AgriLink Rwanda](https://agrilink-rwanda.netlify.app)

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Project](#running-the-project)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## ✨ Features

- **Multilingual Support**: English and Kinyarwanda
- **Dark/Light Theme**: Toggle between themes
- **Crop Management**: Create, edit, and manage crop listings
- **Order System**: Place and track orders with local storage
- **Review System**: Rate and review crops
- **Analytics Dashboard**: Farmer analytics and order management
- **Education Center**: Agricultural learning resources
- **Responsive Design**: Works on all devices
- **Real-time Updates**: Using React Query for data management

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (comes with Node.js)
- **Git**
- **Code Editor** (VS Code recommended)

### Check your versions:
```bash
node --version
npm --version
git --version
```

## 📦 Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/AgriLink-summative.git
cd AgriLink-summative
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React 18.3.1
- TypeScript 5.6.2
- Vite (build tool)
- Tailwind CSS
- Supabase
- React Query
- And many more...

## 🔐 Environment Setup

### Step 1: Create Environment File
Create a `.env` file in the root directory:
```bash
touch .env
```

### Step 2: Add Environment Variables
Add the following variables to your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 3: Get Supabase Credentials
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API
4. Copy your Project URL and anon/public key
5. Replace the values in your `.env` file

### Step 4: Set up Supabase Database
Create the following tables in your Supabase database:

```sql
-- Users table
CREATE TABLE authUsers (
  id TEXT PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phoneNumber TEXT,
  avatar TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crops table
CREATE TABLE crops (
  id SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES authUsers(id),
  name TEXT NOT NULL,
  image TEXT,
  description TEXT,
  category TEXT,
  price DECIMAL(10,2) NOT NULL,
  location TEXT,
  quantity INTEGER,
  unit TEXT,
  harvest_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  crop_id INTEGER REFERENCES crops(id),
  user_id TEXT REFERENCES authUsers(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  comment TEXT,
  rate INTEGER CHECK (rate >= 1 AND rate <= 5),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🏃‍♂️ Running the Project

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Open in Browser
The application will be available at:
```
http://localhost:5173
```

### Step 3: Verify Setup
- Check that the app loads without errors
- Test user registration/login
- Verify database connections work
- Test theme switching and language toggle

## 🔨 Building for Production

### Step 1: Run Type Check
```bash
npx tsc --noEmit
```

### Step 2: Build the Project
```bash
npm run build
```

### Step 3: Preview Production Build
```bash
npm run preview
```

The build files will be in the `dist` folder.

## 🚀 Deployment

### Deploy to Netlify

1. **Build the project locally:**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. **Or deploy via GitHub:**
   - Push your code to GitHub
   - Connect your repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard

### Environment Variables for Production
In your deployment platform, add:
```
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_key
```

## 📁 Project Structure

```
AgriLink-summative/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── contexts/         # React contexts (Theme, Language)
│   ├── features/         # Feature-based modules
│   │   ├── Authentication/
│   │   ├── Crops/
│   │   ├── Products/
│   │   └── Reviews/
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── UI/              # UI components
│   ├── utils/           # Utility functions
│   ├── interfaces.ts    # TypeScript interfaces
│   └── App.tsx          # Main app component
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🛠 Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: React Query, React Context
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Internationalization**: React i18next

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npx tsc --noEmit     # Type check without building
```

## 🐛 Troubleshooting

### Common Issues:

1. **Node version error**: Ensure Node.js 18+ is installed
2. **Environment variables not working**: Check `.env` file format and restart dev server
3. **Supabase connection error**: Verify your Supabase credentials
4. **Build fails**: Run `npx tsc --noEmit` to check for TypeScript errors

### Getting Help:

- Check the browser console for errors
- Verify all environment variables are set
- Ensure Supabase database tables are created
- Check network connectivity

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Larissa Noella Shimirwa**
- GitHub: [@Larissanoella-05](https://github.com/Larissanoella-05/AgriLink-summative)

---

**Happy Coding! 🚀**