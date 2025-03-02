// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { UserProvider } from '../context/UserContext';

interface LayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Header />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}