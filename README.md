# ⚙️ DeFai Agent — ChatGPT-Powered EVM Utility Suite for On-Chain Automation

**DeFai Agent** is an intelligent, developer-friendly framework built on the **EVM network**, designed to simplify on-chain development and interaction.
It enables you to **track token & NFT balances**, **filter trending assets**, **generate custom EVM smart contracts**, and **send or swap tokens**—all powered by **ChatGPT integration**.

---

## ✨ Key Features

### 📊 Token, Market, and NFT Data

* ✅ **Live Coin Prices** (by token address, symbol, or name)
* 🔥 **Trending Tokens & Categories** (ideal for DEX and analytics dashboards)
* 🖼️ **NFT Portfolio Viewer** (query NFTs by wallet address or collection)

### 💼 Wallet & Balance Tracking

* 🔑 **Track Native & ERC-20 Balances**
* 🎨 **Monitor NFT Holdings**
* 📦 **Multi-wallet support** for tracking large user sets or project metrics

### 🔁 On-Chain Interactions

* 💸 **Send ETH & ERC-20 Tokens**
* 🪙 **Deploy Custom ERC-20 Tokens Instantly**
* 🔁 **Swap Tokens (Coming Soon)** via integrated routers
* 🛠️ **Generate Smart Contracts** via natural language input (ChatGPT)

### 🤖 AI-Powered CLI

* 💬 **ChatGPT Integration**

  * Generate, modify, or explain Solidity code
  * Suggest deployment configurations
  * Create contracts from simple prompts

---

## 🧠 Use Cases

* 📈 **DeFi dashboard builders**: Display live asset data and wallet info
* 🔧 **Developers & Hackathon teams**: Quickly deploy EVM-based contracts
* 🛍️ **Web3 app integrators**: Provide token/NFT insights per user
* 📡 **Crypto analysts**: Track real-time balances and token trends
* 🤖 **Automation tools**: Execute actions with AI-powered command generation

---

## 🚀 Quick Start

### 🧰 Prerequisites

* [Node.js 18+](https://nodejs.org/)
* [pnpm](https://pnpm.io/installation) or npm
* EVM RPC endpoint (e.g., [Infura](https://infura.io/), [Alchemy](https://www.alchemy.com/))
* Optional: OpenAI API key for GPT-based contract generation

---

### ⚙️ Installation

```bash
git clone https://github.com/rustyneuron01/evm-defai-agent.git
cd evm-defai-agent
cp .env.example .env  # Add your API keys
pnpm install
pnpm start
```

---

## 🧪 Example CLI Usage

```bash
# Track token price
pnpm cli price --address 0x... --network mainnet

# Get wallet token & NFT balances
pnpm cli balances --address 0x...

# Deploy a custom ERC-20 token
pnpm cli deploy-token --name DeFaiToken --symbol DFAI --supply 1000000

# Generate a smart contract using ChatGPT
pnpm cli chatgpt --prompt "ERC20 token with mint, burn, and owner-only transfer"
```

---

## 🔐 Environment Configuration

```env
ETH_RPC_URL=https://mainnet.infura.io/v3/your-key
COIN_API_KEY=your-market-api-key
OPENAI_API_KEY=your-openai-api-key
```

---

## 📁 Project Structure

```
EVM-Defai-Agent/
├── src/
│   └── lib/
│       ├── ai/           # ChatGPT integration, prompt handling, and AI-assisted features
│       ├── alchemy/      # Ethereum RPC and data handling via Alchemy
│       ├── blockchain/   # Core blockchain logic: balance fetching, transactions, etc.
│       ├── coingecko/    # Market data integration (prices, trending tokens, categories)
│       ├── schemas/      # Data validation schemas and type-safe configurations
│       ├── tools/        # Utility functions and CLI command implementations
│       └── types/        # Shared TypeScript types and interfaces
├── .env.example          # Example environment variables
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

---

## 🧩 Roadmap

* 🔁 Token Swapping Support (Uniswap, 1inch)
* 📦 Contract Deployment UI
* 🔍 NFT Rarity & Floor Price Fetching
* ⛓️ L2 / Multichain Expansion (Arbitrum, Polygon)

---

## 📫 Contact

Created & maintained by [**RustyNeuron**](https://github.com/rustyneuron01)
🐦 Twitter: [@rustyneuron\_01](https://x.com/rustyneuron_01)
