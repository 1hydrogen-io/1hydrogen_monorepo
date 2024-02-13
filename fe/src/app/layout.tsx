import type { Metadata } from 'next'
import "@rainbow-me/rainbowkit/styles.css";
import './globals.css'
import { ChakaraCusProviders } from '@/providers/ChakaraCusProviders'
import { Flex } from '@chakra-ui/react'
import Header from '@/ui/layouts/Header'
import WalletListener from './WalletListener';
import LayoutBackground from '@/ui/layouts/LayoutBackground';
import Footer from '@/ui/layouts/Footer';
import DoNotAccessModal from '@/ui/components/DoNotAccessModal';

export const metadata: Metadata = {
  title: 'Hydrogen',
  description: 'Hydrogen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ChakaraCusProviders>
          <LayoutBackground>
              <Header />
              <Flex flexDirection="column" flex={1}>
                {children}
              </Flex>
              <Footer />
          </LayoutBackground>
          <WalletListener />
          <DoNotAccessModal />
        </ChakaraCusProviders>
      </body>
    </html>
  );
}
