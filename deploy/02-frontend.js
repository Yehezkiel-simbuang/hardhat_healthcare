const fs = require("fs");
const { network } = require("hardhat");

module.exports = async () => {
    console.log("Writing to front end...");
    await updateContractAddresses();
    await updateAbi();
    console.log("Front end written!");
};

async function updateAbi() {
    const healthcare = await ethers.getContract("Healthcare");
    fs.writeFileSync(
        process.env.frontEndAbiFile,
        healthcare.interface.format(ethers.utils.FormatTypes.json)
    );
}

async function updateContractAddresses() {
    const healthcare = await ethers.getContract("Healthcare");
    const contractAddresses = JSON.parse(
        fs.readFileSync(process.env.frontEndContractsFile, "utf8")
    );
    if (network.config.chainId.toString() in contractAddresses) {
        if (
            !contractAddresses[network.config.chainId.toString()].includes(
                healthcare.address
            )
        ) {
            contractAddresses[network.config.chainId.toString()].push(
                healthcare.address
            );
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [
            healthcare.address,
        ];
    }
    fs.writeFileSync(
        process.env.frontEndContractsFile,
        JSON.stringify(contractAddresses)
    );
}
module.exports.tags = ["all", "frontend"];
