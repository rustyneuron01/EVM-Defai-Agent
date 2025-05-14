import { config } from '@/config';
import { ethers } from 'ethers';

export async function transferEth({
  toWalletAddress,
  amountInEth,
  privateKey,
}: {
  toWalletAddress: string;
  amountInEth: string;
  privateKey: string;
}) {
  const ethersProvider = new ethers.JsonRpcProvider(config.RPC_URL);

  const wallet = new ethers.Wallet(privateKey, ethersProvider);
  const tx = await wallet.sendTransaction({
    to: toWalletAddress,
    from: wallet.address,
    value: ethers.parseEther(amountInEth),
    data: '0x',
  });
  return { txHash: tx.hash };
}
