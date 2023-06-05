const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const healthcareContract = await deploy("Healthcare", {
        from: deployer,
        log: true,
    });
    console.log(`Contract deployed at ${healthcareContract.address}`);

    if (network.config.chainId == 31337) {
    } else {
        await verify(healthcareContract.address);
    }
};

module.exports.tags = ["all", "healthcare"];
