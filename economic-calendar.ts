export default async function handler(req, res) {
  const response = await fetch(`https://financialmodelingprep.com/api/v3/economic_calendar?apikey=ImqjistmmmqTcjEuobmXlAo7S8rEB7kg`);
  const data = await response.json();
  res.status(200).json(data.slice(0, 10));
}