export const SAMPLE_DATA = {
  businesses: [
    {
      id: 'biz_1',
      name: 'David West Photography',
      url: 'https://davidwestphotography.co.uk',
      industry: 'Wedding Photography',
      type: 'Local Service',
      location: 'North East UK',
      targetRegion: 'Tyne & Wear, Durham, Northumberland',
      mainProduct: 'Wedding Photography',
      mainOffer: 'Natural, relaxed wedding photography for modern couples',
      usp: 'No awkward posing, just real moments captured expertly',
      priceRange: '£995 – £2,200',
      brandTone: 'Friendly, Professional, Authentic',
      targetCustomer: 'Couples looking for natural and relaxed wedding memories',
      description: 'Documentary style wedding photographer based in the North East, specializing in candid moments and beautiful lighting.',
      isDefault: true
    },
    {
      id: 'biz_2',
      name: 'NorthFix Plumbing',
      url: 'https://northfixplumbing.co.uk',
      industry: 'Home Services',
      type: 'Local Service',
      location: 'Newcastle, UK',
      targetRegion: 'Newcastle, Gateshead, Sunderland',
      mainProduct: 'Emergency Plumbing & Boiler Repair',
      mainOffer: '24/7 emergency plumbing with no call-out charge',
      usp: 'Gas Safe Registered, no call-out charge, same day service',
      priceRange: '£80 – £500',
      brandTone: 'Trustworthy, Fast, No-Nonsense',
      targetCustomer: 'Homeowners with urgent plumbing problems',
      description: 'Fast, reliable emergency plumber covering Newcastle and surrounds. Gas safe registered with over 15 years experience.',
      isDefault: false
    },
    {
      id: 'biz_3',
      name: 'Momentum Fitness Studio',
      url: 'https://momentumfitness.co.uk',
      industry: 'Health & Fitness',
      type: 'Local Business',
      location: 'Leeds, UK',
      targetRegion: 'Leeds, Bradford, Harrogate',
      mainProduct: 'Personal Training & Group Classes',
      mainOffer: 'Personalised fitness plans with certified coaches',
      usp: 'Transformation-focused training with real accountability',
      priceRange: '£40 – £120/month',
      brandTone: 'Motivational, Energetic, Supportive',
      targetCustomer: 'Adults who want lasting fitness results, not just gym access',
      description: 'Boutique fitness studio in Leeds offering personal training, small group sessions, and 28-day transformation programmes.',
      isDefault: false
    }
  ],
  campaigns: [
    {
      id: 'cmp_1',
      businessId: 'biz_1',
      name: 'Summer 2024 Wedding Bookings',
      objective: 'Bookings',
      audience: {
        idealCustomer: 'Engaged couples getting married in 2024/2025',
        searchingFor: 'Natural wedding photographer North East',
        problem: 'Afraid of cheesy, staged wedding photos',
        result: 'Stunning photos that tell the true story of the day',
        hesitation: 'Budget and being uncomfortable in front of the camera',
        choice: 'Personal service and proven track record of candid shots',
        tone: 'Warm and reassuring',
        action: 'Check availability'
      },
      offer: {
        main: 'Full day wedding photography',
        price: 'From £995',
        incentive: 'Free engagement shoot with every booking',
        guarantee: '100% satisfaction or reshoot',
        urgency: 'Limited 2024 dates remaining'
      },
      keywords: [
        { phrase: 'wedding photographer north east', intent: 'high', score: 95 },
        { phrase: 'relaxed wedding photography Newcastle', intent: 'high', score: 90 },
        { phrase: 'documentary wedding photographer', intent: 'medium', score: 85 },
        { phrase: 'candid wedding photographer Durham', intent: 'high', score: 88 }
      ],
      headlines: [
        'Relaxed Wedding Photographer NE',
        'Natural & Authentic Photography',
        'Check Availability For 2024',
        '5-Star Rated Professional',
        'Book Your Consultation Call'
      ],
      descriptions: [
        'Capturing natural, relaxed wedding moments without awkward posing. Book your 2024 date today.',
        'Trusted North East wedding photographer. High-quality candid shots you\'ll treasure forever.'
      ],
      adStrength: 8,
      status: 'ready',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'cmp_2',
      businessId: 'biz_2',
      name: 'Emergency Plumber Newcastle',
      objective: 'Leads',
      audience: {
        idealCustomer: 'Homeowners with burst pipes or broken boilers',
        searchingFor: 'Emergency plumber Newcastle same day',
        problem: 'Flooded home, no hot water, broken heating',
        result: 'Problem fixed quickly with no hassle',
        hesitation: 'High call out charges and unreliable tradesmen',
        choice: 'Transparent pricing, Gas Safe certified, fast response',
        tone: 'Urgent and reassuring',
        action: 'Call Now'
      },
      offer: {
        main: '24/7 Emergency Plumbing',
        price: 'From £80',
        incentive: 'No call-out charge',
        guarantee: 'Fixed or it\'s free',
        urgency: '30-minute response available'
      },
      keywords: [
        { phrase: 'emergency plumber Newcastle', intent: 'high', score: 97 },
        { phrase: 'boiler repair Newcastle', intent: 'high', score: 90 },
        { phrase: 'local plumber near me', intent: 'high', score: 92 },
        { phrase: '24 hour plumber', intent: 'medium', score: 85 }
      ],
      headlines: [
        '24/7 Emergency Plumber Newcastle',
        'No Call-Out Charge - Gas Safe',
        'Boiler Repairs From £80',
        'Same Day Plumber Available',
        'Fixed Or It\'s Free Guarantee'
      ],
      descriptions: [
        '30-minute response, Gas Safe certified. Emergency plumbing, boilers, leaks. No call-out charge. Call Now.',
        'Trusted Newcastle plumber covering all emergencies. Transparent pricing, fast arrivals. Book online.'
      ],
      adStrength: 9,
      status: 'ready',
      lastUpdated: new Date().toISOString()
    }
  ],
  templates: [
    {
      id: 'tpl_1',
      name: 'Premium Local Plumber',
      category: 'Home Services',
      industry: 'Home Improvement',
      audience: 'Homeowners with urgent plumbing issues',
      commonKeywords: ['emergency plumber', 'local plumber near me', 'boiler repair'],
      adAngles: ['Fast response', 'No call out charge', 'Gas safe registered'],
      headlines: [
        '24/7 Emergency Plumber',
        'No Call-Out Charge',
        'Gas Safe Certified'
      ],
      descriptions: [
        'Fast, reliable emergency plumber. No call-out charge. Gas Safe registered. Call us now for same-day service.',
        'Trusted local plumber available 24/7. Transparent pricing, fully certified. Book your appointment today.'
      ]
    },
    {
      id: 'tpl_2',
      name: 'Wedding Photographer',
      category: 'Photography',
      industry: 'Events & Entertainment',
      audience: 'Engaged couples planning their wedding',
      commonKeywords: ['wedding photographer', 'wedding photography near me', 'candid wedding photographer'],
      adAngles: ['Natural style', 'Award winning', 'Limited dates'],
      headlines: [
        'Natural Wedding Photography',
        'Award Winning Photographer',
        'Book Your 2024 Date Now'
      ],
      descriptions: [
        'Capturing authentic moments on your special day. Natural, relaxed style. Limited 2024 dates available.',
        'Trusted wedding photographer with 5-star reviews. Beautiful candid shots. View our portfolio and book now.'
      ]
    },
    {
      id: 'tpl_3',
      name: 'Personal Trainer',
      category: 'Health & Fitness',
      industry: 'Fitness',
      audience: 'Adults looking to lose weight or get fit',
      commonKeywords: ['personal trainer near me', 'personal training', 'fitness coach'],
      adAngles: ['Results guaranteed', 'Online & in-person', 'Free consultation'],
      headlines: [
        'Personal Trainer Near You',
        'Real Results Guaranteed',
        'Free Consultation Today'
      ],
      descriptions: [
        'Personalised fitness plans with certified coaches. Lose weight, build strength, feel amazing. Book your free trial.',
        'Transform your body in 28 days. Online and in-person personal training. Start your journey today.'
      ]
    },
    {
      id: 'tpl_4',
      name: 'Local Restaurant',
      category: 'Food & Drink',
      industry: 'Hospitality',
      audience: 'Locals looking for dining options',
      commonKeywords: ['restaurant near me', 'best restaurant in [city]', 'book a table'],
      adAngles: ['Fresh ingredients', 'Easy booking', 'Special offers'],
      headlines: [
        'Book a Table Tonight',
        'Fresh Local Ingredients',
        'Special Offer This Week'
      ],
      descriptions: [
        'Award-winning dining experience with seasonal menus. Easy online booking available. Reserve your table today.',
        'Fresh, locally sourced food in a warm atmosphere. Family-friendly. Book online or call us direct.'
      ]
    },
    {
      id: 'tpl_5',
      name: 'Solicitor / Law Firm',
      category: 'Legal Services',
      industry: 'Legal',
      audience: 'People needing legal advice or representation',
      commonKeywords: ['solicitor near me', 'family law solicitor', 'employment law advice'],
      adAngles: ['Free initial consultation', 'No win no fee', 'Experienced team'],
      headlines: [
        'Expert Solicitors Near You',
        'Free Initial Consultation',
        'No Win No Fee Available'
      ],
      descriptions: [
        'Specialist solicitors offering expert legal advice across family, employment and commercial law. Free first consultation.',
        'Experienced legal team with 20+ years practice. No win no fee options available. Call us today.'
      ]
    }
  ]
};
