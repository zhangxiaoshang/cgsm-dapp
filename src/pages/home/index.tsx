import { useState, useEffect } from 'react';
import { useLocation } from 'umi';
import { useWallet } from 'use-wallet';
import { Radio, Select, Form, Button, Input, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ArtImage from '@/components/ArtImage';

import { month_to_gz, day_to_gz, hour_to_gz, METADATA_BASEURL, contractConfig, chainConfig } from '../../vars';
import Web3 from 'web3';
import styles from './index.less';
import useContract from '@/hooks/useContract';

const { Option } = Select;

const year_options: any = [];
for (let i = 1924; i <= 2030; i++) {
  year_options.push(
    <Option key={i} value={i}>
      {i}
    </Option>,
  );
}

export default function IndexPage() {
  const { query }: any = useLocation();
  const wallet = useWallet();
  const contract = useContract(wallet.chainId);

  const [baseURI, setBaseURI] = useState(METADATA_BASEURL);
  const [tokenPath, setTokenPath] = useState('');

  const [loading, setLoading] = useState(false);

  const [currentTokenId, setCurrentTokenId] = useState<number>();
  const [lastTx, setLastTx] = useState('');
  const [total, setTotal] = useState<number>(); // NFT 总数

  const [form] = Form.useForm();

  const chainId = wallet.chainId || 97;
  const contractCfg = contractConfig[chainId];
  const chainCfg = chainConfig[chainId];

  let contract_addr = '';
  let link_contract = '';
  let link_tx = '';
  if (contractCfg) {
    contract_addr = contractCfg.address;
  }

  if (chainCfg) {
    link_contract = `${chainCfg.address_link_prefix}${contract_addr}`;
    link_tx = `${chainCfg.tx_link_prefix}${lastTx}`;
  }

  useEffect(() => {
    initBaseURI();
  }, [wallet]);

  useEffect(() => {
    setup(wallet.account);
  }, [wallet.account, contract]);

  useEffect(() => {
    form.setFieldsValue({ from: query.from });
  }, [query.from]);

  const setup = async (account: string | null) => {
    if (!account || !contract) return;

    try {
      const balance = await contract.methods.balanceOf(account).call();
      if (balance > 0) {
        const tokenId = await contract.methods.tokenOfOwnerByIndex(wallet.account, balance - 1).call();
        const tokenPath = await contract.methods.tokenURI(tokenId).call();

        setTotal(balance);
        setCurrentTokenId(tokenId);
        setTokenPath(tokenPath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = async (e: any) => {
    const { gender, year, month, day, hour, from } = e;

    setLoading(true);
    try {
      let res;
      if (from) {
        console.log('fuck');

        res = await contract.methods
          .mint(gender === 2, year, month, day, hour, wallet.account, query.from)
          .send({ from: wallet.account, value: Web3.utils.toWei('0.01') });
      } else {
        res = await contract.methods
          .mint(gender === 2, year, month, day, hour, wallet.account)
          .send({ from: wallet.account, value: Web3.utils.toWei('0.01') });
      }

      setup(wallet.account);
      setLastTx(res.transactionHash);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const initBaseURI = async () => {
    try {
      if (!contract) return;
      const uri = await contract.methods.baseURI().call();
      if (uri) {
        setBaseURI(uri);
      }
    } catch (error) {}
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>称骨算命</div>

      <div className={styles.wrapContractInfo}>
        <span>Current Network: {wallet?.networkName}</span>
        <span>
          Contract:{' '}
          <a href={link_contract} target="_blank">
            {contract_addr}
          </a>
        </span>

        <span>
          Last Tx:{' '}
          <a href={link_tx} target="_blank">
            {lastTx}
          </a>
        </span>

        <span>Last Token ID: {currentTokenId}</span>

        <span>NFT Total: {total}</span>
      </div>

      <ArtImage metaURI={tokenPath ? `${baseURI}${tokenPath}` : ''}></ArtImage>

      <div className={styles.content}>
        <Form
          form={form}
          size="large"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          initialValues={{ gender: 1, from: query.from }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="性别" name="gender">
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="出生年份" name="year">
            <Select>{year_options}</Select>
          </Form.Item>
          <Form.Item label="出生月份" name="month">
            <Select>
              {month_to_gz.map((gz, index) => (
                <Option key={index} value={index}>
                  {index + 1}月
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="出生日期" name="day">
            <Select>
              {day_to_gz.map((gz, index) => (
                <Option key={index} value={index}>
                  {index + 1}日
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="出生时辰" name="hour">
            <Select>
              {hour_to_gz.map((item, index) => (
                <Option key={index} value={index}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="邀请ID" name="from">
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" size="large" shape="round" block loading={loading}>
            卜一卦
          </Button>

          {!!currentTokenId && (
            <CopyToClipboard
              text={`https://zhangxiaoshang.github.io/cgsm-dapp/#/home?from=${currentTokenId}`}
              onCopy={() => message.success('Copied')}
            >
              <Button type="default" size="large" shape="round" block style={{ marginTop: '12px' }}>
                我的邀请链接
              </Button>
            </CopyToClipboard>
          )}
        </Form>
      </div>
    </div>
  );
}
