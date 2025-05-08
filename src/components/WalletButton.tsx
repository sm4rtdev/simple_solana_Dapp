'use client'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function WalletButton() {
    return (
        <div className="mb-4">
            <WalletMultiButton />
        </div>
    )
}
