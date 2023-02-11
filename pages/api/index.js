export const config = {
  runtime: "edge",
};

function getQueryParams(url) {
  const searchParams = new URLSearchParams(url.split("?")[1]);
  const params = {};

  for (const [key, value] of searchParams) {
    params[key] = value;
  }

  return params;
}

export default async function (req) {
  const queryParams = getQueryParams(req.url);

  const lat = queryParams.lat;
  const lng = queryParams.lng;

  const appid = process.env.API_TOKEN;
  const baseurl = process.env.BASE_URL;

  const URL = `${baseurl}onecall?lat=${lat}&lon=${lng}&exclude=minutely,alerts,daily&units=metric&appid=${appid}`;

  try {
    const response = await fetch(URL).then((res) => res.json());
    return Response.json(response);
  } catch (error) {
    return Response.json({
      notFound: true,
    });
  }
}
