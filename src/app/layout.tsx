import './globals.css'
import { ReactNode } from 'react'
import { WalletContextProvider } from '@/components/WalletContextProvider'

export const metadata = {
  title: 'Solana DApp',
  description: 'Test dApp with Phantom wallet',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletContextProvider>{children}</WalletContextProvider>
      </body>
    </html>
  )
}
