export default {
  name: 'videoSection',
  title: 'Video Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'videoType',
      title: 'Video Type',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'Loom', value: 'loom' },
          { title: 'Direct URL (MP4)', value: 'direct' },
        ],
        layout: 'radio',
      },
      initialValue: 'youtube',
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Full URL to the video (e.g., https://www.youtube.com/watch?v=...)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Custom Thumbnail (optional)',
      type: 'image',
      description: 'Override default video thumbnail',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9 (Widescreen)', value: '16:9' },
          { title: '4:3 (Standard)', value: '4:3' },
          { title: '1:1 (Square)', value: '1:1' },
        ],
      },
      initialValue: '16:9',
    },
    {
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'Automatically start playing when visible (muted)',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      videoUrl: 'videoUrl',
    },
    prepare({ heading, videoUrl }: any) {
      return {
        title: 'Video',
        subtitle: heading || videoUrl,
      };
    },
  },
}
