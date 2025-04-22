export default function handler(req, res) {
  const watchlist = [
    { symbol: "XAUUSD", commentary: "Gold bertahan di atas 2300, bullish outlook" },
    { symbol: "EURUSD", commentary: "Tertekan pasca rilis CPI Eurozone" },
    { symbol: "GBPUSD", commentary: "Sideways, menunggu kebijakan BOE" },
  ];
  res.status(200).json(watchlist);
}