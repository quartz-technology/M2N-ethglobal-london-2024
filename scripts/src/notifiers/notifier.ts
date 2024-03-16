export abstract class INotifier {
  abstract notifyNewGuardianSubmitted(
    metaMorphoVaultName: string,
    metaMorphoVaultAddress: string,
    guardian: string,
    timelock: number
  ): Promise<void>;
}
