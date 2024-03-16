# M2N-ethglobal-london-2024

MetaMorpho Notifier - Let's you know when critical operations are performed on MetaMorpho Vaults.

## Installation

```bash
npm i
```

## Configuration

Create a `.envrc` file from the `.envrc.example` file and fill in the required values.

## Usage

In one terminal, run the following command to fork the mainnet using hardhat:
```bash
npx hardhat node
```

In another terminal, run the following command to test the notifier:
```bash
npx hardhat run scripts/demo.ts --network hardhat
```

## Extend

You can extend M2N by adding more notifier implementations.
Currently, there are two implementations available:
- [`ConsoleNotifier`](./scripts/src/notifiers/console_notifier.ts) - Notifies via console
- [`PushProtocolNotifier`](./scripts/src/notifiers/push_protocol_notifier.ts) - Notifies via Push Protocol
