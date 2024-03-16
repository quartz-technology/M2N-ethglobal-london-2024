import { INotifier } from "./notifier";

export class ConsoleNotifier extends INotifier {
  async notifyNewGuardianSubmitted(
    metaMorphoVaultName: string,
    metaMorphoVaultAddress: string,
    guardian: string,
    timelock: number
  ) {
    const activationDate = new Date(Date.now() + timelock * 1000);
    const message = [
      "--------------------------------------------------",
      `🛡️ A new guardian has been submitted to the MetaMorpho ${metaMorphoVaultName} vault deployed at ${metaMorphoVaultAddress}.`,
      `The new guardian (${guardian}) can be activated at the following date: ${activationDate}.`,
      "--------------------------------------------------\n",
    ].join("\n");

    console.log(message);
  }
}
