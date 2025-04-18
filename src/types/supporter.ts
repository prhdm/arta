export interface Supporter {
  name: string;
  instagram: string;
  amount: number;
  currency: 'USD' | 'IRR';
}

export interface ConvertedSupporter {
  name: string;
  instagram: string;
  amount: number;
  currency: 'USD';
} 