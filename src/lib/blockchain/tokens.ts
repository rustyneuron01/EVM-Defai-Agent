import { BAD_ETH_ADDRESS } from '@/lib/constants';
import { TokenInfo } from '@/lib/types/tokens';

export const ETHToken = {
  address: '0x0000000000000000000000000000000000000000',
  chainId: 1,
  name: 'Ethereum',
  symbol: 'ETH',
  decimals: 18,
};

export async function fetchTokensList() {
  const tokens = (await fetch(`https://tokens.uniswap.org`).then((res) =>
    res.json(),
  )) as {
    tokens: Array<TokenInfo>;
  };

  const finalTokens = tokens.tokens;
  finalTokens.push(ETHToken);

  return finalTokens.filter((t) => t.address !== BAD_ETH_ADDRESS);
}
