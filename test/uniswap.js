const { expect } = require("chai");

describe('Uniswap',()=>{
    let admin,user1,user2;
    let factory,router;
    let wrappedEther,tokenA,tokenB;

    beforeEach(async()=>{
        [admin,user1,user2]=await ethers.getSigners()

        const WrappedEther=await ethers.getContractFactory('WETH')
        wrappedEther=await WrappedEther.deploy()
        await wrappedEther.deployed()

        const TokenA=await ethers.getContractFactory('TokenA')
        tokenA=await TokenA.deploy("TokenA","TKA")
        await tokenA.deployed()

        const TokenB=await ethers.getContractFactory('TokenB')
         tokenB=await TokenB.deploy("TokenB","TKB")
         await tokenB.deployed()

        const Factory=await ethers.getContractFactory('UniswapV3Factory')
        factory=await Factory.deploy()
        await factory.deployed()

        const Router=await ethers.getContractFactory('SwapRouter')
        router=await Router.deploy(factoryAddress,wrappedEther)
        await router.deployed()
    })

    it('Should create pool for tokenA and tokenB',async()=>{
        await factory.createPool(tokenA,tokenB,300)
    })
})

