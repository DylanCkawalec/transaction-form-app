export interface Point {
  X: string;
  Y: string;
}

export interface BsPoint {
  X: {
    A0: string;
    A1: string;
  };
  Y: {
    A0: string;
    A1: string;
  };
}

export interface ProofData {
  Ar: Point;
  Krs: Point;
  Bs: BsPoint;
  Commitments: Point[];
  CommitmentPok: Point;
}

export interface TransactionResponse {
  Proof: ProofData;
  PublicWitness: string[];
}

export interface TransactionData {
  nonce: number;
  gasPrice: number;
  gasLimit: number;
  to: string;
  value: number;
  data: string;
  chainId: number;
} 