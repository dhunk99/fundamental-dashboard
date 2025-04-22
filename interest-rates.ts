export default async function handler(req, res) {
  const response = await fetch(`https://financialmodelingprep.com/api/v4/interest-rate?apikey=ImqjistmmmqTcjEuobmXlAo7S8rEB7kg`);
  const data = await response.json();
  const cleaned = data.map(item => ({
    country: item.country,
    value: item.value,
  }));
  res.status(200).json(cleaned);
}