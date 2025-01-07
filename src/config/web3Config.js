import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { arbitrum, mainnet, hedera, hederaTestnet, polygon, polygonAmoy, rootstock, rootstockTestnet } from 'wagmi/chains';

const projectId = '2c4250b0ed1c4c85027974613fc83eaf';

const metadata = {
  name: 'deApp',
  description: 'deApp for testing',
  url: 'http://localhost:5173',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const chains = [mainnet, arbitrum, hedera, hederaTestnet, polygon, polygonAmoy, rootstock, rootstockTestnet];
export const config = defaultWagmiConfig({ chains, projectId, metadata });
export { projectId };