export function assetPath(path: string, configuredBase = import.meta.env.BASE_URL) {
  const base = configuredBase.endsWith('/') ? configuredBase : `${configuredBase}/`
  return `${base}${path.replace(/^\/+/, '')}`
}