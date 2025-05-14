import { networks } from './network';

export const getNetworkByChainId = (chainId: number) => {
  return networks.find((network) => network.chain_identifier === chainId);
};

export const getNetworkByCoinId = (coinId: string) => {
  return networks.find((network) => network.native_coin_id === coinId);
};
