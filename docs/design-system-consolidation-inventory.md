# Minerva and Mochi component inventory

Captured 2026-10-23 from user-supplied Figma screenshots and a local Minerva code inventory. This is a starting point for consolidation, not an equivalence or implementation audit.

## Evidence boundaries

- Mochi: two screenshots show different portions of the Figma page list.
- Minerva: the original two screenshots duplicate the portion from Alert through Radio. A subsequent screenshot adds the lower portion through Tooltip. This records all visible entries, without assuming the full Figma file has been captured.
- Page names do not establish component anatomy, variants, interaction behavior, accessibility, or implementation readiness.
- Local code presence means an implementation exists; it does not establish Figma parity or production readiness. A component can exist locally without being exported from the package.

## Mochi Figma pages, as supplied

- Action Bar
- Accordion
- Alerts
- Avatars
- Badges
- Buttons & Text Links
- Breadcrumbs
- Calendar
- Cards
- Carousel
- Chip
- Data Table
- Checkboxes & Radio Buttons
- Dialog
- Dropdowns & Combobox
- Empty State
- File Upload
- Icons & Illustrations
- Input Fields
- Map Pins
- Pagination
- Progress Bar
- Separator
- Sheet
- Skeleton
- Spinner
- Stepper
- Switch
- Tabs
- Text Area
- Toggle Group
- Tooltips & Popovers
- Top Navigation + Menu

## Minerva Figma pages visible in supplied screenshots

- Alert
- Breadcrumb
- Button
- Checkbox
- Collapse
- Data List
- Drawer
- Dropdown Menu
- File Upload
- Global Header + Action Bar
- Message
- Icon
- Illustration
- Input
- Logo
- Modal
- Orderable List
- Radio
- Panel
- Separator
- Sidebar
- Tab
- Table
- Tag, Badge, Lozenge
- Task Flyout
- Tooltip

## Candidate mappings

Mappings below identify what to inspect together. They do not imply that the components should be merged unchanged.

| Component family | Mochi Figma | Minerva Figma, visible portion | Local Minerva implementation candidates |
| --- | --- | --- | --- |
| Actions | Buttons & Text Links | Button | Button, ButtonGroup |
| Action bar | Action Bar | Global Header + Action Bar | ActionBar |
| Navigation header | Top Navigation + Menu | Global Header + Action Bar | GlobalHeader |
| Breadcrumbs | Breadcrumbs | Breadcrumb | Breadcrumb |
| Expand/collapse | Accordion | Collapse | Collapse; check grouping and keyboard behavior |
| Inline feedback | Alerts | Alert; Message | Message, Notification; distinguish inline messages from notifications |
| Text inputs | Input Fields; Text Area | Input | Input, PasswordInput, SearchInput, Textarea, FieldWrapper |
| Selection controls | Checkboxes & Radio Buttons | Checkbox; Radio | Checkbox, Radio |
| Menus and selection | Dropdowns & Combobox | Dropdown Menu | Dropdown, MultiSelectDropdown, MenuPanel and menu parts; separate menu, select, and combobox behavior |
| Modal dialog | Dialog | Modal | Modal, ModalContent |
| Side overlay | Sheet | Drawer | No dedicated implementation identified in scanned component folders |
| Containers | Cards | Panel | No dedicated Panel/Card implementation identified; compare anatomy and intended use |
| Side navigation | No standalone page visible | Sidebar | SideNav and its parts; compare with Mochi navigation requirements |
| Chips and status indicators | Chip; Badges | Tag, Badge, Lozenge | Chip, Badge, Tag, Lozenge; inspect meaning before consolidating |
| Tables | Data Table | Table | Table and cell components; do not equate Minerva Data List with a table without inspecting it |
| Pagination | Pagination | Not visible | Pagination, currently grouped under Table |
| Separators | Separator | Separator | Divider |
| Loading indicator | Spinner | Not visible | Spinner |
| Steps | Stepper | Not visible | Steps |
| Tabs | Tabs | Tab | TabSet, Tab |
| Contextual help | Tooltips & Popovers | Tooltip | Tooltip, TooltipBubble; dedicated Popover not identified |
| Assets | Icons & Illustrations | Icon; Illustration; Logo | Icon; asset coverage requires a separate audit |
| File upload | File Upload | File Upload | No dedicated implementation identified in scanned component folders |

## Items requiring more evidence

Mochi pages without a clear local Minerva counterpart in this initial scan: Avatars, Calendar, Carousel, Empty State, Map Pins, Progress Bar, Skeleton, Switch, Toggle Group. These names are not visible in the supplied Minerva screenshots. Cards has a candidate Figma counterpart in Panel, but equivalence is unverified. Pagination, Spinner, and Stepper have local code candidates despite lacking visible Minerva Figma pages.

Minerva pages without a confirmed Mochi equivalent: Data List, Orderable List, Sidebar, Task Flyout, Logo as a standalone page, and the distinction between Alert and Message. Mochi's navigation and asset pages may cover Sidebar and Logo requirements; this has not been verified. Task Flyout requires inspection before deciding whether it is a reusable overlay or a product-specific composition.

Additional local Minerva implementations without a clear standalone page in the supplied lists include AppLayout, Text, MetaItem, DocumentViewer, JudiAssistant, AIRecommendationCard, ClinicalCriteriaTab, and KeyCaseDetails. Review these separately to determine whether they are foundations, reusable components, or product-specific compositions.

## Next comparison

Inspect Button, Input, and Modal/Dialog in both Figma systems. Record anatomy, variants, sizes, states, keyboard/focus behavior, and visual values. Classify each difference as a theme token difference, an intentional shared design change, a behavioral variant, or a separate composition. Only then define the shared API and component-token contract.
