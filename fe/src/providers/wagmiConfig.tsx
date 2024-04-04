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
import { isProduction } from "@/lib/utls";

const blastTestnet: Chain = {
  id: 168587773,
  name: "Blast Sepolia",
  network: "Blast Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://rpc.ankr.com/blast_testnet_sepolia"] },
    default: { http: ["https://rpc.ankr.com/blast_testnet_sepolia"] },
  },
  blockExplorers: {
    default: { name: "BlastScope", url: "https://testnet.blastscan.io/" },
    etherscan: { name: "BlastScope", url: "https://testnet.blastscan.io/" },
  },
  testnet: true,
};

const blastMainnet: Chain = {
  id: 81457,
  name: "Blast mainnet",
  network: "Blast mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: {
      http: [
        "https://patient-green-ensemble.blast-mainnet.quiknode.pro/809fbaf16dafbe18f747d508686089eaffb96f59",
      ],
    },
    default: {
      http: [
        "https://patient-green-ensemble.blast-mainnet.quiknode.pro/809fbaf16dafbe18f747d508686089eaffb96f59",
      ],
    },
  },
  blockExplorers: {
    default: { name: "BlastScope", url: "https://blastscan.io/" },
    etherscan: { name: "BlastScope", url: "https://blastscan.io/" },
  },
  testnet: false,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    blastTestnet,
    blastMainnet,
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
const mainId = blastMainnet.id;

const defaultChainId = isProduction() ? mainId : devId;

export { wagmiConfig, demoAppInfo, chains, devId, mainId, defaultChainId };
