const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;
const getIp = process.env.GET_IP;

export default async ({ query: { ip } }, res) => {
  const geoResponse = await fetch(
    `${api_url}apiKey=${api_key}&ipAddress=${ip}`,
  );
  const data = await geoResponse.json();
  res.statusCode = 200;
  res.json(data);
};
