// src/app/layout.tsx
import './globals.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { UserProvider } from '../context/UserContext';

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