
const { BigNumber } = require('ethers')

 const getMinTick = (tickSpacing) => Math.ceil(-887272 / tickSpacing) * tickSpacing
const getMaxTick = (tickSpacing) => Math.floor(887272 / tickSpacing) * tickSpacing
 const getMaxLiquidityPerTick = (tickSpacing) =>
  BigNumber.from(2)
    .pow(128)
    .sub(1)
    .div((getMaxTick(tickSpacing) - getMinTick(tickSpacing)) / tickSpacing + 1)

    module.exports={
        getMinTick,
        getMaxTick,
        getMaxLiquidityPerTick
    }