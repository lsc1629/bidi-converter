// Generador de contenido SEO automático

export const CONTENT_TEMPLATES = {
  // Plantillas por tipo de artículo
  howToGuide: {
    structure: [
      'introduction',
      'overview', 
      'requirements',
      'step-by-step',
      'tips',
      'troubleshooting',
      'conclusion'
    ],
    targetLength: 2000,
    keywordDensity: 0.015
  },

  comparison: {
    structure: [
      'introduction',
      'criteria',
      'option1',
      'option2', 
      'option3',
      'comparison-table',
      'recommendation',
      'conclusion'
    ],
    targetLength: 2500,
    keywordDensity: 0.012
  },

  bestPractices: {
    structure: [
      'introduction',
      'why-important',
      'practice1',
      'practice2',
      'practice3',
      'common-mistakes',
      'checklist',
      'conclusion'
    ],
    targetLength: 1800,
    keywordDensity: 0.018
  }
};

export const MARKET_CONTENT = {
  'US': {
    tone: 'professional',
    style: 'direct',
    topics: [
      'image-optimization-techniques',
      'file-conversion-best-practices', 
      'productivity-tools-comparison',
      'web-performance-optimization',
      'digital-asset-management'
    ],
    keywords: {
      primary: ['image converter', 'file conversion', 'online tools'],
      secondary: ['free converter', 'web tools', 'productivity'],
      longtail: ['how to convert images online', 'best free file converter', 'online image optimization']
    }
  },

  'IN': {
    tone: 'helpful',
    style: 'detailed',
    topics: [
      'mobile-optimization-guide',
      'data-saving-techniques',
      'offline-tools-benefits',
      'free-software-alternatives',
      'bandwidth-optimization'
    ],
    keywords: {
      primary: ['मुफ्त टूल्स', 'इमेज कन्वर्टर', 'ऑनलाइन टूल्स'],
      secondary: ['फ्री कन्वर्टर', 'मोबाइल टूल्स', 'डेटा सेविंग'],
      longtail: ['ऑनलाइन इमेज कैसे कन्वर्ट करें', 'बेस्ट फ्री कन्वर्टर', 'मोबाइल इमेज एडिटर']
    }
  },

  'RU': {
    tone: 'technical',
    style: 'comprehensive',
    topics: [
      'professional-image-processing',
      'quality-optimization-techniques',
      'advanced-conversion-methods',
      'batch-processing-guide',
      'format-comparison-analysis'
    ],
    keywords: {
      primary: ['конвертер изображений', 'обработка изображений', 'профессиональные инструменты'],
      secondary: ['качественная конвертация', 'пакетная обработка', 'форматы изображений'],
      longtail: ['как конвертировать изображения онлайн', 'лучший бесплатный конвертер', 'профессиональная обработка фото']
    }
  }
};

export class ContentGenerator {
  constructor() {
    this.generatedContent = new Map();
    this.contentCalendar = [];
    this.seoOptimizer = new SEOContentOptimizer();
  }

  async generateArticle(config) {
    const { market, topic, template, targetKeywords } = config;
    const marketConfig = MARKET_CONTENT[market];
    const templateConfig = CONTENT_TEMPLATES[template];

    if (!marketConfig || !templateConfig) {
      throw new Error('Invalid market or template configuration');
    }

    const article = {
      id: `${market}-${topic}-${Date.now()}`,
      market,
      topic,
      template,
      title: this.generateTitle(topic, marketConfig, targetKeywords),
      description: this.generateDescription(topic, marketConfig),
      slug: this.generateSlug(topic),
      content: await this.generateContent(topic, templateConfig, marketConfig, targetKeywords),
      keywords: targetKeywords,
      readingTime: 0,
      createdAt: Date.now()
    };

    // Calcular tiempo de lectura
    article.readingTime = Math.ceil(article.content.split(' ').length / 200);

    // Optimizar SEO
    const optimizedArticle = await this.seoOptimizer.optimize(article);

    this.generatedContent.set(article.id, optimizedArticle);
    return optimizedArticle;
  }

  generateTitle(topic, marketConfig, keywords) {
    const titleTemplates = {
      'US': [
        'How to {action} in 2024: Complete Guide',
        'Best {tools} for {purpose} - Expert Review',
        '{number} Essential Tips for {action}',
        'Ultimate Guide to {topic}: Everything You Need to Know'
      ],
      'IN': [
        '{topic} के लिए संपूर्ण गाइड 2024',
        'बेस्ट {tools} {purpose} के लिए',
        '{action} कैसे करें - स्टेप बाई स्टेप गाइड',
        '{number} जरूरी टिप्स {topic} के लिए'
      ],
      'RU': [
        'Как {action} в 2024 году: Полное руководство',
        'Лучшие {tools} для {purpose} - Обзор экспертов',
        '{number} важных советов для {action}',
        'Полное руководство по {topic}: Все что нужно знать'
      ]
    };

    const templates = titleTemplates[marketConfig.language] || titleTemplates['US'];
    const template = templates[Math.floor(Math.random() * templates.length)];

    return template
      .replace('{action}', this.topicToAction(topic))
      .replace('{tools}', 'Tools')
      .replace('{purpose}', 'Productivity')
      .replace('{topic}', this.formatTopic(topic))
      .replace('{number}', Math.floor(Math.random() * 5) + 5);
  }

  generateDescription(topic, marketConfig) {
    const descTemplates = {
      'US': [
        'Learn everything about {topic} with our comprehensive guide. Step-by-step instructions, expert tips, and best practices included.',
        'Discover the best methods for {topic}. Our detailed tutorial covers all aspects with practical examples and actionable advice.',
        'Master {topic} with our expert guide. Get professional results with these proven techniques and insider tips.'
      ],
      'IN': [
        '{topic} के बारे में सब कुछ सीखें हमारी विस्तृत गाइड के साथ। स्टेप-बाई-स्टेप निर्देश और एक्सपर्ट टिप्स शामिल।',
        '{topic} के लिए बेस्ट तरीके जानें। हमारा डिटेल्ड ट्यूटोरियल प्रैक्टिकल उदाहरणों के साथ सब कुछ कवर करता है।'
      ],
      'RU': [
        'Изучите все о {topic} с нашим подробным руководством. Пошаговые инструкции, советы экспертов и лучшие практики.',
        'Откройте для себя лучшие методы {topic}. Наш детальный учебник охватывает все аспекты с практическими примерами.'
      ]
    };

    const templates = descTemplates[marketConfig.language] || descTemplates['US'];
    const template = templates[Math.floor(Math.random() * templates.length)];

    return template.replace('{topic}', this.formatTopic(topic));
  }

  generateSlug(topic) {
    return topic.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  async generateContent(topic, templateConfig, marketConfig, keywords) {
    const sections = [];

    for (const sectionType of templateConfig.structure) {
      const sectionContent = await this.generateSection(sectionType, topic, marketConfig, keywords);
      sections.push(sectionContent);
    }

    let content = sections.join('\n\n');

    // Optimizar densidad de keywords
    content = this.optimizeKeywordDensity(content, keywords, templateConfig.keywordDensity);

    return content;
  }

  async generateSection(sectionType, topic, marketConfig, keywords) {
    const generators = {
      'introduction': () => this.generateIntroduction(topic, marketConfig, keywords),
      'overview': () => this.generateOverview(topic, marketConfig),
      'requirements': () => this.generateRequirements(topic, marketConfig),
      'step-by-step': () => this.generateStepByStep(topic, marketConfig),
      'tips': () => this.generateTips(topic, marketConfig),
      'troubleshooting': () => this.generateTroubleshooting(topic, marketConfig),
      'conclusion': () => this.generateConclusion(topic, marketConfig, keywords),
      'comparison-table': () => this.generateComparisonTable(topic, marketConfig),
      'checklist': () => this.generateChecklist(topic, marketConfig)
    };

    const generator = generators[sectionType];
    return generator ? generator() : this.generateGenericSection(sectionType, topic, marketConfig);
  }

  generateIntroduction(topic, marketConfig, keywords) {
    const intros = {
      'US': `## Introduction

In today's digital landscape, ${this.formatTopic(topic)} has become increasingly important for businesses and individuals alike. Whether you're a professional looking to streamline your workflow or someone who simply wants to get things done more efficiently, understanding the ins and outs of ${keywords[0]} is crucial.

This comprehensive guide will walk you through everything you need to know about ${this.formatTopic(topic)}, from the basics to advanced techniques. By the end of this article, you'll have the knowledge and tools necessary to master this essential skill.

### What You'll Learn

- Fundamental concepts and principles
- Step-by-step implementation guide
- Best practices and expert tips
- Common pitfalls and how to avoid them
- Advanced techniques for optimal results`,

      'IN': `## परिचय

आज के डिजिटल युग में, ${this.formatTopic(topic)} व्यवसायों और व्यक्तियों के लिए बेहद महत्वपूर्ण हो गया है। चाहे आप एक प्रोफेशनल हों जो अपने काम को बेहतर बनाना चाहते हैं या कोई व्यक्ति जो सिर्फ चीजों को अधिक कुशलता से करना चाहता है, ${keywords[0]} को समझना बहुत जरूरी है।

यह विस्तृत गाइड आपको ${this.formatTopic(topic)} के बारे में सब कुछ सिखाएगी, बेसिक्स से लेकर एडवांस तकनीकों तक। इस आर्टिकल के अंत तक, आपके पास इस जरूरी स्किल को मास्टर करने के लिए आवश्यक ज्ञान और टूल्स होंगे।

### आप क्या सीखेंगे

- मूलभूत अवधारणाएं और सिद्धांत
- स्टेप-बाई-स्टेप इम्प्लीमेंटेशन गाइड
- बेस्ट प्रैक्टिसेज और एक्सपर्ट टिप्स
- सामान्य गलतियां और उनसे कैसे बचें
- बेहतरीन परिणामों के लिए एडवांस तकनीकें`
    };

    return intros[marketConfig.language] || intros['US'];
  }

  generateStepByStep(topic, marketConfig) {
    const steps = {
      'US': `## Step-by-Step Guide

Follow these detailed steps to achieve professional results:

### Step 1: Preparation and Setup

Before you begin, ensure you have all the necessary tools and resources ready. This preparation phase is crucial for success.

- Gather all required materials
- Set up your workspace
- Check system requirements
- Create backups if necessary

### Step 2: Initial Configuration

Configure your settings for optimal performance:

- Adjust quality settings based on your needs
- Select appropriate output formats
- Set up batch processing if needed
- Configure advanced options

### Step 3: Processing and Implementation

Now it's time to execute the main process:

- Upload or select your files
- Apply the chosen settings
- Monitor the progress
- Verify the results

### Step 4: Quality Control and Optimization

Ensure your results meet your standards:

- Review the output quality
- Make adjustments if necessary
- Test in different environments
- Document your settings for future use

### Step 5: Final Steps and Cleanup

Complete the process with these final actions:

- Save your work in appropriate locations
- Clean up temporary files
- Update your documentation
- Share or distribute as needed`,

      'IN': `## स्टेप-बाई-स्टेप गाइड

प्रोफेशनल परिणाम पाने के लिए इन विस्तृत स्टेप्स को फॉलो करें:

### स्टेप 1: तैयारी और सेटअप

शुरू करने से पहले, सुनिश्चित करें कि आपके पास सभी आवश्यक टूल्स और रिसोर्सेज तैयार हैं।

- सभी जरूरी मैटेरियल्स इकट्ठा करें
- अपना वर्कस्पेस सेट करें
- सिस्टम रिक्वायरमेंट्स चेक करें
- जरूरत हो तो बैकअप बनाएं

### स्टेप 2: शुरुआती कॉन्फ़िगरेशन

बेहतरीन परफॉर्मेंस के लिए अपनी सेटिंग्स कॉन्फ़िगर करें:

- अपनी जरूरतों के अनुसार क्वालिटी सेटिंग्स एडजस्ट करें
- उपयुक्त आउटपुट फॉर्मेट्स सेलेक्ट करें
- जरूरत हो तो बैच प्रोसेसिंग सेट करें
- एडवांस ऑप्शन्स कॉन्फ़िगर करें`
    };

    return steps[marketConfig.language] || steps['US'];
  }

  generateTips(topic, marketConfig) {
    const tips = {
      'US': `## Pro Tips and Best Practices

Here are expert recommendations to help you achieve the best results:

💡 **Tip 1: Always Test First**
Before processing large batches, test with a small sample to ensure your settings are correct.

💡 **Tip 2: Optimize for Your Use Case**
Different scenarios require different approaches. Tailor your settings to match your specific needs.

💡 **Tip 3: Keep Backups**
Always maintain copies of your original files before making any modifications.

💡 **Tip 4: Monitor Performance**
Keep an eye on system resources and processing times to optimize your workflow.

💡 **Tip 5: Stay Updated**
Regularly update your tools and knowledge to take advantage of new features and improvements.

### Common Mistakes to Avoid

- Skipping the preparation phase
- Using inappropriate quality settings
- Not testing before bulk processing
- Ignoring system limitations
- Forgetting to backup original files`,

      'IN': `## प्रो टिप्स और बेस्ट प्रैक्टिसेज

बेहतरीन परिणाम पाने के लिए एक्सपर्ट सुझाव:

💡 **टिप 1: हमेशा पहले टेस्ट करें**
बड़े बैच प्रोसेस करने से पहले, छोटे सैंपल के साथ टेस्ट करें।

💡 **टिप 2: अपने यूज केस के लिए ऑप्टिमाइज़ करें**
अलग-अलग स्थितियों में अलग-अलग तरीकों की जरूरत होती है।

💡 **टिप 3: बैकअप रखें**
कोई भी बदलाव करने से पहले हमेशा अपनी ओरिजिनल फाइलों का कॉपी रखें।

💡 **टिप 4: परफॉर्मेंस मॉनिटर करें**
अपने वर्कफ़्लो को ऑप्टिमाइज़ करने के लिए सिस्टम रिसोर्सेज पर नज़र रखें।

### बचने योग्य सामान्य गलतियां

- तैयारी के चरण को छोड़ना
- गलत क्वालिटी सेटिंग्स का उपयोग
- बल्क प्रोसेसिंग से पहले टेस्ट न करना
- सिस्टम की सीमाओं को नज़रअंदाज़ करना`
    };

    return tips[marketConfig.language] || tips['US'];
  }

  generateConclusion(topic, marketConfig, keywords) {
    const conclusions = {
      'US': `## Conclusion

Mastering ${this.formatTopic(topic)} is an essential skill in today's digital world. By following the comprehensive guide outlined above, you now have the knowledge and tools necessary to achieve professional results consistently.

### Key Takeaways

- Understanding the fundamentals is crucial for success
- Proper preparation saves time and prevents errors
- Regular practice leads to improved efficiency
- Staying updated with best practices ensures optimal results

### Next Steps

Now that you've learned the essentials of ${keywords[0]}, consider exploring more advanced techniques and tools. Continue practicing with different scenarios to build your expertise and confidence.

Remember, the key to success is consistent application of these principles combined with continuous learning and adaptation to new technologies and methods.

**Ready to get started?** Try our free ${keywords[0]} tool and put your new knowledge into practice today!`,

      'IN': `## निष्कर्ष

आज की डिजिटल दुनिया में ${this.formatTopic(topic)} में महारत हासिल करना एक जरूरी स्किल है। ऊपर दी गई विस्तृत गाइड को फॉलो करके, अब आपके पास लगातार प्रोफेशनल परिणाम पाने के लिए आवश्यक ज्ञान और टूल्स हैं।

### मुख्य बातें

- सफलता के लिए बुनियादी बातों को समझना जरूरी है
- सही तैयारी समय बचाती है और गलतियों से बचाती है
- नियमित अभ्यास से दक्षता में सुधार होता है
- बेस्ट प्रैक्टिसेज के साथ अपडेट रहना बेहतरीन परिणाम सुनिश्चित करता है

### अगले कदम

अब जब आपने ${keywords[0]} की जरूरी बातें सीख ली हैं, तो अधिक एडवांस तकनीकों और टूल्स को एक्सप्लोर करने पर विचार करें।

**शुरू करने के लिए तैयार हैं?** हमारे फ्री ${keywords[0]} टूल को ट्राई करें और अपने नए ज्ञान को आज ही प्रैक्टिस में लाएं!`
    };

    return conclusions[marketConfig.language] || conclusions['US'];
  }

  generateComparisonTable(topic, marketConfig) {
    return `## Comparison Table

| Feature | Option A | Option B | Option C |
|---------|----------|----------|----------|
| **Speed** | Fast | Medium | Slow |
| **Quality** | High | Medium | High |
| **Ease of Use** | Easy | Medium | Hard |
| **Cost** | Free | Paid | Free |
| **Features** | Basic | Advanced | Comprehensive |
| **Support** | Community | Professional | Documentation |

### Our Recommendation

Based on our comprehensive analysis, **Option A** offers the best balance of speed, quality, and ease of use for most users. While it may have fewer advanced features than other options, its simplicity and effectiveness make it ideal for both beginners and professionals.`;
  }

  generateChecklist(topic, marketConfig) {
    const checklists = {
      'US': `## Quick Reference Checklist

Use this checklist to ensure you don't miss any important steps:

### Before You Start
- [ ] Gather all necessary files and resources
- [ ] Check system requirements
- [ ] Create backups of original files
- [ ] Set up your workspace

### During Processing
- [ ] Verify input file formats
- [ ] Configure quality settings
- [ ] Monitor system performance
- [ ] Check progress regularly

### After Completion
- [ ] Review output quality
- [ ] Test results in target environment
- [ ] Save files in appropriate locations
- [ ] Clean up temporary files
- [ ] Document settings used

### Quality Assurance
- [ ] Compare with original files
- [ ] Test functionality
- [ ] Verify file integrity
- [ ] Check compatibility`,

      'IN': `## त्वरित संदर्भ चेकलिस्ट

यह सुनिश्चित करने के लिए इस चेकलिस्ट का उपयोग करें कि आप कोई महत्वपूर्ण स्टेप न छोड़ें:

### शुरू करने से पहले
- [ ] सभी आवश्यक फाइलें और रिसोर्सेज इकट्ठा करें
- [ ] सिस्टम रिक्वायरमेंट्स चेक करें
- [ ] ओरिजिनल फाइलों का बैकअप बनाएं
- [ ] अपना वर्कस्पेस सेट करें

### प्रोसेसिंग के दौरान
- [ ] इनपुट फाइल फॉर्मेट्स वेरिफाई करें
- [ ] क्वालिटी सेटिंग्स कॉन्फ़िगर करें
- [ ] सिस्टम परफॉर्मेंस मॉनिटर करें
- [ ] प्रोग्रेस नियमित रूप से चेक करें`
    };

    return checklists[marketConfig.language] || checklists['US'];
  }

  optimizeKeywordDensity(content, keywords, targetDensity) {
    const words = content.split(' ');
    const wordCount = words.length;
    
    keywords.forEach(keyword => {
      const currentCount = (content.match(new RegExp(keyword, 'gi')) || []).length;
      const targetCount = Math.ceil(wordCount * targetDensity);
      
      if (currentCount < targetCount) {
        content = this.addKeywordNaturally(content, keyword, targetCount - currentCount);
      }
    });

    return content;
  }

  addKeywordNaturally(content, keyword, count) {
    const sentences = content.split('. ');
    let addedCount = 0;
    
    for (let i = 0; i < sentences.length && addedCount < count; i++) {
      if (!sentences[i].toLowerCase().includes(keyword.toLowerCase())) {
        // Agregar keyword de forma natural
        const words = sentences[i].split(' ');
        const insertPosition = Math.floor(words.length / 2);
        words.splice(insertPosition, 0, keyword);
        sentences[i] = words.join(' ');
        addedCount++;
      }
    }

    return sentences.join('. ');
  }

  topicToAction(topic) {
    const actionMap = {
      'image-conversion': 'convert images',
      'file-optimization': 'optimize files',
      'batch-processing': 'process files in batches',
      'format-conversion': 'convert file formats'
    };
    
    return actionMap[topic] || topic.replace('-', ' ');
  }

  formatTopic(topic) {
    return topic.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  generateGenericSection(sectionType, topic, marketConfig) {
    return `## ${this.formatTopic(sectionType)}

This section covers important aspects of ${this.formatTopic(topic)} that you should consider.

Content for ${sectionType} would be generated here based on the specific requirements and market configuration.`;
  }
}

class SEOContentOptimizer {
  async optimize(article) {
    // Optimizar headers
    article.content = this.optimizeHeaders(article.content);
    
    // Agregar enlaces internos
    article.content = this.addInternalLinks(article.content);
    
    // Generar meta tags
    article.metaTags = this.generateMetaTags(article);
    
    // Calcular métricas SEO
    article.seoMetrics = this.calculateSEOMetrics(article);
    
    return article;
  }

  optimizeHeaders(content) {
    // Asegurar estructura H2/H3 correcta
    const lines = content.split('\n');
    let inCodeBlock = false;
    
    return lines.map(line => {
      if (line.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        return line;
      }
      
      if (inCodeBlock) return line;
      
      // Optimizar headers
      if (line.startsWith('## ') && line.length > 50) {
        return line.substring(0, 47) + '...';
      }
      
      return line;
    }).join('\n');
  }

  addInternalLinks(content) {
    const internalPages = [
      { url: '/converter', anchor: 'image converter', relevance: 0.9 },
      { url: '/editor', anchor: 'image editor', relevance: 0.8 },
      { url: '/viewer', anchor: 'PDF viewer', relevance: 0.7 },
      { url: '/tools', anchor: 'online tools', relevance: 0.6 }
    ];

    let linkedContent = content;
    
    internalPages.forEach(page => {
      const regex = new RegExp(`\\b${page.anchor}\\b`, 'gi');
      if (Math.random() < page.relevance && linkedContent.match(regex)) {
        linkedContent = linkedContent.replace(regex, `[${page.anchor}](${page.url})`);
      }
    });

    return linkedContent;
  }

  generateMetaTags(article) {
    return {
      title: article.title,
      description: article.description,
      keywords: article.keywords.join(', '),
      'og:title': article.title,
      'og:description': article.description,
      'og:type': 'article',
      'twitter:card': 'summary_large_image'
    };
  }

  calculateSEOMetrics(article) {
    const wordCount = article.content.split(' ').length;
    const keywordDensity = this.calculateKeywordDensity(article.content, article.keywords);
    const readabilityScore = this.calculateReadabilityScore(article.content);
    
    return {
      wordCount,
      keywordDensity,
      readabilityScore,
      headerCount: (article.content.match(/^#{2,3}\s/gm) || []).length,
      internalLinks: (article.content.match(/\[.*?\]\(\/.*?\)/g) || []).length
    };
  }

  calculateKeywordDensity(content, keywords) {
    const words = content.toLowerCase().split(' ');
    const totalWords = words.length;
    
    return keywords.map(keyword => {
      const keywordCount = words.filter(word => word.includes(keyword.toLowerCase())).length;
      return {
        keyword,
        count: keywordCount,
        density: (keywordCount / totalWords) * 100
      };
    });
  }

  calculateReadabilityScore(content) {
    // Simplified readability calculation
    const sentences = content.split(/[.!?]+/).length;
    const words = content.split(' ').length;
    const avgWordsPerSentence = words / sentences;
    
    // Simple scoring: lower is better (easier to read)
    return Math.max(0, 100 - (avgWordsPerSentence * 2));
  }
}

export const initializeContentGenerator = () => {
  const generator = new ContentGenerator();
  window.contentGenerator = generator;
  return generator;
};

export default ContentGenerator;
