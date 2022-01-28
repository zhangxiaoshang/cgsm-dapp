import React from 'react';
import { Layout, Button } from 'antd';
import { ConnectionRejectedError, UseWalletProvider, useWallet } from 'use-wallet';
import styles from './index.less';

const { Header, Content } = Layout;

const AppHeader: React.FC = () => {
  const wallet = useWallet();
  const activate = (connector: string) => wallet.connect(connector);

  if (wallet.error?.name) {
    return (
      <Header style={{ background: '#fff' }}>
        <span>
          {wallet.error instanceof ConnectionRejectedError
            ? 'Connection error: the user rejected the activation'
            : wallet.error.name}
        </span>
        <Button onClick={() => wallet.reset()} shape="round" size="large">
          retry
        </Button>
      </Header>
    );
  }

  if (wallet.status === 'connecting') {
    return (
      <Header style={{ background: '#fff' }}>
        <span>Connecting to {wallet.connector}…</span>
        <Button onClick={() => wallet.reset()} shape="round" size="large">
          cancel
        </Button>
      </Header>
    );
  }

  if (wallet.status === 'connected') {
    return (
      <Header style={{ background: '#fff' }}>
        <span>
          {wallet.account?.slice(0, 5)}...{wallet.account?.slice(-5)}
        </span>
        <Button onClick={() => wallet.reset()} shape="round" size="large">
          disconnect
        </Button>
      </Header>
    );
  }

  return (
    <Header style={{ background: '#fff' }}>
      <Button onClick={() => activate('injected')} shape="round" size="large">
        Connect wallet
      </Button>
    </Header>
  );
};

const BasicLayout: React.FC = ({ children }) => (
  <UseWalletProvider
    autoConnect
    connectors={{
      injected: {
        //allows you to connect and switch between mainnet and rinkeby within Metamask.
        chainId: [1, 3, 4, 97],
      },
      fortmatic: {
        chainId: [1],
        apiKey: '',
      },
      portis: {
        dAppId: '',
        chainId: [1],
      },
      walletconnect: {
        rpc: {
          1: 'https://mainnet.infura.io/v3/a0d8c94ba9a946daa5ee149e52fa5ff1',
          3: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
          4: 'https://rinkeby.infura.io/v3/a0d8c94ba9a946daa5ee149e52fa5ff1',
          97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
        },
        bridge: 'https://bridge.walletconnect.org',
        pollingInterval: 12000,
      },
      walletlink: {
        chainId: [1],
        url: 'https://mainnet.eth.aragon.network/',
      },
    }}
  >
    <Layout className={styles.layout}>
      <AppHeader></AppHeader>

      <Content className={styles.content}>{children}</Content>
    </Layout>
  </UseWalletProvider>
);

export default BasicLayout;
