import hre, { ethers } from "hardhat";
import { metaMorphoVaultABI, metaMorphoVaultFactoryABI } from "./abi";

describe("M2N", function () {
  it("Should work", async function () {
    const [alice, bob, pierre] = await hre.ethers.getSigners();

    const metaMorphoVaultFactoryAddress =
      "0xa9c3d3a366466fa809d1ae982fb2c46e5fc41101";
    const metaMorphoVaultFactory = await new hre.ethers.Contract(
      metaMorphoVaultFactoryAddress,
      metaMorphoVaultFactoryABI,
      alice
    );

    const isMetaMorpho = await metaMorphoVaultFactory.isMetaMorpho(
      "0xEbFA750279dEfa89b8D99bdd145a016F6292757b"
    );

    console.log("isMetaMorpho:", isMetaMorpho);

    const metaMorpho = await metaMorphoVaultFactory.createMetaMorpho(
      alice.address,
      86400,
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "TEST",
      "TEST",
      "0x4200000000000000000000000000000000000000000000000000000000000000"
    );

    await metaMorpho.wait();

    const metaMorphoVaultAddress = "0x963A1B52315039ac19867CC8F9898ff8b1593389";
    const metaMorphoVault = await new hre.ethers.Contract(
      metaMorphoVaultAddress,
      metaMorphoVaultABI,
      alice
    );

    const name = await metaMorphoVault.name();
    console.log("name:", name);

    const wsProvider = new ethers.providers.WebSocketProvider(
      "ws://localhost:8545"
    );

    const metaMorphoVaultListener = await new hre.ethers.Contract(
      metaMorphoVaultAddress,
      metaMorphoVaultABI,
      wsProvider
    );

    metaMorphoVaultListener.on("SubmitGuardian", () => {
      console.log("SUBMIT GUARDIAN");
    });

    const initGuardian = await metaMorphoVault.submitGuardian(bob.address);
    let tx = await initGuardian.wait();

    const submitGuardian = await metaMorphoVault.submitGuardian(pierre.address);
    tx = await submitGuardian.wait();

    console.log("tx:", tx.events);
  });
});
