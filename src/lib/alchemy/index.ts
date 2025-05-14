import { config } from '@/config';
import { fetchTokensList } from '@/lib/blockchain/tokens';
import { Alchemy, Network } from 'alchemy-sdk';
import Decimal from 'decimal.js';

const settings = {
  apiKey: config.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export async function getNFTsByWalletAddress(walletAddress: string) {
  const nfts = await alchemy.nft.getNftsForOwner(walletAddress);
  const items = nfts.ownedNfts.slice(0, 10);
  return { items, total: nfts.totalCount };
}

export async function getTokensByWalletAddress(walletAddress: string) {
  const tokens = await alchemy.core.getTokenBalances(walletAddress);
  const tokenInfos = await fetchTokensList();
  const tokenBalances = tokens.tokenBalances.map((tokenBalance) => {
    const tokenInfo = tokenInfos.find(
      (t) =>
        t.address.toLowerCase() === tokenBalance.contractAddress.toLowerCase(),
    );
    return {
      ...tokenBalance,
      tokenBalance: new Decimal(parseInt(tokenBalance.tokenBalance ?? '0', 16))
        .div(new Decimal(10).pow(tokenInfo?.decimals ?? 0))
        .toString(),
    };
  });

  return tokenBalances;
}

export async function getBalanceByWalletAddress(walletAddress: string) {
  const rawBalance = await alchemy.core.getBalance(walletAddress);
  const balanceInWei = new Decimal(rawBalance.toString());
  const balanceInEth = balanceInWei.div(new Decimal(10).pow(18)).toString();
  return {
    balanceInEth,
    balanceInWei: balanceInWei.toString(),
  };
}
