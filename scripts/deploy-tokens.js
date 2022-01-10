const fs=require('fs')

async function main(){
    const [deployer]=await ethers.getSigners();
    console.log(`Deploying contract with the account: ${deployer.address}`)

    const balance= await deployer.getBalance()
    console.log(`Account Balance:${balance.toString()}`)

    const WrappedEther=await ethers.getContractFactory('WETH')

    const wrappedEther=await WrappedEther.deploy()
    console.log(`Wrapped Ether address:${wrappedEther.address}`)

    const data1={
        address:wrappedEther.address,
        abi:JSON.parse(wrappedEther.interface.format('json'))
    }

    fs.writeFileSync('data/WETH.json',JSON.stringify(data1))

    
    const TokenA=await ethers.getContractFactory('TokenA')

    const tokenA=await TokenA.deploy("TokenA","TKA")
    console.log(`TokenA address:${tokenA.address}`)

    const data2={
        address:tokenA.address,
        abi:JSON.parse(tokenA.interface.format('json'))
    }

    fs.writeFileSync('data/TokenA.json',JSON.stringify(data2))

    
    const TokenB=await ethers.getContractFactory('TokenB')

    const tokenB=await TokenB.deploy("TokenB","TKB")
    console.log(`TokenB address:${tokenB.address}`)

    const data3={
        address:tokenB.address,
        abi:JSON.parse(tokenB.interface.format('json'))
    }

    fs.writeFileSync('data/TokenB.json',JSON.stringify(data3))
}

main().then(()=>process.exit(0)).catch(error=>{
    console.error(error)
    process.exit(1)
})