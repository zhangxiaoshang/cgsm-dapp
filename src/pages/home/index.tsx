import { useState, useEffect } from 'react';
import { useLocation } from 'umi';
import { useWallet } from 'use-wallet';
import { Radio, Select, Form, Button, Input, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import contract from '@/contracts/NFT';
import {
  contract_address,
  contract_address_bsctest,
  month_to_gz,
  day_to_gz,
  hour_to_gz,
  METADATA_BASEURL,
} from '../../vars';
import Web3 from 'web3';
import styles from './index.less';

const { Option } = Select;

const year_options: any = [];
for (let i = 1924; i <= 2030; i++) {
  year_options.push(
    <Option key={i} value={i}>
      {i}
    </Option>,
  );
}

const ArtImage: React.FC<{ uri: string }> = ({ uri }) => {
  if (!uri) return null;

  const [url, setUrl] = useState('');

  fetch(uri)
    .then((response) => response.json())
    .then((data) => {
      setUrl(data.image);
    })
    .catch((err) => {
      // console.log(err);
    });

  return url ? <img src={url} className={styles.ArtImage}></img> : null;
};

export default function IndexPage() {
  const { query }: any = useLocation();
  const [baseURI, setBaseURI] = useState(METADATA_BASEURL);
  const [tokenPath, setTokenPath] = useState('');

  console.log(query.from);

  const wallet = useWallet();
  const [metadataURI, setMetadataURI] = useState('');
  const [loading, setLoading] = useState(false);

  const [tokenId, setTokenId] = useState<number>();
  const [tx, setTx] = useState('');

  const [form] = Form.useForm();

  let contract_addr = contract_address;
  let link_contract = `https://ropsten.etherscan.io/address/${contract_addr}`;
  let link_tx = `https://ropsten.etherscan.io/tx/${tx}`;
  if (wallet?.chainId === 97) {
    contract_addr = contract_address_bsctest;
    link_contract = `https://testnet.bscscan.com/address/${contract_addr}`;
    link_tx = `https://testnet.bscscan.com/tx/${tx}`;
  }

  useEffect(() => {
    console.log('wallet.account: ', wallet.account);
    setup(wallet.account);
  }, [wallet.account]);

  useEffect(() => {
    form.setFieldsValue({ from: query.from });
  }, [query.from]);

  const setup = async (account: string | null) => {
    if (!account) return;

    try {
      const balance = await contract.methods.balanceOf(account).call();
      if (balance > 0) {
        const tokenId = await contract.methods.tokenOfOwnerByIndex(wallet.account, balance - 1).call();
        const tokenPath = await contract.methods.tokenURI(tokenId).call();

        setTokenId(tokenId);
        setTokenPath(tokenPath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = async (e: any) => {
    const { gender, year, month, day, hour, from } = e;

    console.log({ gender, year, month, day, hour, from });

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

      console.log('res: ', res);
      const id = parseInt(res.events.Transfer.returnValues._tokenId);

      console.log('id: ', id);
      setTokenId(id);
      const tokenURI = await contract.methods.tokenURI(id).call();
      const baseURI = await contract.methods.baseURI().call();
      const fullURI = `${baseURI}${tokenURI}`;

      setTx(res.transactionHash);
      setMetadataURI(fullURI);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const copyLink = () => {};

  return (
    <div className={styles.main}>
      <div className={styles.title}>称骨算命</div>

      <div className={styles.wrapContractInfo}>
        <span>Network: {wallet?.networkName}</span>
        <span>
          Contract:{' '}
          <a href={link_contract} target="_blank">
            {contract_addr}
          </a>
        </span>

        <span>
          Tx:{' '}
          <a href={link_tx} target="_blank">
            {tx}
          </a>
        </span>

        <span>NFT id: {tokenId}</span>
      </div>

      <ArtImage uri={tokenPath ? `${baseURI}${tokenPath}` : ''}></ArtImage>

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
            测算
          </Button>

          {!!tokenId && (
            <CopyToClipboard
              text={`https://zhangxiaoshang.github.io/cgsm-dapp/#/home?from=${tokenId}`}
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
