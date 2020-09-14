export default async ({ query: { ip } }, res) => {
  const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
  const data = await geoResponse.json();
  res.statusCode = 200;
  res.json(data);
};
