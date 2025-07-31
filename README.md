# AgriLink Rwanda 

A modern agricultural marketplace connecting farmers with buyers across Rwanda. Built with React, TypeScript, and Supabase.

## Live Demo

[Visit AgriLink Rwanda](https://agrilink-rwanda.netlify.app)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Project](#running-the-project)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

##  Features

- **Multilingual Support**: English and Kinyarwanda
- **Dark/Light Theme**: Toggle between themes
- **Crop Management**: Create, edit, and manage crop listings
- **Order System**: Place and track orders 
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

##  Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/AgriLink-summative.git
cd AgriLink-summative
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages
  

##  Running the Project

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

##  Building for Production

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

##  Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

##  Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npx tsc --noEmit     # Type check without building
```



##  License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Larissa Noella Shimirwa**
- GitHub: [@Larissanoella-05](https://github.com/Larissanoella-05/AgriLink-summative)

---

**Happy Coding!**
