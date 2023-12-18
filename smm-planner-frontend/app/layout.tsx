import './globals.css'
import  Providers  from '@/Provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <Providers>
          <div>
            {children}
          </div>
        </Providers>
  )
}
