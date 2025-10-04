// Auditor técnico de SEO automático

export const SEO_AUDIT_CONFIG = {
  // Criterios de auditoría
  criteria: {
    'canonical': { weight: 10, critical: true },
    'meta_description': { weight: 8, critical: true },
    'title_tag': { weight: 10, critical: true },
    'hreflang': { weight: 7, critical: false },
    'og_tags': { weight: 6, critical: false },
    'structured_data': { weight: 9, critical: true },
    'robots_meta': { weight: 5, critical: false },
    'url_structure': { weight: 7, critical: true }
  },

  // Umbrales de calidad
  thresholds: {
    title: { min: 30, max: 60 },
    description: { min: 120, max: 160 },
    url_length: { max: 100 },
    h1_count: { max: 1 },
    image_alt: { min_coverage: 0.8 }
  }
};

export class TechnicalSEOAuditor {
  constructor() {
    this.auditResults = new Map();
    this.score = 0;
    this.issues = [];
    this.recommendations = [];
  }

  async performAudit() {
    console.log('🔍 Starting Technical SEO Audit');
    
    this.auditCanonicalTags();
    this.auditMetaTags();
    this.auditStructuredData();
    this.auditURLStructure();
    this.auditImages();
    this.auditHeadings();
    this.auditInternalLinks();
    
    this.calculateScore();
    this.generateRecommendations();
    
    return this.getAuditReport();
  }

  auditCanonicalTags() {
    const canonical = document.querySelector('link[rel="canonical"]');
    const result = {
      name: 'Canonical Tags',
      passed: !!canonical,
      score: canonical ? 100 : 0,
      issues: []
    };

    if (!canonical) {
      result.issues.push('Missing canonical tag');
    } else if (!canonical.href.startsWith('https://')) {
      result.issues.push('Canonical URL should use HTTPS');
      result.score = 50;
    }

    this.auditResults.set('canonical', result);
  }

  auditMetaTags() {
    const title = document.title;
    const description = document.querySelector('meta[name="description"]')?.content;
    
    const result = {
      name: 'Meta Tags',
      passed: true,
      score: 100,
      issues: []
    };

    // Title audit
    if (!title) {
      result.issues.push('Missing title tag');
      result.passed = false;
      result.score -= 40;
    } else if (title.length < 30 || title.length > 60) {
      result.issues.push(`Title length ${title.length} chars (optimal: 30-60)`);
      result.score -= 20;
    }

    // Description audit
    if (!description) {
      result.issues.push('Missing meta description');
      result.passed = false;
      result.score -= 40;
    } else if (description.length < 120 || description.length > 160) {
      result.issues.push(`Description length ${description.length} chars (optimal: 120-160)`);
      result.score -= 20;
    }

    this.auditResults.set('meta_tags', result);
  }

  auditStructuredData() {
    const schemas = document.querySelectorAll('script[type="application/ld+json"]');
    const result = {
      name: 'Structured Data',
      passed: schemas.length > 0,
      score: schemas.length > 0 ? 100 : 0,
      issues: []
    };

    if (schemas.length === 0) {
      result.issues.push('No structured data found');
    } else {
      schemas.forEach((schema, index) => {
        try {
          JSON.parse(schema.textContent);
        } catch (e) {
          result.issues.push(`Invalid JSON-LD at position ${index + 1}`);
          result.score -= 30;
        }
      });
    }

    this.auditResults.set('structured_data', result);
  }

  auditURLStructure() {
    const url = window.location.href;
    const result = {
      name: 'URL Structure',
      passed: true,
      score: 100,
      issues: []
    };

    if (url.length > 100) {
      result.issues.push(`URL too long: ${url.length} chars`);
      result.score -= 20;
    }

    if (url.includes('?') && url.split('?')[1].split('&').length > 3) {
      result.issues.push('Too many URL parameters');
      result.score -= 15;
    }

    if (!url.startsWith('https://')) {
      result.issues.push('URL should use HTTPS');
      result.score -= 30;
      result.passed = false;
    }

    this.auditResults.set('url_structure', result);
  }

  auditImages() {
    const images = document.querySelectorAll('img');
    const result = {
      name: 'Images SEO',
      passed: true,
      score: 100,
      issues: []
    };

    let imagesWithAlt = 0;
    images.forEach(img => {
      if (img.alt && img.alt.trim()) {
        imagesWithAlt++;
      }
    });

    const altCoverage = images.length > 0 ? imagesWithAlt / images.length : 1;
    if (altCoverage < 0.8) {
      result.issues.push(`Only ${Math.round(altCoverage * 100)}% images have alt text`);
      result.score = Math.round(altCoverage * 100);
      result.passed = false;
    }

    this.auditResults.set('images', result);
  }

  auditHeadings() {
    const h1s = document.querySelectorAll('h1');
    const result = {
      name: 'Heading Structure',
      passed: h1s.length === 1,
      score: 100,
      issues: []
    };

    if (h1s.length === 0) {
      result.issues.push('Missing H1 tag');
      result.score = 0;
      result.passed = false;
    } else if (h1s.length > 1) {
      result.issues.push(`Multiple H1 tags found: ${h1s.length}`);
      result.score = 60;
      result.passed = false;
    }

    this.auditResults.set('headings', result);
  }

  auditInternalLinks() {
    const links = document.querySelectorAll('a[href^="/"], a[href*="bidiconverter.com"]');
    const result = {
      name: 'Internal Links',
      passed: links.length >= 3,
      score: Math.min(100, links.length * 20),
      issues: []
    };

    if (links.length < 3) {
      result.issues.push(`Only ${links.length} internal links (recommended: 3+)`);
      result.passed = false;
    }

    this.auditResults.set('internal_links', result);
  }

  calculateScore() {
    let totalWeight = 0;
    let weightedScore = 0;

    this.auditResults.forEach((result, key) => {
      const config = SEO_AUDIT_CONFIG.criteria[key];
      if (config) {
        const weight = config.weight;
        totalWeight += weight;
        weightedScore += (result.score / 100) * weight;
        
        if (!result.passed && config.critical) {
          this.issues.push({
            type: 'critical',
            category: key,
            message: result.issues[0] || `Critical issue in ${result.name}`
          });
        }
      }
    });

    this.score = Math.round((weightedScore / totalWeight) * 100);
  }

  generateRecommendations() {
    this.auditResults.forEach((result, key) => {
      if (!result.passed || result.score < 80) {
        result.issues.forEach(issue => {
          this.recommendations.push({
            category: key,
            priority: result.score < 50 ? 'high' : 'medium',
            issue: issue,
            solution: this.getSolution(key, issue)
          });
        });
      }
    });
  }

  getSolution(category, issue) {
    const solutions = {
      'canonical': {
        'Missing canonical tag': 'Add <link rel="canonical" href="..."> to head',
        'Canonical URL should use HTTPS': 'Update canonical URL to use HTTPS protocol'
      },
      'meta_tags': {
        'Missing title tag': 'Add descriptive title tag (30-60 characters)',
        'Missing meta description': 'Add meta description (120-160 characters)'
      },
      'structured_data': {
        'No structured data found': 'Implement JSON-LD structured data for better rich snippets'
      }
    };

    return solutions[category]?.[issue] || 'Review and fix this SEO issue';
  }

  getAuditReport() {
    return {
      score: this.score,
      grade: this.getGrade(),
      passed: this.score >= 80,
      issues: this.issues,
      recommendations: this.recommendations,
      results: Object.fromEntries(this.auditResults),
      timestamp: Date.now()
    };
  }

  getGrade() {
    if (this.score >= 90) return 'A';
    if (this.score >= 80) return 'B';
    if (this.score >= 70) return 'C';
    if (this.score >= 60) return 'D';
    return 'F';
  }
}

export const initializeTechnicalSEOAuditor = async () => {
  const auditor = new TechnicalSEOAuditor();
  window.technicalSEOAuditor = auditor;
  return auditor;
};

export default TechnicalSEOAuditor;
