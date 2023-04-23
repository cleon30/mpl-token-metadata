/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapSerializer,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { addObjectProperty, isWritable } from '../shared';

// Accounts.
export type VerifySizedCollectionItemInstructionAccounts = {
  /** Metadata account */
  metadata: PublicKey;
  /** Collection Update authority */
  collectionAuthority: Signer;
  /** payer */
  payer?: Signer;
  /** Mint of the Collection */
  collectionMint: PublicKey;
  /** Metadata Account of the Collection */
  collection: PublicKey;
  /** MasterEdition2 Account of the Collection Token */
  collectionMasterEditionAccount: PublicKey;
  /** Collection Authority Record PDA */
  collectionAuthorityRecord?: PublicKey;
};

// Data.
export type VerifySizedCollectionItemInstructionData = {
  discriminator: number;
};

export type VerifySizedCollectionItemInstructionDataArgs = {};

export function getVerifySizedCollectionItemInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  VerifySizedCollectionItemInstructionDataArgs,
  VerifySizedCollectionItemInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    VerifySizedCollectionItemInstructionDataArgs,
    VerifySizedCollectionItemInstructionData,
    VerifySizedCollectionItemInstructionData
  >(
    s.struct<VerifySizedCollectionItemInstructionData>(
      [['discriminator', s.u8()]],
      { description: 'VerifySizedCollectionItemInstructionData' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: 30,
      } as VerifySizedCollectionItemInstructionData)
  ) as Serializer<
    VerifySizedCollectionItemInstructionDataArgs,
    VerifySizedCollectionItemInstructionData
  >;
}

// Instruction.
export function verifySizedCollectionItem(
  context: Pick<Context, 'serializer' | 'programs' | 'payer'>,
  input: VerifySizedCollectionItemInstructionAccounts
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'mplTokenMetadata',
      'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
    ),
    isWritable: false,
  };

  // Resolved inputs.
  const resolvingAccounts = {};
  addObjectProperty(resolvingAccounts, 'payer', input.payer ?? context.payer);
  const resolvedAccounts = { ...input, ...resolvingAccounts };

  // Metadata.
  keys.push({
    pubkey: resolvedAccounts.metadata,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.metadata, true),
  });

  // Collection Authority.
  signers.push(resolvedAccounts.collectionAuthority);
  keys.push({
    pubkey: resolvedAccounts.collectionAuthority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.collectionAuthority, false),
  });

  // Payer.
  signers.push(resolvedAccounts.payer);
  keys.push({
    pubkey: resolvedAccounts.payer.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.payer, true),
  });

  // Collection Mint.
  keys.push({
    pubkey: resolvedAccounts.collectionMint,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.collectionMint, false),
  });

  // Collection.
  keys.push({
    pubkey: resolvedAccounts.collection,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.collection, true),
  });

  // Collection Master Edition Account.
  keys.push({
    pubkey: resolvedAccounts.collectionMasterEditionAccount,
    isSigner: false,
    isWritable: isWritable(
      resolvedAccounts.collectionMasterEditionAccount,
      false
    ),
  });

  // Collection Authority Record (optional).
  if (resolvedAccounts.collectionAuthorityRecord) {
    keys.push({
      pubkey: resolvedAccounts.collectionAuthorityRecord,
      isSigner: false,
      isWritable: isWritable(resolvedAccounts.collectionAuthorityRecord, false),
    });
  }

  // Data.
  const data = getVerifySizedCollectionItemInstructionDataSerializer(
    context
  ).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
