import { useEffect } from 'react'

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  noindex = false 
}) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = `${title} | Bidi Converter`
    }

    // Update meta description
    if (description) {
      updateMetaTag('name', 'description', description)
    }

    // Update keywords
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords)
    }

    // Update Open Graph tags
    if (title) {
      updateMetaTag('property', 'og:title', title)
    }
    if (description) {
      updateMetaTag('property', 'og:description', description)
    }
    if (image) {
      updateMetaTag('property', 'og:image', image)
    }
    if (url) {
      updateMetaTag('property', 'og:url', url)
    }
    if (type) {
      updateMetaTag('property', 'og:type', type)
    }

    // Update Twitter Card tags
    if (title) {
      updateMetaTag('property', 'twitter:title', title)
    }
    if (description) {
      updateMetaTag('property', 'twitter:description', description)
    }
    if (image) {
      updateMetaTag('property', 'twitter:image', image)
    }

    // Update robots meta tag
    const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow'
    updateMetaTag('name', 'robots', robotsContent)

    // Update canonical URL
    if (url) {
      updateCanonicalUrl(url)
    }
  }, [title, description, keywords, image, url, type, noindex])

  const updateMetaTag = (attribute, attributeValue, content) => {
    let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`)
    
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attribute, attributeValue)
      document.head.appendChild(element)
    }
    
    element.setAttribute('content', content)
  }

  const updateCanonicalUrl = (url) => {
    let canonical = document.querySelector('link[rel="canonical"]')
    
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    
    canonical.setAttribute('href', url)
  }

  return null // This component doesn't render anything
}

export default SEO