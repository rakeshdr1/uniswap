const fs=require('fs')

async function main(){
    const [deployer]=await ethers.getSigners();
    console.log(`Deploying contract with the account: ${deployer.address}`)

    const balance= await deployer.getBalance()
    console.log(`Account Balance:${balance.toString()}`)

    const Router=await ethers.getContractFactory('SwapRouter')

   
    const router=await Router.deploy()
    console.log(`Router address:${router.address}`)

    const data={
        address:router.address,
        abi:JSON.parse(router.interface.format('json'))
    }

    fs.writeFileSync('data/SwapRouter.json',JSON.stringify(data))
}

main().then(()=>process.exit(0)).catch(error=>{
    console.error(error)
    process.exit(1)
})