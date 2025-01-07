import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
import { config, projectId , chains } from './config/web3Config'
import Layout from './components/layout/Layout'

// 3. Create modal
createWeb3Modal({ wagmiConfig: config, projectId, chains })

// 4. Create query client
const queryClient = new QueryClient()


function App() {


  return (
    <ReduxProvider store={store}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <h1 className="text-3xl font-bold underline mb-4 text-center">
              React + Vite + TailwindCSS + Web3Modal + Wagmi + Hedera + Redux
            </h1>
          </Layout>
        </QueryClientProvider>
      </WagmiProvider>
    </ReduxProvider>
  )
}

export default App
