export interface Acoes {
  id: number;
  symbol: string;
  price: number | undefined;
  date: string;
  quantidade: number | undefined;
  valorAtual?: number;
  percent?: number | string;
  dividends?: [
    {
      amount: number;
      approval_date: string | null;
      cvm_code: number;
      ex_date: string;
      notes: string | null;
      payable_date: string;
      record_date: string;
      ticker: string;
      type: string;
    }
  ];
}
