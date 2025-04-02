import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KEMRI Document Management System',
  description: 'Document Management System for KEMRI',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out lg:ml-64 md:ml-0 sm:ml-0">
            <Header />
            <main className="flex-1 p-3 sm:p-4 md:p-6 mt-16 transition-all duration-300 ease-in-out overflow-x-auto"
                  style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d',
                  }}>
              <div className="transform transition-all duration-300 hover:scale-[1.01] w-full"
                   style={{
                     transformStyle: 'preserve-3d',
                     transform: 'translateZ(5px) rotateX(1deg)',
                   }}>
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
} 