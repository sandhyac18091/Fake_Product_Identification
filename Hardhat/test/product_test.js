const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("ProductRegistry", function () {
  async function deployContract() {
    const [owner, other] = await ethers.getSigners();
    const Product = await ethers.getContractFactory("ProductRegistry");
    const productRegistry = await Product.deploy();

    return { owner, other, productRegistry };
  }

  it("should deploy contract with correct owner", async () => {
    const { owner, productRegistry } = await loadFixture(deployContract);
    expect(await productRegistry.owner()).to.equal(owner.address);
  });

  it("owner can add product", async () => {
    const { productRegistry } = await loadFixture(deployContract);
    await expect(
      productRegistry.addProduct("SN001",1,"Laptop","Dell","Gaming Laptop")
    ).to.emit(productRegistry, "ProductAdded");
  });

  it("non-owner cannot add product", async () => {
    const { productRegistry, other } = await loadFixture(deployContract);
    await expect(
      productRegistry
        .connect(other)
        .addProduct("SN002", 2, "Phone", "Samsung", "Smartphone")
    ).to.be.revertedWith("Only the contract owner can perform this action.");
  });

  it("cannot add duplicate product", async () => {
    const { productRegistry } = await loadFixture(deployContract);
    await productRegistry.addProduct("SN003", 3, "Tablet", "Apple", "iPad");
    await expect(
      productRegistry.addProduct("SN003", 3, "Tablet", "Apple", "iPad")
    ).to.be.revertedWith("Product with this serial number already exists.");
  });

  it("can verify an existing product", async () => {
    const { productRegistry } = await loadFixture(deployContract);
    await productRegistry.addProduct("SN004", 4, "Watch", "Garmin", "Smartwatch");
    const result = await productRegistry.verifyProduct("SN004");
    expect(result[0]).to.equal(4);
    expect(result[1]).to.equal("Watch");
    expect(result[2]).to.equal("Garmin");
    expect(result[3]).to.equal("Smartwatch");
    expect(result[4]).to.equal(true);
  });

  it("returns false for non-existent product", async () => {
    const { productRegistry } = await loadFixture(deployContract);
    const result = await productRegistry.verifyProduct("FAKE123");
    expect(result[4]).to.equal(false);
  });
});
