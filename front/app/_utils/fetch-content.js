export default async function fetchContent(endpoint) {
  const cache = {
    next:
      process.env.NODE_ENV === "production"
        ? { revalidate: 10 }
        : { revalidate: 0 },
  };
  const apiKey = process.env.API_KEY || false;
  var headers = new Headers();
  if (apiKey) headers.append("Authorization", `Bearer ${apiKey}`);
  headers.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers,
    ...cache,
    redirect: "follow",
  };

  try {
    // Parses the JSON returned by a network request
    const parseJSON = (resp) => (resp.json ? resp.json() : resp);
    // Checks if a network request came back fine, and throws an error if not
    const checkStatus = (resp) => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }

      return parseJSON(resp).then((resp) => {
        throw resp;
      });
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const content = await fetch(endpoint, requestOptions)
      .then(checkStatus)
      .then(parseJSON);

    return content.data;
  } catch (error) {
    return { error };
  }
}
