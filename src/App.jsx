import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
import { config, projectId, chains } from './config/web3Config'
import Layout from './components/layout/Layout'
import SearchInterface from './components/common/SearchInterface'

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
            <div className="h-[calc(100vh-500px)] flex items-center justify-center">
              <SearchInterface />
            </div>
          </Layout>
        </QueryClientProvider>
      </WagmiProvider>
    </ReduxProvider>
  )
}

export default App
