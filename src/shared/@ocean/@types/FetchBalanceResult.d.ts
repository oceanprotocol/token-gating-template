interface FetchBalanceResult {
  decimals: ResolvedConfig['IntType'];
  formatted: string;
  symbol: string;
  value: ResolvedConfig['BigIntType'];
}
