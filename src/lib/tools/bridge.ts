import { ethersProvider, logger } from '@/config';
import {
  bridgeEvm,
  getDebridgeChainList,
  searchDebridgeTokenList,
} from '@/lib/blockchain/bridge';
import { tool as createTool } from 'ai';
import { ethers } from 'ethers';
import { Address } from 'viem';
import { z } from 'zod';

export const getChainListForBridgeTool = createTool({
  description: 'Get a list of chains for bridge',
  parameters: z.object({}),
  // eslint-disable-next-line @typescript-eslint/require-await
  execute: async () => {
    try {
      return getDebridgeChainList();
    } catch (e) {
      return `Failed to get chain list for bridge: ${e}`;
    }
  },
});

export const searchDebridgeTokenListTool = createTool({
  description: 'Search for a token on Debridge',
  parameters: z.object({
    identifier: z
      .string()
      .describe(
        'Identifier of the token to search for. It can be the name or symbol of the token',
      ),
    chainId: z
      .string()
      .describe(
        'Id of the chain to get the token list for. use getChainListForBridgeTool to get the id',
      ),
  }),
  execute: async ({
    identifier,
    chainId,
  }: {
    identifier: string;
    chainId: string;
  }) => {
    try {
      const tokenList = await searchDebridgeTokenList(
        Number(chainId),
        identifier,
      );
      return tokenList;
    } catch (e) {
      logger.error(e, 'failed to search for a token on Debridge');
      return `Failed to search for a token on Debridge: ${e}`;
    }
  },
});

export const bridgeEvmTool = createTool({
  description: 'Bridge ETH or tokens from ethereum chain to another.',
  parameters: z.object({
    receiverAddress: z
      .string()
      .describe(
        'Address of the bridge receiver. Specifically ask this address if not provided',
      ),
    walletInfo: z.object({
      address: z.string().describe('Address of the wallet'),
      privateKey: z.string().describe('Private key of the wallet'),
    }),
  }),
  execute: async ({
    walletInfo,
    srcChainTokenInAddress,
    srcChainTokenInAmount,
    receiverAddress,
    dstChainId,
    dstChainTokenOutAddress,
  }) => {
    try {
      const tx = await wallet.sendTransaction({
        to: bridgeData.to,
        data: bridgeData.data,
        from: wallet.address,
        value: bridgeData.value,
      });

      return { txHash: tx.hash, orderId: bridgeData.orderId };
    } catch (e) {
      logger.error(e, 'failed to bridge evm');
      return `Error bridging token: ${e}`;
    }
  },
});
