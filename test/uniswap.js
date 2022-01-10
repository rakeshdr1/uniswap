const { expect } = require("chai");

describe('Uniswap',()=>{
    let admin,user1;
    let factory,poolAddress,router;
    let wrappedEther,tokenA,tokenB;
    

    beforeEach(async()=>{
        [admin,user1]=await ethers.getSigners()

        const WrappedEther=await ethers.getContractFactory('WETH')
        wrappedEther=await WrappedEther.deploy()
        

        const TokenA=await ethers.getContractFactory('TokenA')
        tokenA=await TokenA.deploy("TokenA","TKA")
        

        const TokenB=await ethers.getContractFactory('TokenB')
         tokenB=await TokenB.deploy("TokenB","TKB")
         

        const Factory=await ethers.getContractFactory('UniswapV3Factory')
        factory=await Factory.deploy()
        await factory.deployed()

        const Router=await ethers.getContractFactory('SwapRouter')
        router=await Router.deploy(factory.address,wrappedEther.address)

        await factory.createPool(tokenA.address,tokenB.address, 500)
        poolAddress=await router.getPool(tokenA.address,tokenB.address, 500)
    })

    describe('Factory Contract',()=>{
        it('admin is deployer', async () => {
            expect(await factory.owner()).to.eq(admin.address)
        })

        it('should fail create same token pairs',async()=>{
            await expect(factory.createPool(tokenA.address,tokenB.address, 500)).to.be.reverted
        })
    })


    describe('Router Contract',()=>{
        it('constructor correctly initialized factory', async () => {
            expect(await router.factory()).to.be.equal(factory.address)
        })
    }) 
    
})

