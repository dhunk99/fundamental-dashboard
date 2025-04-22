export default async function handler(req, res) {
  const [dxy, vix, us10y] = await Promise.all([
    fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=SZL10BRAEKLIQITY`).then(r => r.json()),
    fetch(`https://financialmodelingprep.com/api/v3/quotes/index?apikey=ImqjistmmmqTcjEuobmXlAo7S8rEB7kg`).then(r => r.json()),
    fetch(`https://financialmodelingprep.com/api/v3/quote/US10Y?apikey=ImqjistmmmqTcjEuobmXlAo7S8rEB7kg`).then(r => r.json()),
  ]);

  res.status(200).json({
    dxy: dxy['Realtime Currency Exchange Rate']?.['5. Exchange Rate'],
    vix: vix.find(i => i.symbol === 'VIX')?.price,
    us10y: us10y[0]?.price,
  });
}