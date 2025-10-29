import '@/styles/globals.scss'
import '@/components/Header.scss'
import Header from '@/components/Header'
import '@/components/Button.scss'

export const metadata = {
  title: 'react',
  description: 'react',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <div className='container'>
        {children}
        </div>
      </body>
    </html>
  )
}
