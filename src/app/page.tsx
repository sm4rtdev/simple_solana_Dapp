'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram, Transaction, Connection } from '@solana/web3.js'
import WalletButton from '@/components/WalletButton'
import ClientOnly from '@/components/ClientOnly'

export default function Home() {
  const { publicKey, sendTransaction } = useWallet()
  const connection = new Connection('https://api.devnet.solana.com')

  const sendSol = async () => {
    if (!publicKey) return alert('Please connect wallet.')

    try {
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey,
          lamports: 1000,
        })
      )

      const signature = await sendTransaction(tx, connection)
      await connection.confirmTransaction(signature, 'confirmed')

      // ✅ Send to backend
      await fetch('http://localhost:4000/log-tx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signature,
          wallet: publicKey.toBase58(),
        }),
      })

      alert(`TX confirmed & logged: ${signature}`)
    } catch (err) {
      console.error(err)
      alert('Something went wrong.')
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Solana dApp (App Router)</h1>
      <ClientOnly>
        <WalletButton />
      </ClientOnly>
      <button
        onClick={sendSol}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Send Test TX
      </button>
    </main>
  )
}
