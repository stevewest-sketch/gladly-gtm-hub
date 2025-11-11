import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'Main title for the website (used in browser tabs and SEO)',
      initialValue: 'GTM Hub - Gladly Revenue Enablement',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'Default description for SEO and social sharing',
      rows: 3,
      initialValue: 'Your central hub for selling, supporting, and growing with Gladly',
      validation: Rule => Rule.required().max(160),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'Full URL of your site (e.g., https://gladly-gtm-hub.vercel.app)',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Social Share Image',
      type: 'image',
      description: 'Default image shown when sharing links on social media (1200x630px recommended)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Small icon shown in browser tabs (square, 32x32px or larger)',
    }),
    defineField({
      name: 'brandColors',
      title: 'Brand Colors',
      type: 'object',
      fields: [
        {
          name: 'primary',
          title: 'Primary Color (Purple)',
          type: 'string',
          description: 'Hex code (e.g., #8C69F0)',
          initialValue: '#8C69F0',
        },
        {
          name: 'secondary',
          title: 'Secondary Color (Blue)',
          type: 'string',
          description: 'Hex code (e.g., #3B82F6)',
          initialValue: '#3B82F6',
        },
        {
          name: 'accent',
          title: 'Accent Color (Orange)',
          type: 'string',
          description: 'Hex code (e.g., #F97316)',
          initialValue: '#F97316',
        },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics & Tracking',
      type: 'object',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'GA4 Measurement ID (e.g., G-XXXXXXXXXX)',
        },
        {
          name: 'gtmId',
          title: 'Google Tag Manager ID',
          type: 'string',
          description: 'GTM Container ID (e.g., GTM-XXXXXX)',
        },
      ],
    }),
    defineField({
      name: 'maintenanceMode',
      title: 'Maintenance Mode',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Maintenance Mode',
          type: 'boolean',
          description: 'Show maintenance page to all visitors',
          initialValue: false,
        },
        {
          name: 'message',
          title: 'Maintenance Message',
          type: 'text',
          rows: 3,
          description: 'Message to show during maintenance',
        },
      ],
    }),
    defineField({
      name: 'announcement',
      title: 'Site-wide Announcement Bar',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Announcement',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'message',
          title: 'Announcement Message',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Link URL (optional)',
          type: 'url',
          validation: Rule => Rule.uri({ allowRelative: true }),
        },
        {
          name: 'linkText',
          title: 'Link Text',
          type: 'string',
        },
        {
          name: 'style',
          title: 'Style',
          type: 'string',
          options: {
            list: [
              { title: 'Info (Blue)', value: 'info' },
              { title: 'Success (Green)', value: 'success' },
              { title: 'Warning (Orange)', value: 'warning' },
              { title: 'Important (Purple)', value: 'important' },
            ],
          },
          initialValue: 'info',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Site Settings',
        subtitle: title,
      }
    },
  },
})
