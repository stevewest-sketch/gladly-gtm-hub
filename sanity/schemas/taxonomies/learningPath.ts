export default {
  name: 'learningPath',
  title: 'Learning Paths',
  type: 'document',
  description: 'Curated learning paths for the enablement hub (e.g., New Hire Onboarding, Product Mastery)',
  fields: [
    {
      name: 'name',
      title: 'Learning Path Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'e.g., "New Hire Onboarding", "Product Mastery"',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description shown under the learning path button',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji icon for the learning path button (e.g., 🎓, 🛠️, 💼)',
      validation: (Rule: any) => Rule.required().max(4),
      initialValue: '📚',
    },
    {
      name: 'color',
      title: 'Button Color',
      type: 'string',
      description: 'Tailwind background color class (e.g., bg-[#009B00], bg-[#3B82F6])',
      validation: (Rule: any) => Rule.required(),
      initialValue: 'bg-[#009B00]',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this learning path appears in the button navigation (lower numbers first)',
      initialValue: 50,
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      icon: 'icon',
    },
    prepare({ title, subtitle, icon }: any) {
      return {
        title: `${icon} ${title}`,
        subtitle,
      }
    },
  },
}
