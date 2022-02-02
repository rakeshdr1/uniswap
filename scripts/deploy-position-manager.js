const fs = require("fs");

async function main() {
  const factoryAddress = "0xB9bbeCB84222b0411e49408282BAB329d91E8D67";
  const wrappedEther = "0x35B3e2aF1dAc1C991524A903c792d584beaDC553";

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contract with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account Balance:${balance.toString()}`);

  const NFTDescriptorLibrary = await ethers.getContractFactory("NFTDescriptor");
  let nftDescriptorLibrary = await NFTDescriptorLibrary.deploy();

  const NonfungibleTokenPositionDescriptor = await ethers.getContractFactory(
    "NonfungibleTokenPositionDescriptor",
    {
      libraries: {
        NFTDescriptor: `${nftDescriptorLibrary.address}`,
      },
    }
  );

  const nftPositionDescriptor = await NonfungibleTokenPositionDescriptor.deploy(
    wrappedEther,
    "0x4554480000000000000000000000000000000000000000000000000000000000"
  );
  console.log(`Position descriptor address:${nftPositionDescriptor.address}`);

  const NftPositionManager = await ethers.getContractFactory(
    "NonfungiblePositionManager"
  );
  const nftPositionManager = await NftPositionManager.deploy(
    factoryAddress,
    wrappedEther,
    nftPositionDescriptor.address
  );
  console.log(`Position manager address:${nftPositionManager.address}`);

  const data = {
    address: nftPositionManager.address,
    abi: JSON.parse(nftPositionManager.interface.format("json")),
  };

  fs.writeFileSync(
    "data/NonfungiblePositionManager.json",
    JSON.stringify(data)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
