const { assert,expect } = require("chai");
const { ethers } = require("hardhat");
const {encodePriceSqrt}=require('./shared')

describe('Uniswap Peripheral',()=>{
    let admin,user1;
    let factory,nftPositionDescriptor,nftPositionManager,router;
    let wrappedEther,tokenA,tokenB;
    let blockNumber;

    let feeAmount= {
        LOW :500,
        MEDIUM : 3000,
        HIGH :10000,
      }

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

    describe('Adding Liquidity',()=>{
        it('deploy nft position descriptor',async()=>{
            assert(nftPositionDescriptor.address)
        })

        it('deploy nft position manager',async()=>{
            assert(nftPositionManager.address)
        })

        it('create and initialize pool if required',async()=>{
           await nftPositionManager.createAndInitializePoolIfNecessary(
                tokenA.address,
                tokenB.address,
                feeAmount.MEDIUM,
                encodePriceSqrt(1,1)
            )
        })

        it('add liquidity fails if pool does not exist',async()=>{

            const {timestamp}=await ethers.provider.getBlock(blockNumber)
           
            await expect(nftPositionManager.mint({
                token0:tokenA.address,
                token1:tokenB.address,
                tickLower: 10,
                tickUpper:200,
                fee: feeAmount.LOW,
                recipient:admin.address,
                amount0Desired: 15,
                amount1Desired: 15,
                amount0Min: 0,
                amount1Min: 0,
                deadline:timestamp+1000,
            })).to.be.reverted
        })

    })

    describe('Router Contract',()=>{
        it('constructor correctly initialized factory', async () => {
            expect(await router.factory()).to.be.equal(factory.address)
        })
    }) 
})   
