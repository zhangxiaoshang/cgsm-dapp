import NFTABI from '@/contracts/abis/NFT.json';

export const contract_address = '0x791e1Eb63797e82244167872791b2C62eE26C5Ca';
// export const contract_address_bsctest = '0xA497Bd5546c4014C06127224c2B75f7eB4E33FFE';
export const contract_address_bsctest = '0x1F4f0E4Ca2a0f62CF0e4A1A08B10a4062E1086E7';

export const contract_address_ropsten = '0x801b7475Afb09d8D36DAd066358aB1A095f3FA76';

export const IMAGE_BASEURL = 'https://gateway.pinata.cloud/ipfs/QmcY4Uz1ozJsFf6bFQyNDTGLdBB5LhCX4yDMpkoe2nZGuJ/';
export const METADATA_BASEURL = 'https://gateway.pinata.cloud/ipfs/QmNx5X1r5DBFG2e16NmPZGghUAMMwVxPWjEhUrX9tkjgWC/';

export const year_to_gz: any = {
  '1924': 12,
  '1936': 16,
  '1948': 15,
  '1960': 7,
  '1972': 5,

  '1925': 9,
  '1937': 8,
  '1949': 7,
  '1961': 7,
  '1973': 7,

  '1926': 6,
  '1938': 8,
  '1950': 9,
  '1962': 9,
  '1974': 12,

  '1927': 7,
  '1939': 19,
  '1951': 12,
  '1963': 12,
  '1975': 8,

  '1928': 12,
  '1940': 12,
  '1952': 10,
  '1964': 8,
  '1976': 8,

  '1929': 6,
  '1941': 6,
  '1953': 7,
  '1965': 7,
  '1977': 6,

  '1930': 9,
  '1942': 8,
  '1954': 15,
  '1966': 13,
  '1978': 19,

  '1931': 8,
  '1943': 7,
  '1955': 6,
  '1967': 5,
  '1979': 6,

  '1932': 7,
  '1944': 5,
  '1956': 5,
  '1968': 14,
  '1980': 8,

  '1933': 8,
  '1945': 15,
  '1957': 14,
  '1969': 5,
  '1981': 16,

  '1934': 15,
  '1946': 6,
  '1958': 14,
  '1970': 9,
  '1982': 10,

  '1935': 9,
  '1947': 16,
  '1959': 9,
  '1971': 17,
  '1983': 6,
};

export const month_to_gz = [6, 7, 18, 9, 5, 16, 9, 15, 18, 8, 9, 5];

export const day_to_gz = [
  5, 10, 8, 15, 16, 15, 8, 16, 8, 16, 9, 17, 8, 17, 10, 8, 9, 18, 5, 10, 10, 9, 8, 9, 15, 18, 7, 8, 16, 6,
];

export const hour_to_gz = [
  {
    key: '子时:23:00 - 00:59',
    label: '子时:23:00 - 00:59',
    value: 16,
  },
  {
    key: '丑时:01:00 - 02:59',
    label: '丑时:01:00 - 02:59',
    value: 6,
  },
  {
    key: '寅时:03:00 - 04:59',
    label: '寅时:03:00 - 04:59',
    value: 7,
  },
  {
    key: '卯时:05:00 - 06:59',
    label: '卯时:05:00 - 06:59',
    value: 10,
  },
  {
    key: '辰时:07:00 - 08:59',
    label: '辰时:07:00 - 08:59',
    value: 9,
  },
  {
    key: '已时:09:00 - 10:59',
    label: '已时:09:00 - 10:59',
    value: 16,
  },
  {
    key: '午时:11:00 - 12:59',
    label: '午时:11:00 - 12:59',
    value: 10,
  },
  {
    key: '未时:13:00 - 14:59',
    label: '未时:13:00 - 14:59',
    value: 8,
  },
  {
    key: '申时:15:00 - 16:59',
    label: '申时:15:00 - 16:59',
    value: 8,
  },
  {
    key: '酉时:17:00 - 18:59',
    label: '酉时:17:00 - 18:59',
    value: 9,
  },
  {
    key: '戌时:19:00 - 20:59',
    label: '戌时:19:00 - 20:59',
    value: 6,
  },
  {
    key: '亥时:21:00 - 22:59',
    label: '亥时:21:00 - 22:59',
    value: 6,
  },
];

export const contractConfig: any = {
  3: {
    abi: NFTABI,
    address: contract_address_ropsten,
  },
  97: {
    abi: NFTABI,
    address: contract_address_bsctest,
  },
};

export const chainConfig: any = {
  3: {
    address_link_prefix: 'https://ropsten.etherscan.io/address/',
    tx_link_prefix: 'https://ropsten.etherscan.io/tx/',
  },
  97: {
    address_link_prefix: 'https://testnet.bscscan.com/address/',
    tx_link_prefix: 'https://testnet.bscscan.com/tx/',
  },
};
