export interface Supporter {
  Name: string;
  InstagramID: string;
  TotalAmount: number;
  currency?: 'USD';
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