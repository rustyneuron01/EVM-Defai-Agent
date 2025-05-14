import { ETHToken } from '@/lib/blockchain/tokens';
import axios from 'axios';
import { Decimal } from 'decimal.js';
import { Address } from 'viem';

export type DeBridgeResponse = {
  estimation: {
    srcChainTokenIn: {
      address: string;
      chainId: number;
      decimals: number;
      name: string;
      symbol: string;
      amount: string;
      approximateOperatingExpense: string;
      mutatedWithOperatingExpense: boolean;
      approximateUsdValue: number;
      originApproximateUsdValue: number;
    };
    srcChainTokenOut: {
      address: string;
      chainId: number;
      decimals: number;
      name: string;
      symbol: string;
      amount: string;
      maxRefundAmount: string;
      approximateUsdValue: number;
    };
    dstChainTokenOut: {
      name: string;
      symbol: string;
      chainId: number;
      address: string;
      decimals: number;
      amount: string;
      recommendedAmount: string;
      maxTheoreticalAmount: string;
      approximateUsdValue: number;
      recommendedApproximateUsdValue: number;
      maxTheoreticalApproximateUsdValue: number;
    };
    costsDetails: Array<{
      chain: string;
      tokenIn: string;
      tokenOut: string;
      amountIn: string;
      amountOut: string;
      type: string;
      payload?: {
        feeAmount?: string;
        feeBps?: string;
        estimatedVolatilityBps?: string;
        amountOutBeforeCorrection?: string;
        feeApproximateUsdValue?: string;
      };
    }>;
    recommendedSlippage: number;
  };
  tx: {
    value: string;
    data: string;
    to: string;
  };
  prependedOperatingExpenseCost: string;
  order: {
    approximateFulfillmentDelay: number;
    salt: number;
    metadata: string;
  };
  orderId: string;
  fixFee: string;
  userPoints: number;
  integratorPoints: number;
};

type Token = {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
  logoURI: string;
  tags: { Name: string }[] | [];
  eip2612: boolean;
  domainVersion?: string;
};

export type TokenList = {
  tokens: Record<string, Token>;
};

export function getDebridgeChainList() {
  return [
    { name: 'Arbitrum', chainId: 42161 },
    { name: 'Avalanche', chainId: 43114 },
    { name: 'BNB Chain', chainId: 56 },
    { name: 'Ethereum', chainId: 1 },
    { name: 'Polygon', chainId: 137 },
    { name: 'Fantom', chainId: 250 },
    { name: 'Solana', chainId: 7565164 },
    { name: 'Linea', chainId: 59144 },
    { name: 'Optimism', chainId: 10 },
    { name: 'Base', chainId: 8453 },
    { name: 'Neon', chainId: 245022934 },
    { name: 'Gnosis', chainId: 100 },
    { name: 'Lightlink (suspended)', chainId: 1890 },
    { name: 'Metis', chainId: 1088 },
    { name: 'Bitrock', chainId: 7171 },
    { name: 'Sonic', chainId: 146 },
    { name: 'CrossFi', chainId: 4158 },
    { name: 'Cronos zkEVM', chainId: 388 },
    { name: 'Abstract', chainId: 2741 },
    { name: 'Berachain', chainId: 80094 },
    { name: 'Story', chainId: 1514 },
  ];
}

export async function bridgeEvm({
  userAddress,
  srcChainTokenIn,
  srcChainTokenInAmount,
  dstChainId,
  dstChainTokenOut,
  receiverAddress,
}: {
  userAddress: Address;
  receiverAddress: Address;
  srcChainTokenIn: string;
  srcChainTokenInAmount: string;
  dstChainId: string;
  dstChainTokenOut: string;
}) {
  const res = await axios.get(
    `https://deswap.debridge.finance/v1.0/dln/order/create-tx`,
    {
      params: {
        srcChainId: ETHToken.chainId,
        srcChainTokenIn: srcChainTokenIn,
        srcChainTokenInAmount: srcChainTokenInAmount,
        dstChainTokenOutAmount: 'auto',
        dstChainId: dstChainId,
        dstChainTokenOut: dstChainTokenOut,
        prependOperatingExpenses: true,
        additionalTakerRewardBps: 0,
        dstChainTokenOutRecipient: receiverAddress,
        senderAddress: userAddress,
        srcChainRefundAddress: userAddress,
        enableEstimate: false,
        deBridgeApp: 'DESWAP',
        srcChainOrderAuthorityAddress: userAddress,
        dstChainOrderAuthorityAddress: receiverAddress,
      },
    },
  );

  const bridgeData = res.data as DeBridgeResponse;
  const to = bridgeData.tx.to;
  const data = bridgeData.tx.data;
  const value = bridgeData.tx.value
    ? (new Decimal(bridgeData.tx.value).toHex() as `0x${string}`)
    : undefined;
  return { to, data, value, orderId: bridgeData.orderId };
}

const getTokenAddress = (
  tokenList: TokenList,
  identifier: string,
): Address | null => {
  const lowerIdentifier = identifier.toLowerCase();

  for (const address in tokenList.tokens) {
    const token = tokenList.tokens[address];
    if (
      token.name.toLowerCase() === lowerIdentifier ||
      token.symbol.toLowerCase() === lowerIdentifier ||
      token.name.toLowerCase().includes(lowerIdentifier) ||
      token.symbol.toLowerCase().includes(lowerIdentifier)
    ) {
      return token.address as Address;
    }
  }

  return null;
};

export async function searchDebridgeTokenList(
  chainId: number,
  identifier: string,
) {
  const res = await axios.get(`https://dln.debridge.finance/v1.0/token-list`, {
    params: {
      chainId: chainId,
    },
  });
  const tokenAddress = getTokenAddress(res.data as TokenList, identifier);
  return tokenAddress;
}
