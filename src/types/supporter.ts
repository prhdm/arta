export interface Supporter {
  name: string;
  instagram: string;
  amount: number;
  currency: 'IRR' | 'USD' | 'NOW';
}

export interface TopSupportersResponse {
  supporters: Supporter[];
}

export interface ConvertedSupporter {
  name: string;
  instagram: string;
  amount: number;
  currency: 'USD';
} 