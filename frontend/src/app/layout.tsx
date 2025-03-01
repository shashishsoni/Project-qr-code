// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}