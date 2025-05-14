import { ethersProvider, logger } from '@/config';
import { abi, bytecode } from '@/lib/blockchain/erc20/deploy';
import { tool as createTool } from 'ai';
import Decimal from 'decimal.js';
import { ethers } from 'ethers';
import { z } from 'zod';

export const deployERC20Token = createTool({
  description: 'Deploy a new ERC20 token',
  parameters: z.object({
    name: z.string().describe('The name of the token'),
    symbol: z.string().describe('The symbol of the token'),
    decimals: z.number().describe('The number of decimals of the token'),
    totalSupply: z
      .string()
      .describe(
        'The total supply of the token without multiplying to its decimals',
      ),
    walletAddress: z
      .string()
      .describe('The address of the wallet to deploy the token'),
    privateKey: z
      .string()
      .describe('The private key of the wallet to deploy the token'),
  }),
  execute: async ({ name, symbol, decimals, totalSupply, privateKey }) => {
    try {
      const wallet = new ethers.Wallet(privateKey, ethersProvider);
      const contract = new ethers.ContractFactory(abi, bytecode, wallet);
      totalSupply = new Decimal(totalSupply).toString();
      const tx = await contract.deploy(name, symbol, decimals, totalSupply);
      const txHash = await tx.waitForDeployment();
      return txHash;
    } catch (error) {
      logger.error(error, 'failed to deploy erc20 token');
      return `Error deploying token: ${error}`;
    }
  },
});
