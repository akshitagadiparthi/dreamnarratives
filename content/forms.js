// ---------------------------------------------------------------------------
// Enquiry forms. Each field's `label` is also its column name in the Google
// Sheet, so renaming a label creates a new column (the sheet script adds
// missing columns automatically; nothing breaks).
//
// Field types: text, email, tel, date, number, textarea, select,
// single (pick one chip), multi (pick several chips), checkbox.
// ⚠️ CONFIRM BEFORE LAUNCH: budget bands are suggestions; adjust to the
// studio's real pricing. All budgets are optional.
// ---------------------------------------------------------------------------

const occasions = ['Wedding', 'Engagement', 'Sangeet / Mehendi', 'Milestone birthday', 'Baby shower / naming', 'Corporate event', 'Festive', 'Other'];

export const sharedTop = [
  { label: 'Name', type: 'text', required: true, autoComplete: 'name', placeholder: 'Full name' },
  { label: 'Phone', type: 'tel', required: true, autoComplete: 'tel', placeholder: '+91', withWhatsapp: true },
  { label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@example.com' },
  { label: 'City', type: 'text', autoComplete: 'address-level2', placeholder: 'Where you are based' },
];

export const sharedBottom = [
  { label: 'Message', type: 'textarea', wide: true, placeholder: 'Tell us your dream. Anything you would like us to know.' },
  { label: 'How they heard of us', display: 'How did you hear of us?', type: 'select', options: ['Instagram', 'A friend or family', 'A wedding or event we designed for', 'Google', 'Other'] },
  { label: 'Preferred contact time', display: 'Best time to reach you', type: 'select', options: ['Morning', 'Afternoon', 'Evening', 'Any time'] },
];

export const forms = {
  invitation: {
    sheet: 'The Invitation',
    title: ['Begin with the', 'invitation.'],
    fields: [
      { label: 'Occasion', type: 'select', options: occasions, required: true },
      { label: 'Event date(s)', type: 'text', placeholder: 'e.g. 12–14 February 2027' },
      { label: 'Formats', display: 'What would you like?', type: 'multi', wide: true, options: ['E-invite', 'Video invite', 'Physical cards', 'Save-the-date', 'Invitation box', 'Event stationery'] },
      { label: 'Number of functions', type: 'number', placeholder: 'e.g. 4', min: 1 },
      { label: 'Guest count / print qty', display: 'Guests or print quantity', type: 'text', placeholder: 'e.g. 300 guests, 150 boxes' },
      { label: 'Languages', display: 'Languages on the card', type: 'text', placeholder: 'e.g. English, Telugu' },
      { label: 'Needed by', type: 'date' },
      { label: 'Style references', type: 'text', wide: true, placeholder: 'Pinterest or Instagram links, or a few words about the feel' },
      { label: 'Budget range', display: 'Budget (optional)', type: 'single', wide: true, options: ['Under ₹25,000', '₹25,000 – ₹75,000', '₹75,000 – ₹2,00,000', '₹2,00,000+', 'Let’s discuss'] },
    ],
  },
  gift: {
    sheet: 'The Gift',
    title: ['Let’s curate', 'the gift.'],
    fields: [
      { label: 'Occasion', type: 'select', options: occasions, required: true },
      { label: 'Number of hampers', type: 'number', placeholder: 'e.g. 120', min: 1 },
      { label: 'Delivery date', type: 'date' },
      { label: 'Delivery cities', type: 'text', placeholder: 'One city, or several addresses?' },
      { label: 'Contents preference', display: 'What should they hold?', type: 'multi', wide: true, options: ['Sweets & mithai', 'Dry fruits', 'Keepsakes', 'Wellness', 'Home & décor', 'Fully custom'] },
      { label: 'Personalisation', type: 'text', wide: true, placeholder: 'Names, monogram, a note for each guest…' },
      { label: 'Dietary notes', type: 'text', wide: true, placeholder: 'Allergies, Jain, sugar-free…' },
      { label: 'Budget per hamper', display: 'Budget per hamper (optional)', type: 'single', wide: true, options: ['Under ₹2,000', '₹2,000 – ₹5,000', '₹5,000 – ₹10,000', '₹10,000+', 'Let’s discuss'] },
    ],
  },
  identity: {
    sheet: 'The Identity',
    title: ['Shape your', 'identity.'],
    fields: [
      { label: 'Business name', type: 'text', required: true, autoComplete: 'organization' },
      { label: 'Industry', type: 'text', placeholder: 'e.g. Fashion, wellness, jewellery' },
      { label: 'What you need', display: 'What can we help with?', type: 'multi', wide: true, options: ['Logo & wordmark', 'Full brand identity', 'Packaging & stationery', 'Social media management', 'Content creation & shoots', 'Campaigns & launches', 'Not sure yet'] },
      { label: 'Stage', type: 'single', wide: true, options: ['Brand new', 'Rebrand', 'Refresh', 'Established, needs social'] },
      { label: 'Website / Instagram', type: 'text', placeholder: 'Links, if you have them' },
      { label: 'Current followers', type: 'select', options: ['Not on Instagram yet', 'Under 1,000', '1,000 – 10,000', '10,000 – 50,000', '50,000+'] },
      { label: 'Goals', display: 'What should it achieve?', type: 'multi', wide: true, options: ['Be recognised', 'A launch', 'Sales & enquiries', 'Community', 'A consistent look'] },
      { label: 'Start date', type: 'date' },
      { label: 'Budget range', display: 'Budget (optional)', type: 'single', wide: true, options: ['Under ₹50,000', '₹50,000 – ₹1,50,000', '₹1,50,000 – ₹3,00,000', '₹3,00,000+', 'Monthly retainer', 'Let’s discuss'] },
    ],
  },
  space: {
    sheet: 'The Space',
    title: ['Imagine', 'the space.'],
    fields: [
      { label: 'Property type', type: 'select', required: true, options: ['Residence', 'Villa', 'Apartment', 'Office', 'Retail', 'Hospitality', 'Other'] },
      { label: 'Scope', display: 'What are we designing?', type: 'single', wide: true, options: ['Full interiors', 'A single room', 'Styling', 'Architecture', 'Consultation'] },
      { label: 'Locality', type: 'text', placeholder: 'Locality and city' },
      { label: 'Area (sq ft)', display: 'Approximate area', type: 'text', placeholder: 'sq ft' },
      { label: 'Property status', type: 'select', options: ['Under construction', 'Ready to move in', 'Lived in, renovating'] },
      { label: 'Start date', display: 'Hoping to start', type: 'text', placeholder: 'Month, year' },
      { label: 'Floor plan link', type: 'text', placeholder: 'Google Drive or Dropbox link (optional)' },
      { label: 'Reference images', type: 'text', placeholder: 'Pinterest or Instagram links' },
      { label: 'Budget range', display: 'Budget (optional)', type: 'single', wide: true, options: ['Under ₹10L', '₹10L – ₹25L', '₹25L – ₹50L', '₹50L – ₹1Cr', '₹1Cr+', 'Let’s discuss'], help: 'Only a guide; every space is quoted individually.' },
    ],
  },
  bespoke: {
    sheet: 'Bespoke',
    title: ['Something', 'unique.'],
    fields: [
      { label: 'Project idea', display: 'What do you have in mind?', type: 'text', wide: true, required: true, placeholder: 'A commission, a collaboration, a personal project…' },
      { label: 'Timeline', type: 'text', placeholder: 'When would you like it?' },
      { label: 'Budget range', display: 'Budget (optional)', type: 'single', wide: true, options: ['Under ₹25,000', '₹25,000 – ₹75,000', '₹75,000 – ₹2,00,000', '₹2,00,000+', 'Let’s discuss'] },
    ],
  },
};

export const formOrder = ['invitation', 'gift', 'identity', 'space', 'bespoke'];
