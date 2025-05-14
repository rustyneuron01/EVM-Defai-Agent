import {
  getCoinByContractAddress,
  getCoinList,
  getCoinPrice,
  getPopularCoinIds,
  getTrending,
} from '@/lib/coingecko/coingecko.service';
import { tool as createTool } from 'ai';
import { z } from 'zod';

export const getCoinListTool = createTool({
  description: 'Get a list of coins from Coingecko',
  parameters: z.object({
    search: z.string().optional(),
  }),
  execute: async ({ search }: { search?: string }) => {
    try {
      const coinList = await getCoinList(search);
      return coinList;
    } catch (e) {
      return `Failed to get coin list: ${e}`;
    }
  },
});

export const getCoinPriceTool = createTool({
  description: 'Get the price of a coin from Coingecko',
  parameters: z.object({
    id: z.string(),
  }),
  execute: async ({ id }: { id: string }) => {
    try {
      const coinPrice = await getCoinPrice(id);
      return coinPrice;
    } catch (e) {
      return `Failed to get coin price: ${e}`;
    }
  },
});

export const getPopularCoinsTool = createTool({
  description: 'Get popular coins from Coingecko',
  parameters: z.object({}),
  // eslint-disable-next-line @typescript-eslint/require-await
  execute: async () => {
    try {
      const coinIds = getPopularCoinIds();
      return coinIds;
    } catch (e) {
      return `Failed to get popular coins: ${e}`;
    }
  },
});

export const getCoinByContractAddressTool = createTool({
  description: 'Get a coin by its contract address',
  parameters: z.object({
    contractAddress: z.string(),
  }),
  execute: async ({ contractAddress }: { contractAddress: string }) => {
    try {
      const coin = await getCoinByContractAddress(contractAddress);
      return coin;
    } catch (e) {
      return `Failed to get coin by contract address: ${e}`;
    }
  },
});

export const getTrendingTool = createTool({
  description: 'Get trending coins from Coingecko',
  parameters: z.object({}),
  execute: async () => {
    try {
      const trending = await getTrending();
      return trending;
    } catch (e) {
      return `Failed to get trending coins: ${e}`;
    }
  },
});
