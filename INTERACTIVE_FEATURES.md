# Interactive Features Guide

Complete guide to interactive UI components that enhance user engagement.

## Overview

The site includes 6 interactive component categories:
- ✅ Scroll to Top Button
- ✅ Copy to Clipboard
- ✅ Toast Notifications
- ✅ Modal Dialogs
- ✅ Tooltips
- ✅ Accordions

---

## Components

### 1. Scroll to Top Button

Appears after scrolling down, smoothly scrolls back to top.

```tsx
import { ScrollToTop } from '@/components/ui/interactive/ScrollToTop';

// In your layout or page
<ScrollToTop showAfter={300} />
```

**Props:**
- `showAfter`: Pixels scrolled before showing (default: 300)
- `className`: Additional CSS classes
3
**Features:**
- Smooth scroll animation
- Hover scale effect
- Automatically hides at top
- Performance optimized with throttling

---

### 2. Copy to Clipboard

Copy text with visual feedback.

#### Basic Copy Button

```tsx
import { CopyButton } from '@/components/ui/interactive/CopyButton';

<CopyButton
  text="https://gladly.com/demo"
  label="Copy Link"
  successMessage="Link Copied!"
  variant="default" // or "minimal"
/>
```

#### Minimal Variant

```tsx
<CopyButton
  text={code}
  variant="minimal"
/>
```

#### Code Block with Copy

```tsx
import { CodeBlock } from '@/components/ui/interactive/CopyButton';

<CodeBlock
  code={`const hello = "world";`}
  language="javascript"
/>
```

**Features:**
- Visual feedback on copy
- Minimal and default variants
- Automatic timeout
- Code block integration
- Hover-to-show on code blocks

---

### 3. Toast Notifications

Non-intrusive notifications for user feedback.

#### Setup

Wrap your app with ToastProvider:

```tsx
import { ToastProvider } from '@/components/ui/interactive/Toast';

export default function RootLayout({ children }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}
```

#### Usage

```tsx
import { useToast } from '@/components/ui/interactive/Toast';

function MyComponent() {
  const { showToast } = useToast();

  const handleAction = () => {
    showToast('Action completed!', 'success', 3000);
  };

  return <button onClick={handleAction}>Do Something</button>;
}
```

**Types:**
- `success`: Green, checkmark icon
- `error`: Red, X icon
- `info`: Blue, info icon
- `warning`: Orange, warning icon

**Features:**
- Auto-dismiss with configurable duration
- Manual close button
- Stacks multiple toasts
- Smooth animations
- Accessible

---

### 4. Modal Dialogs

Accessible modal dialogs with overlay.

#### Basic Modal

```tsx
import { Modal, ModalFooter } from '@/components/ui/interactive/Modal';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
        size="md" // sm, md, lg, xl, full
      >
        <p>Modal content goes here</p>

        <ModalFooter>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

#### Confirm Dialog

```tsx
import { ConfirmDialog } from '@/components/ui/interactive/Modal';

<ConfirmDialog
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  onConfirm={handleDelete}
  title="Delete Item"
  message="Are you sure you want to delete this item? This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  variant="danger" // danger, warning, info
/>
```

**Features:**
- Prevents body scroll when open
- Escape key to close
- Click overlay to close (configurable)
- Multiple sizes
- Accessible with ARIA attributes
- Smooth animations

**Sizes:**
- `sm`: 28rem max-width
- `md`: 32rem max-width (default)
- `lg`: 42rem max-width
- `xl`: 56rem max-width
- `full`: Full width with margin

---

### 5. Tooltips

Show helpful information on hover.

#### Basic Tooltip

```tsx
import { Tooltip } from '@/components/ui/interactive/Tooltip';

<Tooltip content="This is helpful information" position="top">
  <button>Hover me</button>
</Tooltip>
```

#### Info Tooltip Icon

```tsx
import { InfoTooltip } from '@/components/ui/interactive/Tooltip';

<div>
  Feature Name <InfoTooltip content="Additional information about this feature" />
</div>
```

**Props:**
- `content`: Tooltip text/content
- `position`: 'top' | 'bottom' | 'left' | 'right'
- `delay`: Delay before showing (default: 200ms)

**Features:**
- Smart positioning
- Configurable delay
- Arrow indicator
- Automatic cleanup
- Accessible

---

### 6. Accordions

Expandable/collapsible content sections.

#### Multiple Items Accordion

```tsx
import { Accordion } from '@/components/ui/interactive/Accordion';

const items = [
  {
    id: '1',
    title: 'What is Gladly?',
    content: <p>Gladly is a customer service platform...</p>,
    defaultOpen: true,
  },
  {
    id: '2',
    title: 'How does pricing work?',
    content: <p>Our pricing is based on...</p>,
  },
  {
    id: '3',
    title: 'Can I integrate with my CRM?',
    content: <p>Yes, Gladly integrates with...</p>,
  },
];

<Accordion
  items={items}
  allowMultiple={false} // Only one open at a time
/>
```

#### Single Accordion Item

```tsx
import { AccordionItem } from '@/components/ui/interactive/Accordion';

<AccordionItem title="Click to expand" defaultOpen={false}>
  <p>Content that can be shown/hidden</p>
</AccordionItem>
```

**Features:**
- Single or multiple open items
- Smooth expand/collapse animation
- Default open state
- Keyboard accessible
- Responsive

---

## Common Use Cases

### Copy API Endpoint

```tsx
<div>
  <h3>API Endpoint</h3>
  <code>https://api.gladly.com/v1/tickets</code>
  <CopyButton
    text="https://api.gladly.com/v1/tickets"
    variant="minimal"
  />
</div>
```

### Confirmation Before Deletion

```tsx
const [showConfirm, setShowConfirm] = useState(false);
const { showToast } = useToast();

const handleDelete = async () => {
  await deleteItem();
  showToast('Item deleted successfully', 'success');
};

<>
  <button onClick={() => setShowConfirm(true)}>Delete</button>

  <ConfirmDialog
    isOpen={showConfirm}
    onClose={() => setShowConfirm(false)}
    onConfirm={handleDelete}
    title="Delete Item"
    message="Are you sure?"
    variant="danger"
  />
</>
```

### Help Icons with Tooltips

```tsx
<div className="flex items-center gap-2">
  <label>Advanced Settings</label>
  <InfoTooltip content="These settings are for advanced users only" />
</div>
```

### FAQ Section

```tsx
const faqs = [
  {
    id: '1',
    title: 'How do I get started?',
    content: <p>Follow these steps...</p>,
  },
  // ... more FAQs
];

<Accordion items={faqs} allowMultiple={true} />
```

### Success/Error Feedback

```tsx
const { showToast } = useToast();

const handleSubmit = async () => {
  try {
    await submitForm();
    showToast('Form submitted successfully!', 'success');
  } catch (error) {
    showToast('Failed to submit form', 'error');
  }
};
```

---

## Animations

These components use custom CSS animations. Ensure you have the following in your global CSS:

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-down {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 1000px;
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out;
}
```

---

## Best Practices

### Toasts

**Do:**
- Use for non-critical feedback
- Keep messages short and clear
- Auto-dismiss after 3-5 seconds
- Use appropriate types (success, error, etc.)

**Don't:**
- Use for critical errors (use Modal instead)
- Stack too many toasts
- Use for complex content

### Modals

**Do:**
- Use for important actions requiring user attention
- Provide clear action buttons
- Allow escape key to close
- Focus trap within modal

**Don't:**
- Use for simple notifications (use Toast)
- Nest modals within modals
- Make modals too large

### Tooltips

**Do:**
- Keep content brief
- Use for helpful hints
- Position intelligently
- Add slight delay before showing

**Don't:**
- Use for critical information
- Put interactive elements in tooltips
- Make tooltips too large

### Accordions

**Do:**
- Use for FAQ sections
- Group related content
- Provide clear section titles
- Consider default open states

**Don't:**
- Nest accordions deeply
- Use for short content that fits on page
- Hide critical information

---

## Accessibility

All components follow accessibility best practices:

- ✅ Keyboard navigation support
- ✅ ARIA attributes
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ Escape key support
- ✅ Semantic HTML

---

## Component Locations

```
components/ui/interactive/
├── ScrollToTop.tsx
├── CopyButton.tsx (+ CodeBlock)
├── Toast.tsx (+ ToastProvider, useToast)
├── Modal.tsx (+ ModalFooter, ConfirmDialog)
├── Tooltip.tsx (+ InfoTooltip)
└── Accordion.tsx (+ AccordionItem)
```

---

## Need Help?

- Check existing components for examples
- Review accessibility guidelines
- Test on mobile devices
- Contact the development team

