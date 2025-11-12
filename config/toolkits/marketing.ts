export const marketingToolkitData = {
  hero: {
    title: 'Marketing Toolkit',
    subtitle: 'Content, campaigns, and creative resources to drive awareness and pipeline',
    gradient: 'purple' as const,
  },

  sections: [
    {
      key: 'quick-access',
      icon: '⚡',
      title: 'Quick Access',
      subtitle: 'Your most-used resources and active campaigns',
      backgroundColor: 'gray' as const,
      gridCols: 4,
      type: 'quick-links' as const,
      items: [
        { icon: '🎨', title: 'Brand Guidelines' },
        { icon: '📊', title: 'Marketing Dashboard' },
        { icon: '📸', title: 'Asset Library' },
        { icon: '🗓️', title: 'Campaign Calendar' }
      ]
    },
    {
      key: 'campaigns',
      icon: '🚀',
      title: 'Campaigns & Programs',
      subtitle: 'Active campaigns and marketing program resources',
      backgroundColor: 'white' as const,
      gridCols: 3,
      type: 'resources' as const,
      items: [
        { title: 'Active Campaign Hub', desc: 'Current campaigns, messaging, and go-to-market assets' },
        { title: 'Land Grab Campaign', desc: 'Materials for the Land Grab AI growth initiative' },
        { title: 'Project 500 Materials', desc: 'Resources supporting 500% YoY AI growth initiative' },
        { title: 'Demand Gen Programs', desc: 'Lead generation campaigns, webinars, and nurture tracks' },
        { title: 'ABM Campaign Materials', desc: 'Account-based marketing plays and personalized content' },
        { title: 'Partner Marketing', desc: 'Co-marketing materials and partner program resources' }
      ]
    },
    {
      key: 'content',
      icon: '✍️',
      title: 'Content & Messaging',
      subtitle: 'Messaging frameworks, content library, and storytelling resources',
      backgroundColor: 'gray' as const,
      gridCols: 3,
      type: 'resources' as const,
      items: [
        { title: 'Messaging Framework', desc: 'Core positioning, value props, and Outcomes Velocity narrative' },
        { title: 'Content Library', desc: 'Blog posts, whitepapers, case studies, and thought leadership' },
        { title: 'Customer Stories', desc: 'Case studies, testimonials, and success story templates' },
        { title: 'Product Messaging', desc: 'Positioning and messaging for each product line' },
        { title: 'Industry Content', desc: 'Vertical-specific messaging for retail, beauty, travel, healthcare' },
        { title: 'Thought Leadership', desc: 'Executive content, research reports, and industry insights' }
      ]
    },
    {
      key: 'templates',
      icon: '🛠️',
      title: 'Templates & Tools',
      subtitle: 'Ready-to-use templates for marketing execution',
      backgroundColor: 'white' as const,
      gridCols: 3,
      type: 'resources' as const,
      items: [
        { title: 'Email Templates', desc: 'Nurture sequences, event invites, and promotional email templates' },
        { title: 'Landing Page Templates', desc: 'Campaign landing pages, signup forms, and conversion pages' },
        { title: 'Social Media Templates', desc: 'LinkedIn, Twitter/X templates and content calendar' },
        { title: 'Presentation Templates', desc: 'Webinar decks, event presentations, and speaking templates' },
        { title: 'One-Pager Templates', desc: 'Product sheets, solution briefs, and sales collateral templates' },
        { title: 'Video Scripts', desc: 'Product demo scripts, customer testimonial guides, and video briefs' }
      ]
    },
    {
      key: 'brand',
      icon: '🎨',
      title: 'Brand & Creative Assets',
      subtitle: 'Logos, design guidelines, and creative resources',
      backgroundColor: 'gray' as const,
      gridCols: 2,
      type: 'resources' as const,
      items: [
        { title: 'Brand Guidelines', desc: 'Complete brand guide including logo usage, colors, typography, and voice' },
        { title: 'Logo & Asset Library', desc: 'Company logos, product logos, icons, and brand marks in all formats' },
        { title: 'Photography & Imagery', desc: 'Brand photography, product shots, and stock image library' },
        { title: 'Design Templates', desc: 'Figma templates, presentation masters, and design systems' }
      ]
    },
    {
      key: 'events',
      icon: '🎤',
      title: 'Events & Webinars',
      subtitle: 'Event marketing materials and webinar resources',
      backgroundColor: 'white' as const,
      gridCols: 3,
      type: 'resources' as const,
      items: [
        { title: 'Event Marketing Kit', desc: 'Pre-event, during-event, and post-event marketing materials' },
        { title: 'Webinar Playbook', desc: 'End-to-end guide for planning and executing webinars' },
        { title: 'Trade Show Materials', desc: 'Booth design, swag, collateral, and pre-show campaigns' },
        { title: 'Virtual Event Platform', desc: 'Setup guides and best practices for virtual events' },
        { title: 'Speaker Resources', desc: 'Speaker briefs, talking points, and presentation tips' },
        { title: 'Event Calendar', desc: 'Upcoming events, speaking opportunities, and sponsorships' }
      ]
    },
    {
      key: 'analytics',
      icon: '📊',
      title: 'Analytics & Reporting',
      subtitle: 'Marketing metrics, dashboards, and performance tracking',
      backgroundColor: 'gray' as const,
      gridCols: 2,
      type: 'resources' as const,
      items: [
        { title: 'Marketing Dashboard', desc: 'Real-time metrics on campaigns, pipeline, and attribution' },
        { title: 'Campaign Performance', desc: 'Track engagement, conversion, and ROI by campaign' },
        { title: 'Website Analytics', desc: 'Traffic sources, page performance, and conversion analysis' },
        { title: 'Lead Quality Metrics', desc: 'MQL-to-SQL conversion, lead scoring, and attribution reporting' }
      ]
    }
  ],
};
