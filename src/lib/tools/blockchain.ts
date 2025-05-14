import { config, ethersProvider } from '@/config';
import { getTokensByWalletAddress } from '@/lib/alchemy';
import { transferEth } from '@/lib/blockchain';
import {
  Address,
  getSwappableTokens,
  getSwapTxWithWowmax,
  getWowmaxQuote,
} from '@/lib/blockchain/swap';
import { fetchTokensList } from '@/lib/blockchain/tokens';
import { tool as createTool } from 'ai';
import Decimal from 'decimal.js';
import { ethers } from 'ethers';
import { createPublicClient, encodeFunctionData, http } from 'viem';
import { mainnet } from 'viem/chains';
import { z } from 'zod';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(config.RPC_URL),
});

export const transferEthTool = createTool({
  description: 'Transfer ETH to a wallet address',
  parameters: z.object({
    toWalletAddress: z.string(),
    amountInEth: z.number().describe('Amount in ETH eg: 0.01 or 5'),
    privateKey: z.string(),
  }),
  execute: async ({ toWalletAddress, amountInEth, privateKey }) => {
    try {
    } catch (e) {
      return `Failed to transfer ETH: ${e}`;
    }
  },
});

export const getSwappableTokensTool = createTool({
  description: 'Get swappable tokens',
  parameters: z.object({}),
  execute: async () => {
    try {
    } catch (e) {
      return `Failed to get swappable tokens: ${e}`;
    }
  },
});

export const getSwapQuoteTool = createTool({
  description: 'Get swap quote',
  parameters: z.object({
    amountIn: z
      .string()
      .describe(
        'Amount of tokenIn to swap. for example for 0.1 eth use 0.1 or 25 usdc = 25',
      ),
    tokenInAddress: z
      .string()
      .describe(
        'From token address, use getSwappableTokens to get the list of swappable tokens',
      ),
    tokenOutAddress: z
      .string()
      .describe(
        'To token address, use getSwappableTokens to get the list of swappable tokens',
      ),
  }),
  execute: async ({ amountIn, tokenInAddress, tokenOutAddress }) => {
    try {
      return new Decimal(quote.amountOut).div(10 ** quote.to.decimals);
    } catch (e) {
      return `Failed to get swap quote: ${e}`;
    }
  },
});

export const getSwapTxTool = createTool({
  parameters: z.object({
    amountIn: z
      .string()
      .describe(
        'Amount of tokenIn to swap. for example for 0.1 eth use 0.1 or 25 usdc = 25',
      ),
    tokenIn: z
      .string()
      .describe(
        'From token address, if eth use 0x0000000000000000000000000000000000000000, other wise their token address',
      ),
    tokenOut: z
      .string()
      .describe(
        'To token address, if eth use 0x0000000000000000000000000000000000000000, other wise their token address',
      ),
    walletAddress: z.string().describe('Wallet address of the user'),
    privateKey: z.string().describe('Private key of the wallet'),
  }),
  execute: async ({
    amountIn,
    tokenIn,
    tokenOut,
    walletAddress,
    privateKey,
  }) => {
    try {
      const tokens = await fetchTokensList();
      const inTokenInfo = tokens.find(
        (t) => t.address.toLowerCase() === tokenIn.toLowerCase(),
      );
      return {
        swapTxHash: swapTx.hash,
        swapTxUrl: `https://etherscan.io/tx/${swapTx.hash}`,
      };
    } catch (e) {
      return `Failed to get swap tx: ${e}`;
    }
  },
});
