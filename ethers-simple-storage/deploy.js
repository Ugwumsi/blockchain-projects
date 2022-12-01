const ethers = require('ethers');
const fs = require('fs-extra');
require('dotenv').config();

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY_FOR_INDEX_1, provider)
    const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf8');
    const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8');

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log('Deploying Contract. Please wait');
    const contract = await contractFactory.deploy();
    console.log(contract);
}

main();