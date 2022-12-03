export interface Acoes {
  id: number,
  symbol: string,
  price: number | undefined,
  date: string,
  quantidade: number | undefined,
  valorAtual?: number,
  percent?: number | string;
  dividends?: number;
}
