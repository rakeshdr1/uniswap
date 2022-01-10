const fs=require('fs')

async function main(){
    const factoryAddress="0xB9bbeCB84222b0411e49408282BAB329d91E8D67"
    const wrappedEther="0x35B3e2aF1dAc1C991524A903c792d584beaDC553"

    const [deployer]=await ethers.getSigners();
    console.log(`Deploying contract with the account: ${deployer.address}`)

    const balance= await deployer.getBalance()
    console.log(`Account Balance:${balance.toString()}`)

    const Router=await ethers.getContractFactory('SwapRouter')

   
    const router=await Router.deploy(factoryAddress,wrappedEther)
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