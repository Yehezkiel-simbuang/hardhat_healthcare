const { ethers, deployments, network } = require("hardhat");
const { assert, expect } = require("chai");
network.config.chainId != 31337
    ? describe.skip
    : describe("Healthcare", function () {
          let healthcareContract;
          let account;
          const hash_value = "hashing example";
          beforeEach(async () => {
              account = await ethers.getSigners();
              await deployments.fixture(["all"]);
              healthcareContract = await ethers.getContract(
                  "Healthcare",
                  account[0]
              );
          });

          describe("Constructor", function () {
              it("Set the doctor variable into deployer address", async () => {
                  const response = await healthcareContract.getDoctor();
                  assert.equal(response, account[0].address);
              });
          });

          describe("storeHash", function () {
              it("Set the key and value into message sender and hash value", async () => {
                  await healthcareContract.storeHash(hash_value);
                  response = await healthcareContract.getMapofHash(0);
                  assert.equal(response, hash_value);
              });
              it("can be used only by doctor", async () => {
                  account1_connect = await healthcareContract.connect(
                      account[1]
                  );
                  expect(
                      account1_connect.storeHash(hash_value)
                  ).to.be.revertedWithCustomError(
                      account1_connect,
                      "YouAreNotADoctor"
                  );
              });
          });
          describe("verifyHash", function () {
              it("return true if hash value matches", async () => {
                  await healthcareContract.storeHash(hash_value);
                  response = await healthcareContract.verifyHash(hash_value);
                  assert.equal(response, true);
              });
              it("return false if hash value false", async () => {
                  const false_hash_value = "false hash example";
                  await healthcareContract.storeHash(hash_value);
                  response = await healthcareContract.verifyHash(
                      false_hash_value
                  );
                  assert.equal(response, false);
              });
          });
      });
