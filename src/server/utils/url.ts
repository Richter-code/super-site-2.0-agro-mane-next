export function resolveAppBaseUrl(request?: Request) {
  return (
    process.env.NEXT_PUBLIC_APP_URL ??
    request?.headers.get('origin') ??
    'http://localhost:3001'
  );
}
