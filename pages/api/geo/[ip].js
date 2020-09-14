export default async ({ query: { ip } }, res) => {
  const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
  const data = await geoResponse.json();
  res.statusCode = 200;
  res.json(data);
};
