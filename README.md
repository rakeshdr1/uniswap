# UniswapV3 Hardhat Project

## Uniswap Contracts Flow

![This is an image](/assets/images/uniswap.png)

Uniswap consists of **Core** and **Periphery contracts**

**Core Contracts** :

```
Core contracts guarantees fundamental safety to all interacting parties in Uniswap.

The Core consists of Single Factory, Pool deployer and Pools created for token pairs.

```

- Factory Contract : Factory defines the logic for generating pools

```
    createPool(tokenA,tokenB,txFee)
```

**Periphery Contracts** :

```
Periphery functions includes Position management and Swap router management.
Includes  Nonfungible PositionManager and SwapRouter

```

- Nonfungible PositionManager : In charge of creation of transaction pool and addition/removal of liquidity.

1. addLiquidity : implements the liquidity addition.
2. \_updatePosition : updates the corresponding boundary Tick info for Position.
3. \_modifyPosition : implements the adjustment to both positive and negative liquidity.

```
nfgPositionManger.mint({
                token0: DAI,
                token1: USDC,
                fee: poolFee,
                tickLower: TickMath.MIN_TICK,
                tickUpper: TickMath.MAX_TICK,
                amount0Desired: amount0ToMint,
                amount1Desired: amount1ToMint,
                amount0Min: 0,
                amount1Min: 0,
                recipient: address(this),
                deadline: block.timestamp
            });

```

- Swap Router : Swap router supports swapping of tokens from pool .

1.  exactInputSingle/exactInput
2.  exactOutputSingle/exactOutput

exactInput differentiates from exactOutput through the positivity/negativity of the input value.

```
function swap(
    address recipient,
    bool zeroForOne,
    int256 amountSpecified,
    uint160 sqrtPriceLimitX96,
    bytes calldata data
) external override noDelegateCall returns (int256 amount0, int256 amount1) {
```

# Deployed Contracts to Rinkeby testnet :-

```shell

UniswapV3Factory - https://rinkeby.etherscan.io/address/0xB9bbeCB84222b0411e49408282BAB329d91E8D67

NFTPositionManager - https://rinkeby.etherscan.io/address/0xf77f5edA1bbdEf2fc60c4C3929762A558402F361

SwapRouter - https://rinkeby.etherscan.io/address/0x541B37C5E79EB5A73498d43d3BE34542A81B8e30

TokenA - https://rinkeby.etherscan.io/address/0xa32B87B419d330258852c08ca1c0408d781BabF3

TokenB - https://rinkeby.etherscan.io/address/0x78e3f26C49E409Ae4F15d50A1495DFe8F1071398

WrappedEther - https://rinkeby.etherscan.io/address/0x35B3e2aF1dAc1C991524A903c792d584beaDC553
```

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
