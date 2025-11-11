import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Homepage
      S.listItem()
        .title('Homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
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

      // Resources
      S.listItem()
        .title('Resources')
        .child(
          S.list()
            .title('Resources')
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
