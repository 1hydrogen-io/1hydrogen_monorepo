import { Chain, configureChains, createConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";

import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";


const blastTestnet: Chain = {
  id: 168587773,
  name: 'Blast Sepolia',
  network: 'Blast Sepolia',  
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpc.ankr.com/blast_testnet_sepolia'] },
    default: { http: ['https://rpc.ankr.com/blast_testnet_sepolia'] },
  },
  blockExplorers: {
    default: { name: 'BlastScope', url: 'https://testnet.blastscan.io/' },
    etherscan: { name: 'BlastScope', url: 'https://testnet.blastscan.io/' },
  },  
  testnet: true,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    blastTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const projectId = "c8c689289f7b3547fc20222dfa21f7d2";
const { wallets } = getDefaultWallets({
  appName: "Blast Staking",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "Blast Staking",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const devId = blastTestnet.id;

export { wagmiConfig, demoAppInfo, chains, devId };
