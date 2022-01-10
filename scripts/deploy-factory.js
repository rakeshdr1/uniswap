const fs=require('fs')

async function main(){
    const tokenA="0xa32B87B419d330258852c08ca1c0408d781BabF3";
    const tokenB="0x78e3f26C49E409Ae4F15d50A1495DFe8F1071398";
    const wrappedETH="0x35B3e2aF1dAc1C991524A903c792d584beaDC553";

    const [deployer]=await ethers.getSigners();
    console.log(`Deploying contract with the account: ${deployer.address}`)

    const balance= await deployer.getBalance()
    console.log(`Account Balance:${balance.toString()}`)

    const Factory=await ethers.getContractFactory('UniswapV3Factory')

    const factory=await Factory.deploy()
    console.log(`Factory address:${factory.address}`)

    const data={
        address:factory.address,
        abi:JSON.parse(factory.interface.format('json'))
    }

    fs.writeFileSync('data/UniswapV3Factory.json',JSON.stringify(data))

    await factory.createPool(tokenA,tokenB,300)

}

main().then(()=>process.exit(0)).catch(error=>{
    console.error(error)
    process.exit(1)
})