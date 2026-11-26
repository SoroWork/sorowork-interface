interface SEOProps {
  title: string
  description?: string
  path?: string
}

const BASE_TITLE = 'SoroWork'
const DEFAULT_DESCRIPTION = 'Community work paid trustlessly on Stellar. Post tasks, submit proof, earn USDC.'

export function setSEO({ title, description = DEFAULT_DESCRIPTION, path = '' }: SEOProps) {
  document.title = `${title} | ${BASE_TITLE}`
  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) metaDesc.setAttribute('content', description)

  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', `${title} | ${BASE_TITLE}`)

  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', description)
}
