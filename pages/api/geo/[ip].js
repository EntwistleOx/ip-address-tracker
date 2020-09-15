export default async ({ query: { ip } }, res) => {
  const geoResponse = await fetch(
    `https://geo.ipify.org/api/v1?apiKey=${process.env.API_KEY}&ipAddress=${ip}`,
  );
  const data = await geoResponse.json();
  res.statusCode = 200;
  res.json(data);
};
