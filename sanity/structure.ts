import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('GTM Hub')
    .items([
      // ========================================
      // CONTENT CREATION (Priority Section)
      // ========================================
      S.listItem()
        .title('➕ Create New Content')
        .child(
          S.list()
            .title('Create New Content')
            .items([
              S.listItem()
                .title('📚 Content Hub Card')
                .child(
                  S.documentList()
                    .title('Content Hub Cards')
                    .filter('_type == "catalogEntry" && "content" in publishedTo')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                    .initialValueTemplates([
                      S.initialValueTemplateItem('catalogEntry-content-hub'),
                    ])
                ),
              S.listItem()
                .title('📺 Training Session')
                .child(
                  S.documentList()
                    .title('Training Sessions')
                    .filter('_type == "catalogEntry" && pageTemplate == "training"')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                    .initialValueTemplates([
                      S.initialValueTemplateItem('catalogEntry-training'),
                    ])
                ),
              S.listItem()
                .title('📋 Playbook / How-To')
                .child(
                  S.documentList()
                    .title('Playbooks')
                    .filter('_type == "catalogEntry" && pageTemplate == "playbook"')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                    .initialValueTemplates([
                      S.initialValueTemplateItem('catalogEntry-playbook'),
                    ])
                ),
              S.listItem()
                .title('⚔️ Battle Card')
                .child(
                  S.documentList()
                    .title('Battle Cards')
                    .filter('_type == "catalogEntry" && pageTemplate == "battle-card"')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                    .initialValueTemplates([
                      S.initialValueTemplateItem('catalogEntry-battle-card'),
                    ])
                ),
            ])
        ),

      S.divider(),

      // ========================================
      // ALL CATALOG CONTENT
      // ========================================
      S.listItem()
        .title('📚 All Catalog Content')
        .child(
          S.documentList()
            .title('All Catalog Content')
            .filter('_type == "catalogEntry"')
            .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
        ),

      // ========================================
      // QUICK VIEWS
      // ========================================
      S.listItem()
        .title('👀 Quick Views')
        .child(
          S.list()
            .title('Quick Views')
            .items([
              S.listItem()
                .title('⭐ Featured Content')
                .child(
                  S.documentList()
                    .title('Featured Content')
                    .filter('_type == "catalogEntry" && featured == true')
                    .defaultOrdering([{ field: 'priority', direction: 'desc' }])
                ),
              S.listItem()
                .title('🆕 Recently Updated')
                .child(
                  S.documentList()
                    .title('Recently Updated')
                    .filter('_type == "catalogEntry"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('📝 Drafts')
                .child(
                  S.documentList()
                    .title('Draft Content')
                    .filter('_type == "catalogEntry" && status == "draft"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('✅ Published')
                .child(
                  S.documentList()
                    .title('Published Content')
                    .filter('_type == "catalogEntry" && status == "published"')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),
            ])
        ),

      // ========================================
      // BY HUB
      // ========================================
      S.listItem()
        .title('🎯 By Hub')
        .child(
          S.list()
            .title('Content by Hub')
            .items([
              S.listItem()
                .title('📚 Content Hub')
                .child(
                  S.documentList()
                    .title('Content Hub Items')
                    .filter('_type == "catalogEntry" && "content" in publishedTo')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('🎓 Enablement Hub')
                .child(
                  S.documentList()
                    .title('Enablement Hub Items')
                    .filter('_type == "catalogEntry" && "enablement" in publishedTo')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),
            ])
        ),

      // ========================================
      // BY TEMPLATE TYPE
      // ========================================
      S.listItem()
        .title('📄 By Template')
        .child(
          S.list()
            .title('Content by Template')
            .items([
              S.listItem()
                .title('📺 Training Sessions')
                .child(
                  S.documentList()
                    .title('Training Sessions')
                    .filter('_type == "catalogEntry" && pageTemplate == "training"')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('📋 Playbooks')
                .child(
                  S.documentList()
                    .title('Playbooks')
                    .filter('_type == "catalogEntry" && pageTemplate == "playbook"')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('⚔️ Battle Cards')
                .child(
                  S.documentList()
                    .title('Battle Cards')
                    .filter('_type == "catalogEntry" && pageTemplate == "battle-card"')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),
            ])
        ),

      S.divider(),

      // ========================================
      // TAXONOMIES
      // ========================================
      S.listItem()
        .title('🏷️ Taxonomies')
        .child(
          S.list()
            .title('Taxonomies & Classifications')
            .items([
              S.listItem()
                .title('🎓 Learning Paths')
                .child(
                  S.documentList()
                    .title('Learning Paths')
                    .filter('_type == "learningPath"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('👥 Audiences')
                .child(
                  S.documentList()
                    .title('Audiences')
                    .filter('_type == "audience"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('📦 Products')
                .child(
                  S.documentList()
                    .title('Products')
                    .filter('_type == "product"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('📂 Content Types')
                .child(
                  S.documentList()
                    .title('Content Types')
                    .filter('_type == "contentType"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('👥 Teams')
                .child(
                  S.documentList()
                    .title('Teams')
                    .filter('_type == "team"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('💬 Topics')
                .child(
                  S.documentList()
                    .title('Topics')
                    .filter('_type == "topic"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('🛤️ Journey Stages')
                .child(
                  S.documentList()
                    .title('Journey Stages')
                    .filter('_type == "journeyStage"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('🏭 Industries')
                .child(
                  S.documentList()
                    .title('Industries')
                    .filter('_type == "industry"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('⚔️ Competitors')
                .child(
                  S.documentList()
                    .title('Competitors')
                    .filter('_type == "competitor"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
            ])
        ),

      S.divider(),

      // ========================================
      // LEGACY & SITE CONTENT
      // ========================================
      S.listItem()
        .title('📄 Legacy Content')
        .child(
          S.list()
            .title('Legacy Content')
            .items([
              S.listItem()
                .title('Enablement Articles (Legacy)')
                .child(
                  S.documentList()
                    .title('Enablement Articles')
                    .filter('_type == "enablementArticle"')
                    .defaultOrdering([{ field: 'publishedDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('Training Sessions')
                .child(
                  S.documentList()
                    .title('Training Sessions')
                    .filter('_type == "trainingSession"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.listItem()
                .title('Templates')
                .child(
                  S.documentList()
                    .title('Templates')
                    .filter('_type == "templateResource"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.listItem()
                .title('Content Resources')
                .child(
                  S.documentList()
                    .title('Content Resources')
                    .filter('_type == "contentResource"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.listItem()
                .title('Competitive Resources')
                .child(
                  S.documentList()
                    .title('Competitive Resources')
                    .filter('_type == "competitiveResource"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
            ])
        ),

      S.divider(),

      // ========================================
      // SITE MANAGEMENT
      // ========================================
      S.listItem()
        .title('🌐 Site Management')
        .child(
          S.list()
            .title('Site Management')
            .items([
              S.listItem()
                .title('🧭 Navigation')
                .child(
                  S.document()
                    .schemaType('navigation')
                    .documentId('navigation')
                ),
              S.listItem()
                .title('🏠 Homepage')
                .child(
                  S.document()
                    .schemaType('homepage')
                    .documentId('homepage')
                ),
              S.listItem()
                .title('🎯 Hub Pages')
                .child(
                  S.documentList()
                    .title('Hub Pages')
                    .filter('_type == "hubPage"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.listItem()
                .title('📄 All Pages')
                .child(
                  S.documentTypeList('page')
                    .title('All Pages')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.listItem()
                .title('📝 Blog Posts')
                .child(
                  S.documentTypeList('post')
                    .title('Blog Posts')
                ),
              S.listItem()
                .title('⚙️ Site Settings')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
            ])
        ),
    ])
