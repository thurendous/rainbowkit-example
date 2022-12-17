import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import {
    getDefaultWallets,
    RainbowKitProvider,
    darkTheme,
} from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains,
})

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
})

function MyApp({ Component, pageProps }) {
    console.log(process.env.ALCHEMY_ID)
    return (
        <div>
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider
                    theme={darkTheme({
                        accentColor: '#7b3fe4',
                        accentColorForeground: 'white',
                        borderRadius: 'medium',
                    })}
                    chains={chains}
                >
                    <Component {...pageProps} />
                </RainbowKitProvider>
            </WagmiConfig>
        </div>
    )
}

export default MyApp
