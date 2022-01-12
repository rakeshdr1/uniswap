require("@nomiclabs/hardhat-waffle");

const InfuraUrl="https://rinkeby.infura.io/v3/548590ac41b7454a905d0a35da37e087"
const privateKey="6c851ffc39953069c932b42de874688c86d40a29c9b6fa405afa853e6c053a7e"

module.exports = {
  solidity:{
    version: '0.7.6',
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
      metadata: {
        bytecodeHash: 'none',
      }
    }},
    networks:{
      rinkeby:{
        url:InfuraUrl,
        accounts:[`0x${privateKey}`]
      }
    }
};
