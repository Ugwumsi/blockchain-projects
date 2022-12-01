const { assert, expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { resolveConfigFile } = require("prettier")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", function () {
          let raffle, raffleEntranceFee, deployer 

          beforeEach(async () => {
            deployer = (await getNamedAccounts()).deployer
            raffle = await ethers.getContract("Raffle", deployer)  
            raffleEntranceFee = await raffle.getEntranceFee()
            
          })
          describe("Fulfill Random Words", function () {
            //console.log("About to begin")
            it("Works with Live Chainlink Keepers and chainlink VRF, we get a random Winner", async function () {
                console.log("started...")
                const startingTimeStamp = await raffle.getLatestTimeStamp()
                const accounts = await ethers.getSigners()

                await new Promise(async (resolve, reject) => {
                    raffle.once("winnerPicked", async () => {
                        console.log("Winner Picked Event fired")
                        try{
                            const recentWinner = await raffle.getRecentWinner()
                            const raffleState = await raffle.getRaffleState()
                            const winnerBalance = await accounts[0].getBalance()
                            const endingTimeStamp = await raffle.getLatestTimeStamp()

                            console.log("The revert error: ")
                            await expect(raffle.getPlayer(0)).to.be.reverted

                            console.log("Recet Winner Assertion: ")
                            assert.equal(recentWinner.toString(), accounts[0].address)

                            console.log("Raffle State Assertion: ")
                            assert.equal(raffleState, "0")

                            console.log("Winner Balance Assertion: ")
                            assert.equal(winnerBalance.toString(), winnerStartingBalance.add(raffleEntranceFee).toString())

                            console.log("Time Stamp Assertion: ")
                            assert(endingTimeStamp > startingTimeStamp)
                            
                            resolve()
                        } catch(error){
                            console.log(error)
                            reject(error)
                        }
                    })
                    console.log("The first Phase")
                    //console.log(deployer)

                    //AN ERROR KEEPS OCCURING HERE. MUST COME BACK AND LOOK FOR A WAY TO FIX IT!!!!!!!!!!!!!!
                    const tx_1 = await raffle.enterRaffle({value: raffleEntranceFee})
                    await tx_1.wait(1)
                    console.log(accounts[0].address)
                    const winnerStartingBalance = await accounts[0].getBalance()
                    
                    console.log("Finished first Phase")
                })   
            })
          })
    })
