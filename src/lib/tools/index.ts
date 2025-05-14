import {
  getBalanceByWalletAddressTool,
  getNFTsByWalletAddressTool,
  getTokensByWalletAddressTool,
} from '@/lib/tools/alchemy';
import {
  getSwappableTokensTool,
  getSwapQuoteTool,
  getSwapTxTool,
  transferEthTool,
} from '@/lib/tools/blockchain';
import {
  getCoinByContractAddressTool,
  getCoinListTool,
  getCoinPriceTool,
  getPopularCoinsTool,
  getTrendingTool,
} from './coingecko';
import {
  bridgeEvmTool,
  getChainListForBridgeTool,
  searchDebridgeTokenListTool,
} from '@/lib/tools/bridge';
import { deployERC20Token } from '@/lib/tools/deploy';

export const tools = {
  getCoinListTool,
  getCoinPriceTool,
  getPopularCoinsTool,
  getCoinByContractAddressTool,
  getTrendingTool,
  getNFTsByWalletAddressTool,
  getTokensByWalletAddressTool,
  getBalanceByWalletAddressTool,
  transferEthTool,
  getSwapQuoteTool,
  getSwapTxTool,
  getSwappableTokensTool,
  getChainListForBridgeTool,
  searchDebridgeTokenListTool,
  bridgeEvmTool,
  deployERC20Token,
};
