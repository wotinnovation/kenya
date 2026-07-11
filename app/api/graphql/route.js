const GRAPHQL_BACKEND_URL =
  process.env.GRAPHQL_BACKEND_URL || "http://10.255.254.100:4401/gql";

export async function POST(request) {
  const body = await request.text();
  const authorization = request.headers.get("authorization");

  const backendResponse = await fetch(GRAPHQL_BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authorization ? { Authorization: authorization } : {}),
    },
    body,
  });

  const responseBody = await backendResponse.text();

  return new Response(responseBody, {
    status: backendResponse.status,
    headers: {
      "Content-Type": backendResponse.headers.get("content-type") || "application/json",
    },
  });
}
