import { INotifier } from "./notifier";
import { PushAPI, CONSTANTS, SignerType } from "@pushprotocol/restapi";

export class PushProtocolNotifier extends INotifier {
  private pushUser!: PushAPI;

  constructor(client: SignerType) {
    super();

    (async () => {
      this.pushUser = await PushAPI.initialize(client, {
        env: CONSTANTS.ENV.STAGING,
      });
    })();
  }

  async notifyNewGuardianSubmitted(
    metaMorphoVaultName: string,
    metaMorphoVaultAddress: string,
    guardian: string,
    timelock: number
  ) {
    const activationDate = new Date(Date.now() + timelock * 1000);
    const title = `🛡️ ${metaMorphoVaultName} - New Guardian Submitted`;
    const message = [
      `A new guardian has been submitted to the MetaMorpho ${metaMorphoVaultName} vault deployed at ${metaMorphoVaultAddress}.`,
      `The new guardian (${guardian}) can be activated at the following date: ${activationDate}.`,
    ].join("\n");

    const response = await this.pushUser.channel.send(["*"], {
      notification: {
        title: title,
        body: message,
      },
    });

    console.log(response);
  }
}
