# Lexaura - Text Editor & Manager

A modern web application for writing, editing, and managing your text documents with real-time preview.

## Features

- **Clean Text Editor** - Distraction-free writing environment with real-time preview
- **Text Management** - Dashboard to view, edit, and organize all your saved texts
- **Auto-Save** - Your work is automatically saved every 2 seconds
- **Copy to Clipboard** - Easily copy your text to use anywhere
- **Beautiful Landing Page** - Marketing page for non-authenticated users
- **User Authentication** - Secure sign-up and sign-in with Clerk
- **Responsive Design** - Works perfectly on desktop and mobile devices

## How It Works

1. **Write** - Enter your text in the clean, distraction-free editor
2. **Preview** - See your formatted text in real-time
3. **Save** - Your texts auto-save and appear in your dashboard
4. **Manage** - View, edit, and delete your saved texts from the dashboard
5. **Copy** - Use the floating copy button to grab your text

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up your environment variables:
   - Database connection (PostgreSQL)
   - Clerk authentication keys

3. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to start writing!

## Tech Stack

- **Next.js 15** - App Router with Server Components and Server Actions
- **TypeScript** - Full type safety throughout the application
- **Prisma** - Modern database ORM with PostgreSQL
- **Clerk** - Authentication and user management
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Beautiful, accessible component library
- **React Hook Form** - Form validation and management
- **Lucide Icons** - Clean, consistent iconography

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (main)/          # Main authenticated app
│   │   ├── dashboard/   # Text management dashboard
│   │   └── editor/      # Text editing interface
│   └── page.tsx         # Landing page
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
└── lib/                # Utilities and configurations
```

## Features in Detail

### 🎯 **Text Editor**

- Clean, distraction-free writing environment
- Side-by-side preview for real-time feedback
- Mobile-responsive with collapsible preview
- Auto-save every 2 seconds while typing

### 📊 **Dashboard**

- Grid view of all your saved texts
- Quick preview of content and last modified date
- Easy access to edit any text
- Delete functionality with confirmation dialogs

### 🔐 **Authentication**

- Secure sign-up and sign-in with Clerk
- Automatic redirect to dashboard after authentication
- Protected routes for authenticated users only

### 🎨 **User Experience**

- Beautiful landing page with clear value proposition
- Toast notifications for user feedback
- Loading states throughout the application
- Dark mode support via theme provider

## Contributing

This is a modern Next.js application built with the latest best practices. Feel free to contribute by submitting issues or pull requests.

## License

This project is for educational and personal use.
