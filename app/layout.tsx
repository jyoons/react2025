import '@/styles/globals.scss'
import '@/components/Header.scss'
import Header from '@/components/Header'

export const metadata = {
  title: '통역봇 시스템',
  description: '통역봇 시스템',
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
