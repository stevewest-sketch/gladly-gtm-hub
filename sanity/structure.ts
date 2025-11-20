import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Navigation
      S.listItem()
        .title('🧭 Navigation')
        .child(
          S.document()
            .schemaType('navigation')
            .documentId('navigation')
        ),

      S.divider(),

      // Homepage
      S.listItem()
        .title('Homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),

      S.divider(),

      // Hub Pages
      S.listItem()
        .title('🎯 Hub Pages')
        .child(
          S.documentList()
            .title('Hub Pages')
            .filter('_type == "hubPage"')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),

      S.divider(),

      // Products Section
      S.listItem()
        .title('Products')
        .child(
          S.documentList()
            .title('Product Pages')
            .filter('_type == "page" && slug.current match "sidekick-*" || slug.current match "customer-ai" || slug.current match "guides-and-journeys" || slug.current match "app-platform"')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),

      S.divider(),

      // Center of Excellence (COE)
      S.listItem()
        .title('Center of Excellence')
        .child(
          S.documentList()
            .title('COE Pages')
            .filter('_type == "page" && slug.current match "coe*"')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),

      S.divider(),

      // Enablement
      S.listItem()
        .title('Enablement')
        .child(
          S.list()
            .title('Enablement')
            .items([
              S.listItem()
                .title('Toolkits')
                .child(
                  S.documentList()
                    .title('Toolkit Pages')
                    .filter('_type == "page" && slug.current match "enablement/toolkits*"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.listItem()
                .title('Training')
                .child(
                  S.documentList()
                    .title('Training Sessions')
                    .filter('_type == "trainingSession"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.listItem()
                .title('Enablement Articles')
                .child(
                  S.documentList()
                    .title('Enablement Articles')
                    .filter('_type == "enablementArticle"')
                    .defaultOrdering([{ field: 'publishedDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('Other Pages')
                .child(
                  S.documentList()
                    .title('Enablement Pages')
                    .filter('_type == "page" && slug.current match "enablement*" && !(slug.current match "enablement/toolkits*")')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
            ])
        ),

      S.divider(),

      // 📚 Universal Catalog System
      S.listItem()
        .title('📚 Universal Catalog')
        .child(
          S.list()
            .title('Universal Catalog System')
            .items([
              // Catalog Entries (Main Content)
              S.listItem()
                .title('📖 All Catalog Entries')
                .child(
                  S.documentList()
                    .title('All Catalog Entries')
                    .filter('_type == "catalogEntry"')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),

              S.divider(),

              // Quick Views
              S.listItem()
                .title('⭐ Featured Content')
                .child(
                  S.documentList()
                    .title('Featured Content')
                    .filter('_type == "catalogEntry" && featured == true')
                    .defaultOrdering([{ field: 'priority', direction: 'desc' }])
                ),
              S.listItem()
                .title('🆕 Recently Published (30 days)')
                .child(
                  S.documentList()
                    .title('Recently Published')
                    .filter('_type == "catalogEntry" && publishDate > $thirtyDaysAgo')
                    .params({ thirtyDaysAgo: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() })
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('📝 Draft Content')
                .child(
                  S.documentList()
                    .title('Draft Content')
                    .filter('_type == "catalogEntry" && status == "draft"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                ),

              S.divider(),

              // By Content Type
              S.listItem()
                .title('🎓 Training & Workshops')
                .child(
                  S.documentList()
                    .title('Training & Workshops')
                    .filter('_type == "catalogEntry" && contentType->slug.current in ["training", "workshop", "webinar"]')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('📄 Templates & Decks')
                .child(
                  S.documentList()
                    .title('Templates & Decks')
                    .filter('_type == "catalogEntry" && contentType->slug.current in ["template", "deck", "one-pager"]')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('⚔️ Competitive / Battle Cards')
                .child(
                  S.documentList()
                    .title('Competitive / Battle Cards')
                    .filter('_type == "catalogEntry" && contentType->slug.current in ["competitive", "battle-card"]')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),

              S.divider(),

              // By Hub
              S.listItem()
                .title('🎖️ COE Hub Content')
                .child(
                  S.documentList()
                    .title('COE Hub Content')
                    .filter('_type == "catalogEntry" && defined(coeCategory) && count(coeCategory) > 0')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('📊 Sales Hub Content')
                .child(
                  S.documentList()
                    .title('Sales Hub Content')
                    .filter('_type == "catalogEntry" && defined(salesCategory) && count(salesCategory) > 0')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),

              S.divider(),

              // Taxonomies
              S.listItem()
                .title('🏷️ Taxonomies')
                .child(
                  S.list()
                    .title('Taxonomies & Classifications')
                    .items([
                      S.listItem()
                        .title('Content Types')
                        .child(
                          S.documentList()
                            .title('Content Types')
                            .filter('_type == "contentType"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                      S.listItem()
                        .title('Products')
                        .child(
                          S.documentList()
                            .title('Products')
                            .filter('_type == "product"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                      S.listItem()
                        .title('Teams')
                        .child(
                          S.documentList()
                            .title('Teams')
                            .filter('_type == "team"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                      S.listItem()
                        .title('Topics')
                        .child(
                          S.documentList()
                            .title('Topics')
                            .filter('_type == "topic"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                      S.listItem()
                        .title('Journey Stages')
                        .child(
                          S.documentList()
                            .title('Journey Stages')
                            .filter('_type == "journeyStage"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                      S.listItem()
                        .title('Industries')
                        .child(
                          S.documentList()
                            .title('Industries')
                            .filter('_type == "industry"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                      S.listItem()
                        .title('Competitors')
                        .child(
                          S.documentList()
                            .title('Competitors')
                            .filter('_type == "competitor"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                    ])
                ),
            ])
        ),

      S.divider(),

      // Resources (Legacy)
      S.listItem()
        .title('Resources (Legacy)')
        .child(
          S.list()
            .title('Legacy Resources')
            .items([
              S.listItem()
                .title('Templates')
                .child(
                  S.documentList()
                    .title('Templates')
                    .filter('_type == "templateResource"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.listItem()
                .title('Content')
                .child(
                  S.documentList()
                    .title('Content Resources')
                    .filter('_type == "contentResource"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.listItem()
                .title('Competitive')
                .child(
                  S.documentList()
                    .title('Competitive Resources')
                    .filter('_type == "competitiveResource"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
            ])
        ),

      S.divider(),

      // All Pages
      S.listItem()
        .title('All Pages')
        .child(
          S.documentTypeList('page')
            .title('All Pages')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),

      // Blog Posts
      S.listItem()
        .title('Blog Posts')
        .child(
          S.documentTypeList('post')
            .title('Blog Posts')
        ),

      S.divider(),

      // Settings
      S.listItem()
        .title('⚙️ Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('About')
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
        ),
      S.listItem()
        .title('Contact')
        .child(
          S.document()
            .schemaType('contact')
            .documentId('contact')
        ),
    ])
