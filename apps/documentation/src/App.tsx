import { useState, type ComponentType } from 'react'
import { AppLayout, Button, ButtonGroup, SideNavGroup, SideNavItem } from '@judi-health/minerva-ds'
import { TypographySection } from './sections/TypographySection'
import { ColorsSection } from './sections/ColorsSection'
import { SpacingSection } from './sections/SpacingSection'
import { RadiusSection } from './sections/RadiusSection'
import { ButtonSection } from './sections/ButtonSection'
import { ChipSection } from './sections/ChipSection'
import { CheckboxSection } from './sections/CheckboxSection'
import { RadioSection } from './sections/RadioSection'
import { InputSection } from './sections/InputSection'
import { TextareaSection } from './sections/TextareaSection'
import { DropdownSection } from './sections/DropdownSection'
import { NotificationSection } from './sections/NotificationSection'
import { CollapseSection } from './sections/CollapseSection'
import { TooltipSection } from './sections/TooltipSection'
import { MessageSection } from './sections/MessageSection'
import { AlertSection } from './sections/AlertSection'
import { ModalSection } from './sections/ModalSection'
import { TagBadgeSection } from './sections/TagBadgeSection'
import { PanelSection } from './sections/PanelSection'
import { TabsSection } from './sections/TabsSection'
import { StepperSection } from './sections/StepperSection'
import { TableSection } from './sections/TableSection'
import { JudiAssistantSection } from './sections/JudiAssistantSection'
import { KeyCaseDetailsSection } from './sections/KeyCaseDetailsSection'
import { DocumentViewerSection } from './sections/DocumentViewerSection'

type Theme = 'minerva' | 'evolution'

const NAV_GROUPS: { label: string; sections: Record<string, ComponentType> }[] = [
  {
    label: 'Foundations',
    sections: { Typography: TypographySection, Colors: ColorsSection, Spacing: SpacingSection, Radius: RadiusSection },
  },
  {
    label: 'Actions',
    sections: { Button: ButtonSection, Chip: ChipSection },
  },
  {
    label: 'Form Controls',
    sections: { Checkbox: CheckboxSection, Radio: RadioSection, Input: InputSection, Textarea: TextareaSection, Dropdown: DropdownSection },
  },
  {
    label: 'Content & Feedback',
    sections: { Alert: AlertSection, Panel: PanelSection, Notification: NotificationSection, Collapse: CollapseSection, Tooltip: TooltipSection, Message: MessageSection, Modal: ModalSection, 'Tag & Badge': TagBadgeSection },
  },
  {
    label: 'Navigation & Data',
    sections: { Tabs: TabsSection, Stepper: StepperSection, Table: TableSection },
  },
  {
    label: 'Patterns',
    sections: { 'Judi Assistant': JudiAssistantSection, 'Key Case Details': KeyCaseDetailsSection, 'Document Viewer': DocumentViewerSection },
  },
]

const SECTIONS: Record<string, ComponentType> = Object.assign({}, ...NAV_GROUPS.map((group) => group.sections))

export default function App() {
  const [activeSection, setActiveSection] = useState('Typography')
  const [theme, setTheme] = useState<Theme>('minerva')

  const switchTheme = (t: Theme) => {
    setTheme(t)
    document.documentElement.setAttribute('data-theme', t)
  }

  const ActiveSection = SECTIONS[activeSection]

  return (
    <AppLayout
      variant={theme}
      appName="Minerva Design System"
      headerActions={
        <ButtonGroup>
          {(['minerva', 'evolution'] as Theme[]).map((t) => (
            <Button
              key={t}
              variant="inverse"
              onClick={() => switchTheme(t)}
              style={theme === t ? { borderColor: 'var(--text-action-inverse-idle)' } : undefined}
            >
              {t}
            </Button>
          ))}
        </ButtonGroup>
      }
      breadcrumbs={[{ label: 'Documentation' }, { label: activeSection }]}
      sideNavContent={
        <div className="flex flex-col gap-(--stack-4)">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-(--space-4)">
              <SideNavGroup label={group.label} />
              {Object.keys(group.sections).map((section) => (
                <SideNavItem
                  key={section}
                  label={section}
                  onClick={() => setActiveSection(section)}
                  active={activeSection === section}
                />
              ))}
            </div>
          ))}
        </div>
      }
    >
      <ActiveSection />
    </AppLayout>
  )
}
