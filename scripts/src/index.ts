import { ethers } from "ethers";
import { ConsoleNotifier } from "./notifiers/console_notifier";
import { PushProtocolNotifier } from "./notifiers/push_protocol_notifier";
import { INotifier } from "./notifiers/notifier";
import { SignerType } from "@pushprotocol/restapi";

export class M2N {
  private notifiers: INotifier[] = [];

  withConsoleNotifier() {
    this.notifiers.push(new ConsoleNotifier());
  }

  withPushProtocolNotifier(client: SignerType) {
    this.notifiers.push(new PushProtocolNotifier(client));
  }

  async watch(metaMorphoVault: ethers.Contract) {
    const metaMorphoVaultName = await metaMorphoVault.name();
    const metaMorphoVaultAddress = metaMorphoVault.address;
    const timelock = await metaMorphoVault.timelock();

    metaMorphoVault.on("SubmitGuardian", async (guardian) => {
      await Promise.all(
        this.notifiers.map((notifier) =>
          notifier.notifyNewGuardianSubmitted(
            metaMorphoVaultName,
            metaMorphoVaultAddress,
            guardian,
            timelock
          )
        )
      );
    });
  }
}
