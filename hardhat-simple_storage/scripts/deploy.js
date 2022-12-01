// imports
const { ethers, run } = require('hardhat')

//define main funcntion
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying Contract Factory')
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log('Contract Deployed to: ${simpleStorage.address}')
}

async function verify(contractAddress, args) {
  console.log('Verifying on etherscan...')

  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("lready verified")) {
      console.log("Already verified")
    } else {
      console.log(e)
    }
  }

}

//call main function
main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
})