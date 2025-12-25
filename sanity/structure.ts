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
                    .filter('_type == "catalogEntry" && pageTemplate == "training-session"')
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
                    .filter('_type == "catalogEntry" && pageTemplate == "play"')
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
                    .filter('_type == "catalogEntry" && pageTemplate == "training-session"')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('📋 Playbooks')
                .child(
                  S.documentList()
                    .title('Playbooks')
                    .filter('_type == "catalogEntry" && pageTemplate == "play"')
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
      // CoE HUB
      // ========================================
      S.listItem()
        .title('🎯 CoE Hub')
        .child(
          S.list()
            .title('Center of Excellence')
            .items([
              // Hub Settings (Singleton)
              S.listItem()
                .title('⚙️ Hub Settings')
                .child(
                  S.document()
                    .schemaType('coeHub')
                    .documentId('coeHub')
                    .title('CoE Hub Settings')
                ),

              S.divider(),

              // All Entries
              S.listItem()
                .title('📋 All Entries')
                .child(
                  S.documentList()
                    .title('All CoE Entries')
                    .filter('_type == "coeEntry"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                ),

              S.divider(),

              // By Entry Type
              S.listItem()
                .title('📋 Best Practices')
                .child(
                  S.documentList()
                    .title('Best Practices')
                    .filter('_type == "coeEntry" && entryType == "best-practice"')
                    .defaultOrdering([{ field: 'priority', direction: 'desc' }])
                ),
              S.listItem()
                .title('💡 Process Innovations')
                .child(
                  S.documentList()
                    .title('Process Innovations')
                    .filter('_type == "coeEntry" && entryType == "process-innovation"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('🏢 Internal Best Practices')
                .child(
                  S.documentList()
                    .title('Internal Best Practices')
                    .filter('_type == "coeEntry" && entryType == "internal-best-practice"')
                    .defaultOrdering([{ field: 'priority', direction: 'desc' }])
                ),
              S.listItem()
                .title('📊 Proof Points')
                .child(
                  S.list()
                    .title('Proof Points')
                    .items([
                      S.listItem()
                        .title('All Proof Points')
                        .child(
                          S.documentList()
                            .title('All Proof Points')
                            .filter('_type == "coeEntry" && entryType == "proof-point"')
                            .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                        ),
                      S.divider(),
                      S.listItem()
                        .title('📈 Stats')
                        .child(
                          S.documentList()
                            .title('Stats')
                            .filter('_type == "coeEntry" && entryType == "proof-point" && proofType == "stat"')
                        ),
                      S.listItem()
                        .title('💬 Anecdotes')
                        .child(
                          S.documentList()
                            .title('Anecdotes')
                            .filter('_type == "coeEntry" && entryType == "proof-point" && proofType == "anecdote"')
                        ),
                      S.listItem()
                        .title('🗣️ Quotes')
                        .child(
                          S.documentList()
                            .title('Quotes')
                            .filter('_type == "coeEntry" && entryType == "proof-point" && proofType == "quote"')
                        ),
                      S.listItem()
                        .title('📊 Benchmarks')
                        .child(
                          S.documentList()
                            .title('Benchmarks')
                            .filter('_type == "coeEntry" && entryType == "proof-point" && proofType == "benchmark"')
                        ),
                      S.listItem()
                        .title('📖 Case Studies')
                        .child(
                          S.documentList()
                            .title('Case Studies')
                            .filter('_type == "coeEntry" && entryType == "proof-point" && proofType == "case-study"')
                        ),
                    ])
                ),
              S.listItem()
                .title('🛠️ Tools & Calculators')
                .child(
                  S.documentList()
                    .title('Tools & Calculators')
                    .filter('_type == "coeEntry" && entryType == "tool"')
                    .defaultOrdering([{ field: 'priority', direction: 'desc' }])
                ),
              S.listItem()
                .title('📁 Meeting Assets')
                .child(
                  S.list()
                    .title('Meeting Assets')
                    .items([
                      S.listItem()
                        .title('All Meeting Assets')
                        .child(
                          S.documentList()
                            .title('All Meeting Assets')
                            .filter('_type == "coeEntry" && entryType == "meeting-asset"')
                            .defaultOrdering([{ field: 'deliveryDate', direction: 'desc' }])
                        ),
                      S.divider(),
                      S.listItem()
                        .title('Pre-Sales')
                        .child(
                          S.documentList()
                            .title('Pre-Sales Assets')
                            .filter('_type == "coeEntry" && entryType == "meeting-asset" && salesStage == "pre-sales"')
                        ),
                      S.listItem()
                        .title('Post-Sales')
                        .child(
                          S.documentList()
                            .title('Post-Sales Assets')
                            .filter('_type == "coeEntry" && entryType == "meeting-asset" && salesStage == "post-sales"')
                        ),
                    ])
                ),

              S.divider(),

              // By Status
              S.listItem()
                .title('📊 By Status')
                .child(
                  S.list()
                    .title('By Status')
                    .items([
                      S.listItem()
                        .title('📝 Drafts')
                        .child(
                          S.documentList()
                            .title('Drafts')
                            .filter('_type == "coeEntry" && status == "draft"')
                        ),
                      S.listItem()
                        .title('👀 In Review')
                        .child(
                          S.documentList()
                            .title('In Review')
                            .filter('_type == "coeEntry" && status == "in-review"')
                        ),
                      S.listItem()
                        .title('🚀 Published')
                        .child(
                          S.documentList()
                            .title('Published')
                            .filter('_type == "coeEntry" && status == "published"')
                        ),
                      S.listItem()
                        .title('🔄 Needs Update')
                        .child(
                          S.documentList()
                            .title('Needs Update')
                            .filter('_type == "coeEntry" && status == "needs-update"')
                        ),
                      S.listItem()
                        .title('📦 Archived')
                        .child(
                          S.documentList()
                            .title('Archived')
                            .filter('_type == "coeEntry" && status == "archived"')
                        ),
                    ])
                ),

              // Featured
              S.listItem()
                .title('⭐ Featured')
                .child(
                  S.documentList()
                    .title('Featured Entries')
                    .filter('_type == "coeEntry" && featured == true')
                ),

              S.divider(),

              // Taxonomy Management
              S.listItem()
                .title('🏷️ CoE Taxonomy')
                .child(
                  S.list()
                    .title('CoE Taxonomy')
                    .items([
                      S.listItem()
                        .title('📂 Sections')
                        .child(
                          S.documentList()
                            .title('Sections')
                            .filter('_type == "coeSection"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                      S.listItem()
                        .title('📱 Channels')
                        .child(
                          S.documentList()
                            .title('Channels')
                            .filter('_type == "coeChannel"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                      S.listItem()
                        .title('⚙️ Capabilities')
                        .child(
                          S.documentList()
                            .title('Capabilities')
                            .filter('_type == "coeCapability"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                      S.listItem()
                        .title('🏷️ Content Categories')
                        .child(
                          S.documentList()
                            .title('Content Categories')
                            .filter('_type == "coeContentCategory"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                      S.listItem()
                        .title('👥 Audiences')
                        .child(
                          S.documentList()
                            .title('Audiences')
                            .filter('_type == "coeAudience"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                      S.listItem()
                        .title('🏢 Industries')
                        .child(
                          S.documentList()
                            .title('Industries')
                            .filter('_type == "coeIndustry"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                      S.listItem()
                        .title('🔐 Permissions')
                        .child(
                          S.documentList()
                            .title('Permissions')
                            .filter('_type == "coePermission"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                      S.listItem()
                        .title('📁 Asset Types')
                        .child(
                          S.documentList()
                            .title('Asset Types')
                            .filter('_type == "coeAssetType"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),
                    ])
                ),
            ])
        ),

      S.divider(),

      // ========================================
      // COLLECTIONS (Hub Organization)
      // ========================================
      S.listItem()
        .title('📁 Collections')
        .child(
          S.list()
            .title('Collections')
            .items([
              S.listItem()
                .title('📚 All Collections')
                .child(
                  S.documentList()
                    .title('All Collections')
                    .filter('_type == "collection"')
                    .defaultOrdering([{ field: 'hub', direction: 'asc' }, { field: 'order', direction: 'asc' }])
                ),
              S.divider(),
              S.listItem()
                .title('🎓 Enablement Hub Collections')
                .child(
                  S.documentList()
                    .title('Enablement Hub Collections')
                    .filter('_type == "collection" && hub == "enablement"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('🏆 CoE Hub Collections')
                .child(
                  S.documentList()
                    .title('CoE Hub Collections')
                    .filter('_type == "collection" && hub == "coe"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('📚 Content Hub Collections')
                .child(
                  S.documentList()
                    .title('Content Hub Collections')
                    .filter('_type == "collection" && hub == "content"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
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
