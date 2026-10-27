import { useState } from 'react'
import { Text, Checkbox, Dropdown, MenuGroup, MenuItem, MenuSearchBar, MenuPanel, MultiSelectDropdown, Tooltip } from '@judi-health/minerva-ds'

export function DropdownSection() {
  const [required, setRequired] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)

  return (
    <div className="min-h-full">
      <Text as="h2" variant="heading-md" className="mb-(--stack-5) text-(--text-surface-base)">
        Dropdown
      </Text>

      <div className="flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Playground
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          Click the trigger to open it, then click an option — single-select closes automatically
          and updates the value, since none of these items have a checkbox.
        </Text>
        <div className="flex flex-wrap items-center gap-(--inline-4)">
          <Checkbox label="Required" checked={required} onChange={(e) => setRequired(e.target.checked)} />
          <Checkbox label="Tooltip" checked={showTooltip} onChange={(e) => setShowTooltip(e.target.checked)} />
          <Checkbox
            label="Instructions"
            checked={showInstructions}
            readOnly={invalid}
            onChange={(e) => setShowInstructions(e.target.checked)}
          />
          <Checkbox
            label="Invalid"
            checked={invalid}
            onChange={(e) => {
              const next = e.target.checked
              setInvalid(next)
              if (next) setShowInstructions(true)
            }}
          />
        </div>
        <div className="flex flex-wrap items-start gap-(--inline-4)">
          <div className="w-[280px] flex flex-col gap-(--stack-2)">
            <Text variant="label-sm" className="text-(--text-surface-subtle)">Dropdown</Text>
            <Dropdown
              label="Label"
              placeholder="Choose an option"
              value={selectedValue}
              onSelect={setSelectedValue}
              onClear={() => setSelectedValue(undefined)}
              required={required}
              tooltip={showTooltip ? 'Helpful context goes here' : undefined}
              instructions={showInstructions ? 'Helper text goes here' : undefined}
              invalid={invalid}
              searchBar={<MenuSearchBar placeholder="Search options" />}
            >
              <MenuGroup label="Section label" />
              <MenuItem label="Selected option" />
              <MenuItem label="Another option" />
              <MenuItem label="Delete option" destructive />
            </Dropdown>
          </div>
          <div className="w-[280px] flex flex-col gap-(--stack-2)">
            <Text variant="label-sm" className="text-(--text-surface-subtle)">Readonly</Text>
            <Dropdown label="Label" value="Can't be changed" readOnly />
          </div>
          <div className="w-[280px] flex flex-col gap-(--stack-2)">
            <Text variant="label-sm" className="text-(--text-surface-subtle)">Disabled</Text>
            <Dropdown label="Label" placeholder="Choose an option" disabled />
          </div>
        </div>
      </div>

      <div className="mt-(--layout-3) flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Multi-select
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          MenuItems get `checkbox` forced on — clicking doesn't close the menu. Selections show as
          badges below (click × to remove one), with Clear All once anything's selected.
        </Text>
        <div className="w-[280px]">
          <MultiSelectDropdown
            label="Label"
            placeholder="Choose options"
            required={required}
            tooltip={showTooltip ? 'Helpful context goes here' : undefined}
            instructions={showInstructions ? 'Helper text goes here' : undefined}
            invalid={invalid}
          >
            <MenuItem label="Option A" />
            <MenuItem label="Option B" />
            <MenuItem label="Option C" />
            <MenuItem label="Option D" />
            <MenuItem label="Option E" />
            <MenuItem label="Option F" />
            <MenuItem label="Option G" />
            <MenuItem label="Option H" />
          </MultiSelectDropdown>
        </div>
      </div>

      <div className="mt-(--layout-3) flex flex-col gap-(--stack-4)">
        <Text as="h3" variant="label-lg" className="text-(--text-surface-subtle)">
          Menu (MenuGroup / MenuItem)
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          The building blocks for the options panel — MenuPanel fills whatever width its container
          gives it (matches the trigger automatically inside a real Dropdown); these standalone
          demos wrap it in a fixed 200px box. Hover/click the rows below to see real hover and
          pressed states.
        </Text>
        <div className="w-[200px]">
          <MenuPanel searchBar={<MenuSearchBar placeholder="Search options" />}>
            <MenuGroup label="Section label" />
            <MenuItem label="Idle option" />
            <MenuItem label="Selected option" selected />
            <MenuItem label="Delete option" destructive />
            <MenuItem label="Delete option (selected)" destructive selected />
            <MenuItem label="Disabled option" disabled />
          </MenuPanel>
        </div>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          Multi-select variant — checkbox is visual only (see the component's own doc comment for why), the row is still the single click target.
        </Text>
        <div className="w-[200px]">
          <MenuPanel>
            <MenuItem label="Unselected option" checkbox />
            <MenuItem label="Selected option" checkbox selected />
            <MenuItem label="Disabled option" checkbox disabled />
          </MenuPanel>
        </div>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          8 options, no search bar — scrolls after 5.
        </Text>
        <div className="w-[200px]">
          <MenuPanel>
            {Array.from({ length: 8 }, (_, i) => (
              <MenuItem key={i} label={`Option ${i + 1}`} />
            ))}
          </MenuPanel>
        </div>
      </div>
    </div>
  )
}
