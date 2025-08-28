import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Resume Builder Pro - Create Professional Resumes Online',
  description: 'Build stunning professional resumes online with AI-powered content suggestions, premium templates, and easy sharing. Free resume builder website with premium features.',
  keywords: 'resume builder, CV maker, online resume, professional resume, resume templates, job application, career tools',
  authors: [{ name: 'Resume Builder Pro' }],
  creator: 'Resume Builder Pro',
  publisher: 'Resume Builder Pro',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://resumebuilderpro.com',
    siteName: 'Resume Builder Pro',
    title: 'Resume Builder Pro - Create Professional Resumes Online',
    description: 'Build stunning professional resumes online with AI-powered content suggestions and premium templates.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Resume Builder Pro - Professional Resume Templates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume Builder Pro - Create Professional Resumes Online',
    description: 'Build stunning professional resumes online with AI-powered content suggestions.',
    images: ['/og-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3b82f6',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </body>
    </html>
  )
}