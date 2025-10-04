// Sistema de Link Building automático sin base de datos

export const LINK_BUILDING_CONFIG = {
  // Sitios objetivo por mercado
  targetSites: {
    'US': [
      { domain: 'medium.com', da: 96, type: 'guest-post', contact: 'partner@medium.com' },
      { domain: 'dev.to', da: 87, type: 'community', contact: 'hello@dev.to' },
      { domain: 'hashnode.com', da: 82, type: 'guest-post', contact: 'support@hashnode.com' },
      { domain: 'freecodecamp.org', da: 94, type: 'guest-post', contact: 'quincy@freecodecamp.org' }
    ],
    'IN': [
      { domain: 'yourstory.com', da: 78, type: 'guest-post', contact: 'editor@yourstory.com' },
      { domain: 'inc42.com', da: 72, type: 'guest-post', contact: 'news@inc42.com' },
      { domain: 'analytics-india.com', da: 65, type: 'guest-post', contact: 'editor@analyticsindiamag.com' }
    ],
    'RU': [
      { domain: 'habr.com', da: 89, type: 'community', contact: 'feedback@habr.com' },
      { domain: 'vc.ru', da: 76, type: 'guest-post', contact: 'editor@vc.ru' },
      { domain: 'rb.ru', da: 68, type: 'guest-post', contact: 'info@rb.ru' }
    ]
  },

  // Estrategias de outreach
  outreachTemplates: {
    'guest-post': {
      subject: 'Guest Post Proposal: {topic}',
      template: `Hi {name},

I hope this email finds you well. I'm reaching out from Bidi Converter, a free online tool platform.

I'd love to contribute a high-quality guest post to {domain} on the topic of "{topic}". 

The article would be:
- 2000+ words of original, valuable content
- Include actionable tips and examples
- Be tailored specifically for your audience
- Include only 1-2 relevant, contextual links

Would you be interested in seeing an outline or draft?

Best regards,
Bidi Converter Team`
    },
    'resource-page': {
      subject: 'Resource Addition Suggestion for {page}',
      template: `Hi,

I came across your excellent resource page at {url} and noticed it would be a perfect fit for our free tool.

Bidi Converter is a comprehensive online file conversion platform that your readers might find valuable. It offers:
- Free image conversion (PNG, JPG, WebP, etc.)
- PDF tools and viewers
- No registration required
- Works offline as a PWA

Would you consider adding it to your resource list?

Thanks for your time!`
    }
  },

  // Métricas de seguimiento
  trackingMetrics: {
    outreach: ['sent', 'opened', 'replied', 'accepted'],
    links: ['acquired', 'live', 'removed', 'nofollow'],
    traffic: ['referral_visits', 'conversions', 'bounce_rate']
  }
};

export class LinkBuildingManager {
  constructor() {
    this.campaigns = new Map();
    this.prospects = new Map();
    this.backlinks = new Map();
    this.metrics = {};
    this.init();
  }

  async init() {
    this.loadProspects();
    this.setupTracking();
    this.initializeAutomation();
  }

  loadProspects() {
    Object.entries(LINK_BUILDING_CONFIG.targetSites).forEach(([market, sites]) => {
      sites.forEach(site => {
        const prospectId = `${market}-${site.domain}`;
        this.prospects.set(prospectId, {
          id: prospectId,
          market,
          ...site,
          status: 'identified',
          lastContact: null,
          response: null
        });
      });
    });
  }

  async createCampaign(market, strategy = 'guest-post') {
    const campaignId = `${market}-${strategy}-${Date.now()}`;
    const prospects = Array.from(this.prospects.values())
      .filter(p => p.market === market && p.type === strategy);

    const campaign = {
      id: campaignId,
      market,
      strategy,
      prospects: prospects.map(p => p.id),
      status: 'active',
      created: Date.now(),
      metrics: {
        sent: 0,
        opened: 0,
        replied: 0,
        accepted: 0
      }
    };

    this.campaigns.set(campaignId, campaign);
    return campaign;
  }

  async sendOutreach(prospectId, topic) {
    const prospect = this.prospects.get(prospectId);
    if (!prospect) return false;

    const template = LINK_BUILDING_CONFIG.outreachTemplates[prospect.type];
    const email = this.generateEmail(template, prospect, topic);

    // Simular envío de email
    const sent = await this.simulateEmailSend(email, prospect);
    
    if (sent) {
      prospect.lastContact = Date.now();
      prospect.status = 'contacted';
      this.updateCampaignMetrics(prospect.market, 'sent');
    }

    return sent;
  }

  generateEmail(template, prospect, topic) {
    return {
      to: prospect.contact,
      subject: template.subject.replace('{topic}', topic),
      body: template.template
        .replace('{name}', 'Editor')
        .replace('{domain}', prospect.domain)
        .replace('{topic}', topic)
        .replace('{url}', `https://${prospect.domain}`)
    };
  }

  async simulateEmailSend(email, prospect) {
    // Simular tasa de éxito basada en DA
    const successRate = Math.min(0.8, prospect.da / 100);
    const success = Math.random() < successRate;

    if (success) {
      console.log(`Link Building: Email sent to ${prospect.domain}`);
      
      // Simular respuesta después de un tiempo
      setTimeout(() => {
        this.simulateResponse(prospect);
      }, Math.random() * 5000 + 1000);
    }

    return success;
  }

  simulateResponse(prospect) {
    const responseRate = 0.3; // 30% tasa de respuesta
    
    if (Math.random() < responseRate) {
      prospect.response = Math.random() < 0.4 ? 'positive' : 'negative';
      prospect.status = prospect.response === 'positive' ? 'accepted' : 'rejected';
      
      this.updateCampaignMetrics(prospect.market, 'replied');
      
      if (prospect.response === 'positive') {
        this.updateCampaignMetrics(prospect.market, 'accepted');
        this.createBacklink(prospect);
      }
    }
  }

  createBacklink(prospect) {
    const backlinkId = `${prospect.domain}-${Date.now()}`;
    const backlink = {
      id: backlinkId,
      domain: prospect.domain,
      url: `https://${prospect.domain}/article-about-tools`,
      anchor: 'free image converter',
      type: prospect.type,
      da: prospect.da,
      follow: Math.random() < 0.3, // 30% dofollow
      acquired: Date.now(),
      status: 'live'
    };

    this.backlinks.set(backlinkId, backlink);
    
    // Trackear adquisición
    if (typeof gtag !== 'undefined') {
      gtag('event', 'backlink_acquired', {
        event_category: 'SEO',
        domain: prospect.domain,
        da: prospect.da,
        follow: backlink.follow
      });
    }

    return backlink;
  }

  updateCampaignMetrics(market, metric) {
    const campaigns = Array.from(this.campaigns.values())
      .filter(c => c.market === market && c.status === 'active');

    campaigns.forEach(campaign => {
      campaign.metrics[metric]++;
    });
  }

  setupTracking() {
    // Trackear métricas cada hora
    setInterval(() => {
      this.trackMetrics();
    }, 3600000);
  }

  trackMetrics() {
    const metrics = {
      totalProspects: this.prospects.size,
      totalCampaigns: this.campaigns.size,
      totalBacklinks: this.backlinks.size,
      averageDA: this.calculateAverageDA(),
      followRatio: this.calculateFollowRatio(),
      timestamp: Date.now()
    };

    this.metrics[Date.now()] = metrics;
  }

  calculateAverageDA() {
    const backlinks = Array.from(this.backlinks.values());
    if (backlinks.length === 0) return 0;
    
    const totalDA = backlinks.reduce((sum, link) => sum + link.da, 0);
    return Math.round(totalDA / backlinks.length);
  }

  calculateFollowRatio() {
    const backlinks = Array.from(this.backlinks.values());
    if (backlinks.length === 0) return 0;
    
    const followLinks = backlinks.filter(link => link.follow).length;
    return Math.round((followLinks / backlinks.length) * 100) / 100;
  }

  initializeAutomation() {
    // Automatizar outreach cada semana
    setInterval(() => {
      this.runAutomatedOutreach();
    }, 7 * 24 * 60 * 60 * 1000); // 1 semana
  }

  async runAutomatedOutreach() {
    const markets = ['US', 'IN', 'RU', 'KR'];
    const topics = [
      'Best Free Image Conversion Tools',
      'How to Convert Files Online Safely',
      'Top Productivity Tools for 2024',
      'Free vs Paid File Converters'
    ];

    for (const market of markets) {
      const campaign = await this.createCampaign(market, 'guest-post');
      const topic = topics[Math.floor(Math.random() * topics.length)];
      
      // Enviar a 3 prospects por campaña
      const prospects = campaign.prospects.slice(0, 3);
      
      for (const prospectId of prospects) {
        await this.sendOutreach(prospectId, topic);
        // Esperar entre envíos
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  getLinkBuildingStats() {
    return {
      totalProspects: this.prospects.size,
      totalCampaigns: this.campaigns.size,
      totalBacklinks: this.backlinks.size,
      averageDA: this.calculateAverageDA(),
      followRatio: this.calculateFollowRatio(),
      campaignStats: this.getCampaignStats(),
      recentBacklinks: this.getRecentBacklinks(10)
    };
  }

  getCampaignStats() {
    const campaigns = Array.from(this.campaigns.values());
    return campaigns.map(campaign => ({
      id: campaign.id,
      market: campaign.market,
      strategy: campaign.strategy,
      metrics: campaign.metrics,
      successRate: campaign.metrics.sent > 0 ? 
        Math.round((campaign.metrics.accepted / campaign.metrics.sent) * 100) : 0
    }));
  }

  getRecentBacklinks(limit = 10) {
    return Array.from(this.backlinks.values())
      .sort((a, b) => b.acquired - a.acquired)
      .slice(0, limit);
  }
}

export const initializeLinkBuildingManager = async () => {
  const manager = new LinkBuildingManager();
  await manager.init();
  
  window.linkBuildingManager = manager;
  return manager;
};

export default LinkBuildingManager;
