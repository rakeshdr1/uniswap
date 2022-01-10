const fs=require('fs')

async function main(){
    const tokenA="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const tokenB="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    const wrappedETH="0x5FbDB2315678afecb367f032d93F642f64180aa3";

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

    await factory.createPool(tokenA,tokenB,"0.3")

}

main().then(()=>process.exit(0)).catch(error=>{
    console.error(error)
    process.exit(1)
})