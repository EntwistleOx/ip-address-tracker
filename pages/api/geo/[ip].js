// `https://geo.ipify.org/api/v1?apiKey=${process.env.API_KEY}&ipAddress=${ip}`,
export default async ({ query: { ip } }, res) => {
  const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
  const data = await geoResponse.json();
  res.statusCode = 200;
  res.json(data);
};

// https://cors-anywhere.herokuapp.com/http://ip-api.com/json/
