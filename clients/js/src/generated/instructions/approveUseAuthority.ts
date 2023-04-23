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
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { findMetadataPda } from '../accounts';
import { addObjectProperty, isWritable } from '../shared';

// Accounts.
export type ApproveUseAuthorityInstructionAccounts = {
  /** Use Authority Record PDA */
  useAuthorityRecord: PublicKey;
  /** Owner */
  owner: Signer;
  /** Payer */
  payer?: Signer;
  /** A Use Authority */
  user: PublicKey;
  /** Owned Token Account Of Mint */
  ownerTokenAccount: PublicKey;
  /** Metadata account */
  metadata?: PublicKey;
  /** Mint of Metadata */
  mint: PublicKey;
  /** Program As Signer (Burner) */
  burner: PublicKey;
  /** Token program */
  tokenProgram?: PublicKey;
  /** System program */
  systemProgram?: PublicKey;
  /** Rent info */
  rent?: PublicKey;
};

// Data.
export type ApproveUseAuthorityInstructionData = {
  discriminator: number;
  numberOfUses: bigint;
};

export type ApproveUseAuthorityInstructionDataArgs = {
  numberOfUses: number | bigint;
};

export function getApproveUseAuthorityInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  ApproveUseAuthorityInstructionDataArgs,
  ApproveUseAuthorityInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    ApproveUseAuthorityInstructionDataArgs,
    ApproveUseAuthorityInstructionData,
    ApproveUseAuthorityInstructionData
  >(
    s.struct<ApproveUseAuthorityInstructionData>(
      [
        ['discriminator', s.u8()],
        ['numberOfUses', s.u64()],
      ],
      { description: 'ApproveUseAuthorityInstructionData' }
    ),
    (value) =>
      ({ ...value, discriminator: 20 } as ApproveUseAuthorityInstructionData)
  ) as Serializer<
    ApproveUseAuthorityInstructionDataArgs,
    ApproveUseAuthorityInstructionData
  >;
}

// Args.
export type ApproveUseAuthorityInstructionArgs =
  ApproveUseAuthorityInstructionDataArgs;

// Instruction.
export function approveUseAuthority(
  context: Pick<Context, 'serializer' | 'programs' | 'eddsa' | 'payer'>,
  input: ApproveUseAuthorityInstructionAccounts &
    ApproveUseAuthorityInstructionArgs
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
  const resolvingArgs = {};
  addObjectProperty(resolvingAccounts, 'payer', input.payer ?? context.payer);
  addObjectProperty(
    resolvingAccounts,
    'metadata',
    input.metadata ?? findMetadataPda(context, { mint: publicKey(input.mint) })
  );
  addObjectProperty(
    resolvingAccounts,
    'tokenProgram',
    input.tokenProgram ?? {
      ...context.programs.getPublicKey(
        'splToken',
        'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
      ),
      isWritable: false,
    }
  );
  addObjectProperty(
    resolvingAccounts,
    'systemProgram',
    input.systemProgram ?? {
      ...context.programs.getPublicKey(
        'splSystem',
        '11111111111111111111111111111111'
      ),
      isWritable: false,
    }
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Use Authority Record.
  keys.push({
    pubkey: resolvedAccounts.useAuthorityRecord,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.useAuthorityRecord, true),
  });

  // Owner.
  signers.push(resolvedAccounts.owner);
  keys.push({
    pubkey: resolvedAccounts.owner.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.owner, true),
  });

  // Payer.
  signers.push(resolvedAccounts.payer);
  keys.push({
    pubkey: resolvedAccounts.payer.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.payer, true),
  });

  // User.
  keys.push({
    pubkey: resolvedAccounts.user,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.user, false),
  });

  // Owner Token Account.
  keys.push({
    pubkey: resolvedAccounts.ownerTokenAccount,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.ownerTokenAccount, true),
  });

  // Metadata.
  keys.push({
    pubkey: resolvedAccounts.metadata,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.metadata, false),
  });

  // Mint.
  keys.push({
    pubkey: resolvedAccounts.mint,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.mint, false),
  });

  // Burner.
  keys.push({
    pubkey: resolvedAccounts.burner,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.burner, false),
  });

  // Token Program.
  keys.push({
    pubkey: resolvedAccounts.tokenProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.tokenProgram, false),
  });

  // System Program.
  keys.push({
    pubkey: resolvedAccounts.systemProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.systemProgram, false),
  });

  // Rent (optional).
  if (resolvedAccounts.rent) {
    keys.push({
      pubkey: resolvedAccounts.rent,
      isSigner: false,
      isWritable: isWritable(resolvedAccounts.rent, false),
    });
  }

  // Data.
  const data =
    getApproveUseAuthorityInstructionDataSerializer(context).serialize(
      resolvedArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
