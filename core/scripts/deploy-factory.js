const fs=require('fs')

async function main(){
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
}

main().then(()=>process.exit(0)).catch(error=>{
    console.error(error)
    process.exit(1)
})