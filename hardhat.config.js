require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const InfuraUrl =
  "https://rinkeby.infura.io/v3/548590ac41b7454a905d0a35da37e087";
const privateKey = process.env.PRIVATE_KEY;

module.exports = {
  solidity: {
    version: "0.7.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
      metadata: {
        bytecodeHash: "none",
      },
    },
  },
  networks: {
    rinkeby: {
      url: InfuraUrl,
      accounts: [`0x${privateKey}`],
    },
  },
  etherscan: {
    apiKey: "ECJAAD1CYPA91J7TCGP3HF1QE1UV78HKAX",
  },
};
