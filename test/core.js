const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Uniswap Core',()=>{
    let admin,user1;
    let factory,poolAddress,nftPositionDescriptor,router;
    let wrappedEther,tokenA,tokenB;
    

    beforeEach(async()=>{
        [admin,user1]=await ethers.getSigners()
       blockNumber=await ethers.provider.blockNumber

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

        const NFTDescriptorLibrary=await ethers.getContractFactory('NFTDescriptor')
        let nftDescriptorLibrary=await NFTDescriptorLibrary.deploy()

        const NonfungibleTokenPositionDescriptor=await ethers.getContractFactory('NonfungibleTokenPositionDescriptor',{
            libraries:{
                NFTDescriptor:`${nftDescriptorLibrary.address}`
            }
        })

        nftPositionDescriptor=await NonfungibleTokenPositionDescriptor.deploy(wrappedEther.address,'0x4554480000000000000000000000000000000000000000000000000000000000')

        const NftPositionManager=await ethers.getContractFactory('NonfungiblePositionManager')
        nftPositionManager=await NftPositionManager.deploy(factory.address,wrappedEther.address,nftPositionDescriptor.address)

    })   

        describe('Factory Contract',()=>{
        it('admin is deployer', async () => {
            expect(await factory.owner()).to.eq(admin.address)
        })

        it('should fail create same token pairs',async()=>{
            await expect(factory.createPool(tokenA.address,tokenB.address, 500)).to.be.reverted
        })
    })
})
