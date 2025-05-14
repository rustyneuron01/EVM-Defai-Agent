import { BAD_ETH_ADDRESS } from '@/lib/constants';
import axios from 'axios';
import { Decimal } from 'decimal.js';

export type Address = `0x${string}`;

export type WowmaxQuote = {
  requestId: string;
  amountIn: string;
  amountOut: string;
  from: {
    address: string;
    decimals: number;
    name: string;
    priceUSD: string;
  };
  to: {
    address: string;
    decimals: number;
    name: string;
    priceUSD: string;
  };
  price: number;
  priceImpact: number;
  routes: Array<{
    parts: number;
    from: string;
    swaps: Array<{
      to: string;
      part: number;
      market: {
        id: string;
        name: string;
      };
    }>;
  }>;
  gasUnitsConsumed: number;
  gasPrice: string;
  gasPriceUSD: string;
  gasCostUSD: number;
  l1Fee: string;
  l1FeeUSD: number;
};

export async function getWowmaxQuote({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: number;
}) {
  const response = await fetch(
    `https://api-gateway.wowmax.exchange/chains/1/quote?amount=${amount}&from=${from}&to=${to}&usePMM=true`,
  );
  const quoteData = (await response.json()) as WowmaxQuote;
  return quoteData;
}

export type WowmaxSwapResponse = {
  requestId: string;
  amountIn: string;
  amountOut: Array<string>;
  from: string;
  to: Array<string>;
  price: any;
  priceImpact: number;
  data: string;
  gasUnitsConsumed: number;
  gasPrice: string;
  contract: string;
  value: string;
  l1Fee: string;
};

export async function getSwappableTokens() {
  const res = await axios.get<
    Array<{ address: string; symbol: string; name: string; decimals: number }>
  >(`https://api-gateway.wowmax.exchange/chains/1/tokens`);
  const tokens = res.data;
  return tokens.map((token) => ({
    address:
      token.address == BAD_ETH_ADDRESS
        ? '0x0000000000000000000000000000000000000000'
        : token.address,
    symbol: token.symbol,
    name: token.name,
    decimals: token.decimals,
  }));
}

export async function getSwapTxWithWowmax({
  from,
  to,
  amount,
  slippage = 1,
  trader,
}: {
  from: Address;
  to: Address;
  amount: string;
  trader: Address;
  slippage?: number;
}) {
  const response = await fetch(
    `https://api-gateway.wowmax.exchange/chains/1/swap?from=${from}&to=${to}&amount=${amount}&slippage=${slippage}&usePMM=false&trader=${trader}`,
  );
  try {
    const swapData = (await response.json()) as WowmaxSwapResponse;
    const value = swapData.value
      ? (new Decimal(swapData.value).toHex() as `0x${string}`)
      : undefined;
    return {
      value: value,
      data: swapData.data,
      to: swapData.to[0],
      contract: swapData.contract,
      from: swapData.from,
      amountOut: swapData.amountOut[0],
    };
  } catch (e) {
    console.log('error is ', e);
    throw new Error('Failed to get swap tx');
  }
}
