"use client";
import store from "@/lib/reduxs/store";
import theme from "@/themes";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import {
  chains,
  defaultChainId,
  demoAppInfo,
  wagmiConfig,
} from "./wagmiConfig";
import { Provider } from "react-redux";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

export function ChakaraCusProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          appInfo={demoAppInfo}
          chains={chains}
          initialChain={defaultChainId}
        >
          <CacheProvider>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
          </CacheProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  );
}
