import { useState } from 'react'
import {
  Button, Tag, Text, Checkbox, Tooltip, Modal, Icon, EditIcon, LockIcon, DocumentIcon,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableExpandButton, TableRowActions, Pagination,
} from '@judi-health/minerva-ds'
import type { TagVariant } from '@judi-health/minerva-ds'

interface DemoTableRow {
  id: number
  name: string
  memberId: string
  status: 'Approved' | 'Pending' | 'Denied'
  amount: string
  date: string
}

const TABLE_STATUS_VARIANT: Record<DemoTableRow['status'], TagVariant> = {
  Approved: 'success',
  Pending: 'warning',
  Denied: 'error',
}

const DEMO_TABLE_ROWS: DemoTableRow[] = [
  { id: 1,  name: 'Walter White',    memberId: '1234567', status: 'Approved', amount: '$1,240.00', date: '01/23/2025' },
  { id: 2,  name: 'Skyler White',    memberId: '2345671', status: 'Pending',  amount: '$860.50',   date: '01/24/2025' },
  { id: 3,  name: 'Jesse Pinkman',   memberId: '3456712', status: 'Denied',   amount: '$430.00',   date: '01/22/2025' },
  { id: 4,  name: 'Hank Schrader',   memberId: '4567123', status: 'Approved', amount: '$2,100.75', date: '01/20/2025' },
  { id: 5,  name: 'Marie Schrader',  memberId: '5671234', status: 'Pending',  amount: '$975.20',   date: '01/25/2025' },
  { id: 6,  name: 'Saul Goodman',    memberId: '6712345', status: 'Approved', amount: '$1,560.00', date: '01/19/2025' },
  { id: 7,  name: 'Mike Ehrmantraut',memberId: '7123456', status: 'Denied',   amount: '$310.40',   date: '01/18/2025' },
  { id: 8,  name: 'Gustavo Fring',   memberId: '8234567', status: 'Approved', amount: '$3,420.00', date: '01/17/2025' },
  { id: 9,  name: 'Lydia Rodarte',   memberId: '9345678', status: 'Pending',  amount: '$690.10',   date: '01/26/2025' },
  { id: 10, name: 'Todd Alquist',    memberId: '1045678', status: 'Approved', amount: '$540.00',   date: '01/16/2025' },
  { id: 11, name: 'Steven Gomez',    memberId: '1145678', status: 'Denied',   amount: '$275.60',   date: '01/15/2025' },
  { id: 12, name: 'Combo Ortega',    memberId: '1245678', status: 'Approved', amount: '$820.00',   date: '01/14/2025' },
  { id: 13, name: 'Andrea Cantillo', memberId: '1345678', status: 'Pending',  amount: '$1,050.30', date: '01/27/2025' },
  { id: 14, name: 'Jane Margolis',   memberId: '1445678', status: 'Approved', amount: '$960.00',   date: '01/13/2025' },
  { id: 15, name: 'Badger Mayhew',   memberId: '1545678', status: 'Denied',   amount: '$190.00',   date: '01/12/2025' },
  { id: 16, name: 'Skinny Pete',     memberId: '1645678', status: 'Approved', amount: '$610.25',   date: '01/11/2025' },
  { id: 17, name: 'Huell Babineaux', memberId: '1745678', status: 'Pending',  amount: '$1,320.00', date: '01/28/2025' },
  { id: 18, name: 'Kuby Norris',     memberId: '1845678', status: 'Approved', amount: '$450.00',   date: '01/10/2025' },
  { id: 19, name: 'Ted Beneke',      memberId: '1945678', status: 'Denied',   amount: '$780.90',   date: '01/09/2025' },
  { id: 20, name: 'Gale Boetticher', memberId: '1054678', status: 'Approved', amount: '$2,340.00', date: '01/08/2025' },
  { id: 21, name: 'Chris Mara',      memberId: '1154678', status: 'Pending',  amount: '$530.00',   date: '01/29/2025' },
  { id: 22, name: 'Victor Vega',     memberId: '1254678', status: 'Approved', amount: '$675.40',   date: '01/07/2025' },
  { id: 23, name: 'Tyrus Kitt',      memberId: '1354678', status: 'Denied',   amount: '$220.00',   date: '01/06/2025' },
]

interface RealisticTableRow {
  caseId: string
  timeRemaining: string
  urgent: boolean
  member: string
  drug: string
  drugSubtext: string
  reviewLevel: 'Initial' | 'Renewal' | 'Reconsideration'
  serviceStatus: string
  lob: 'Commercial' | 'Medicare' | 'Exchange'
  status: 'In Progress' | 'Completed' | 'Closed'
  statusSubtext: string
  lockedBy?: string
  hasNewDocument?: boolean
}

const REALISTIC_STATUS_COLOR: Record<RealisticTableRow['status'], string> = {
  'In Progress': 'var(--text-feedback-informational-base)',
  'Completed':   'var(--text-feedback-success-base)',
  'Closed':      'var(--text-surface-base)',
}

const REALISTIC_TABLE_ROWS: RealisticTableRow[] = [
  {
    caseId: '100385', timeRemaining: 'Urgent: 48 hours, 11 minutes', urgent: true,
    member: 'Walter White', drug: 'Phentermine HCI 15MG Capsule', drugSubtext: 'Qty:2 | Days:28',
    reviewLevel: 'Initial', serviceStatus: 'Pending Review', lob: 'Commercial',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review', lockedBy: 'Skyler White',
  },
  {
    caseId: '100386', timeRemaining: '10 days, 23 hours', urgent: false,
    member: 'Jesse Pinkman', drug: 'Dupixent 300 MG/2ML', drugSubtext: 'Qty:1 | Days:28',
    reviewLevel: 'Renewal', serviceStatus: 'In Review', lob: 'Medicare',
    status: 'Completed', statusSubtext: '01/26/2026 09:46 PM EST', hasNewDocument: true,
  },
  {
    caseId: '100387', timeRemaining: '6 days, 4 hours', urgent: false,
    member: 'Hank Schrader', drug: 'Humira Pen 40MG/0.4ML', drugSubtext: 'Qty:2 | Days:28',
    reviewLevel: 'Reconsideration', serviceStatus: 'Pending Documents', lob: 'Exchange',
    status: 'Closed', statusSubtext: '01/18/2026 11:02 AM EST',
  },
  {
    caseId: '100388', timeRemaining: 'Urgent: 3 hours, 42 minutes', urgent: true,
    member: 'Marie Schrader', drug: 'Ozempic 2MG/3ML Pen', drugSubtext: 'Qty:1 | Days:28',
    reviewLevel: 'Initial', serviceStatus: 'Pending Review', lob: 'Commercial',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review', lockedBy: 'Saul Goodman', hasNewDocument: true,
  },
  {
    caseId: '100389', timeRemaining: '13 days, 6 hours', urgent: false,
    member: 'Gustavo Fring', drug: 'Eliquis 5MG Tablet', drugSubtext: 'Qty:60 | Days:30',
    reviewLevel: 'Renewal', serviceStatus: 'In Review', lob: 'Medicare',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review',
  },
  {
    caseId: '100390', timeRemaining: '2 days, 15 hours', urgent: false,
    member: 'Mike Ehrmantraut', drug: 'Xarelto 20MG Tablet', drugSubtext: 'Qty:30 | Days:30',
    reviewLevel: 'Initial', serviceStatus: 'Pending Documents', lob: 'Exchange',
    status: 'Closed', statusSubtext: '01/15/2026 03:12 PM EST',
  },
  {
    caseId: '100391', timeRemaining: 'Urgent: 22 hours, 5 minutes', urgent: true,
    member: 'Lydia Rodarte', drug: 'Trulicity 1.5MG/0.5ML Pen', drugSubtext: 'Qty:4 | Days:28',
    reviewLevel: 'Reconsideration', serviceStatus: 'Pending Review', lob: 'Commercial',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review', lockedBy: 'Todd Alquist',
  },
  {
    caseId: '100392', timeRemaining: '9 days, 1 hour', urgent: false,
    member: 'Saul Goodman', drug: 'Lyrica 75MG Capsule', drugSubtext: 'Qty:60 | Days:30',
    reviewLevel: 'Renewal', serviceStatus: 'In Review', lob: 'Medicare',
    status: 'Completed', statusSubtext: '01/24/2026 10:20 AM EST', hasNewDocument: true,
  },
  {
    caseId: '100393', timeRemaining: '5 days, 19 hours', urgent: false,
    member: 'Andrea Cantillo', drug: 'Jardiance 25MG Tablet', drugSubtext: 'Qty:30 | Days:30',
    reviewLevel: 'Initial', serviceStatus: 'Pending Review', lob: 'Exchange',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review',
  },
  {
    caseId: '100394', timeRemaining: 'Urgent: 6 hours, 50 minutes', urgent: true,
    member: 'Jane Margolis', drug: 'Enbrel 50MG/ML Pen', drugSubtext: 'Qty:4 | Days:28',
    reviewLevel: 'Reconsideration', serviceStatus: 'Pending Documents', lob: 'Commercial',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review', lockedBy: 'Kuby Norris', hasNewDocument: true,
  },
  {
    caseId: '100395', timeRemaining: '16 days, 2 hours', urgent: false,
    member: 'Ted Beneke', drug: 'Symbicort 160/4.5 Inhaler', drugSubtext: 'Qty:1 | Days:30',
    reviewLevel: 'Renewal', serviceStatus: 'In Review', lob: 'Medicare',
    status: 'Closed', statusSubtext: '01/10/2026 08:37 AM EST',
  },
  {
    caseId: '100396', timeRemaining: '1 day, 4 hours', urgent: false,
    member: 'Gale Boetticher', drug: 'Farxiga 10MG Tablet', drugSubtext: 'Qty:30 | Days:30',
    reviewLevel: 'Initial', serviceStatus: 'Pending Review', lob: 'Exchange',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review',
  },
  {
    caseId: '100397', timeRemaining: '11 days, 20 hours', urgent: false,
    member: 'Huell Babineaux', drug: 'Repatha 140MG/ML Pen', drugSubtext: 'Qty:2 | Days:28',
    reviewLevel: 'Renewal', serviceStatus: 'In Review', lob: 'Commercial',
    status: 'Completed', statusSubtext: '01/22/2026 02:55 PM EST',
  },
  {
    caseId: '100398', timeRemaining: '4 days, 8 hours', urgent: false,
    member: 'Kuby Norris', drug: 'Januvia 100MG Tablet', drugSubtext: 'Qty:30 | Days:30',
    reviewLevel: 'Initial', serviceStatus: 'Pending Review', lob: 'Exchange',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review',
  },
  {
    caseId: '100399', timeRemaining: '7 days, 12 hours', urgent: false,
    member: 'Ted Beneke', drug: 'Ozempic 1MG/3ML Pen', drugSubtext: 'Qty:1 | Days:28',
    reviewLevel: 'Renewal', serviceStatus: 'In Review', lob: 'Commercial',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review',
  },
  {
    caseId: '100400', timeRemaining: 'Urgent: 1 hour, 15 minutes', urgent: true,
    member: 'Gale Boetticher', drug: 'Biktarvy 50/200/25MG Tablet', drugSubtext: 'Qty:30 | Days:30',
    reviewLevel: 'Initial', serviceStatus: 'Pending Review', lob: 'Medicare',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review', lockedBy: 'Mike Ehrmantraut',
  },
  {
    caseId: '100401', timeRemaining: '18 days, 3 hours', urgent: false,
    member: 'Chris Mara', drug: 'Stelara 90MG/ML Syringe', drugSubtext: 'Qty:1 | Days:56',
    reviewLevel: 'Renewal', serviceStatus: 'In Review', lob: 'Exchange',
    status: 'Closed', statusSubtext: '01/05/2026 09:18 AM EST',
  },
  {
    caseId: '100402', timeRemaining: '3 days, 21 hours', urgent: false,
    member: 'Victor Vega', drug: 'Cosentyx 150MG/ML Pen', drugSubtext: 'Qty:2 | Days:28',
    reviewLevel: 'Reconsideration', serviceStatus: 'Pending Documents', lob: 'Commercial',
    status: 'In Progress', statusSubtext: 'Pharmacist (RPh) Review', hasNewDocument: true,
  },
  {
    caseId: '100403', timeRemaining: '14 days, 17 hours', urgent: false,
    member: 'Tyrus Kitt', drug: 'Skyrizi 150MG/ML Pen', drugSubtext: 'Qty:1 | Days:56',
    reviewLevel: 'Initial', serviceStatus: 'In Review', lob: 'Medicare',
    status: 'Completed', statusSubtext: '01/20/2026 04:41 PM EST',
  },
]

type SortDirection = 'asc' | 'desc' | undefined

// unsorted → asc → desc → unsorted, the cycle every sortable column uses.
function useSort<K extends string>() {
  const [column, setColumn] = useState<K | null>(null)
  const [direction, setDirection] = useState<SortDirection>(undefined)
  const toggle = (next: K) => {
    if (column !== next) {
      setColumn(next)
      setDirection('asc')
    } else if (direction === 'asc') {
      setDirection('desc')
    } else {
      setColumn(null)
      setDirection(undefined)
    }
  }
  const directionFor = (key: K) => (column === key ? direction : undefined)
  const sort = <T extends Record<K, string>>(rows: T[]) =>
    column ? [...rows].sort((a, b) => a[column].localeCompare(b[column]) * (direction === 'desc' ? -1 : 1)) : rows
  return { toggle, directionFor, sort }
}

function SectionLabel({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-(--stack-3) flex flex-col gap-(--stack-1)">
      <Text as="div" variant="label-lg" className="text-(--text-surface-subtle)">{title}</Text>
      {description && <Text as="div" variant="body-sm" className="text-(--text-surface-subtle)">{description}</Text>}
    </div>
  )
}

export function TableSection() {
  return (
    <div className="min-h-full flex flex-col gap-(--layout-3)">
      <div>
        <Text as="h2" variant="heading-md" className="mb-(--stack-4) text-(--text-surface-base)">
          Table
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          Built from real table elements: Table, TableHeader, TableBody, TableRow, TableHead and TableCell
          (structure from shadcn/ui). Columns hug their content; mark one TableHead with grow to fill the
          leftover width.
        </Text>
      </div>
      <SelectableTable />
      <ExpandableTable />
      <TruncationTable />
      <WideTable />
    </div>
  )
}

// ─── Row click + checkbox ─────────────────────────────────────────────────────

function SelectableTable() {
  const { toggle, directionFor, sort } = useSort<'name' | 'date'>()
  const [currentPage, setCurrentPage] = useState(1)
  const [selected, setSelected] = useState<number[]>([])
  const [opened, setOpened] = useState<DemoTableRow | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const pageSize = 10

  const pagedRows = sort(DEMO_TABLE_ROWS).slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const pageIds = pagedRows.map((row) => row.id)
  const selectedOnPage = pageIds.filter((id) => selected.includes(id))
  const toggleSelected = (id: number) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  const toggleAll = () =>
    setSelected((prev) =>
      selectedOnPage.length === pageIds.length ? prev.filter((id) => !pageIds.includes(id)) : [...new Set([...prev, ...pageIds])]
    )

  return (
    <div>
      <SectionLabel
        title="Row click + checkbox"
        description={`The checkbox selects a row; clicking anywhere else on the row opens it. Member Name has grow. Actions pairs an inline Edit button with a TableRowActions menu. ${
          opened ? `Last opened: ${opened.name}.` : 'Click a row to open it.'
        }`}
      />
      <Table
        paginationBottom={
          <Pagination currentPage={currentPage} pageSize={pageSize} totalItems={DEMO_TABLE_ROWS.length} onPageChange={setCurrentPage} />
        }
      >
        <TableHeader>
          <TableRow>
            <TableHead align="center">
              <Checkbox
                aria-label="Select all rows on this page"
                checked={selectedOnPage.length === pageIds.length}
                indeterminate={selectedOnPage.length > 0 && selectedOnPage.length < pageIds.length}
                onChange={toggleAll}
              />
            </TableHead>
            <TableHead grow tooltip="Full legal name on file" sortable sortDirection={directionFor('name')} onSort={() => toggle('name')}>
              Member Name
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead sortable sortDirection={directionFor('date')} onSort={() => toggle('date')}>
              Date Submitted
            </TableHead>
            <TableHead align="center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagedRows.map((row) => (
            <TableRow key={row.id} onClick={() => setOpened(row)}>
              <TableCell type="checkbox">
                <Checkbox aria-label={`Select ${row.name}`} checked={selected.includes(row.id)} onChange={() => toggleSelected(row.id)} />
              </TableCell>
              <TableCell type="text" subtext={`Member ID: ${row.memberId}`}>{row.name}</TableCell>
              <TableCell type="tag"><Tag variant={TABLE_STATUS_VARIANT[row.status]}>{row.status}</Tag></TableCell>
              <TableCell type="money">{row.amount}</TableCell>
              <TableCell type="date">{row.date}</TableCell>
              <TableCell type="action">
                <div className="flex items-center gap-(--inline-1)">
                  <Tooltip content="Edit">
                    <Button variant="tertiary" iconOnly aria-label={`Edit ${row.name}`}>
                      <Icon icon={EditIcon} size="regular" />
                    </Button>
                  </Tooltip>
                  <TableRowActions
                    label={`More actions for ${row.name}`}
                    actions={[
                      { label: 'Reassign', onClick: () => setOpened(row) },
                      { label: 'Download', onClick: () => setOpened(row) },
                      { label: 'Delete', onClick: () => setDeleteModalOpen(true), destructive: true },
                    ]}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete"
        rightActions={
          <>
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="primary" destructive onClick={() => setDeleteModalOpen(false)}>Delete</Button>
          </>
        }
      >
        <Text variant="body-md" className="text-(--text-surface-base)">This action cannot be undone.</Text>
      </Modal>
    </div>
  )
}

// ─── Expandable rows ──────────────────────────────────────────────────────────

function ExpandableTable() {
  const [expanded, setExpanded] = useState<string[]>([REALISTIC_TABLE_ROWS[1].caseId])
  const rows = REALISTIC_TABLE_ROWS.slice(0, 5)
  const toggle = (caseId: string) =>
    setExpanded((prev) => (prev.includes(caseId) ? prev.filter((x) => x !== caseId) : [...prev, caseId]))

  return (
    <div>
      <SectionLabel
        title="Expandable rows"
        description="A TableRow with detail and expanded shows one full-width area underneath. Detail rows keep their parent's fill and don't break the alternating colors."
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>Case ID</TableHead>
            <TableHead>Member</TableHead>
            <TableHead grow>Drug</TableHead>
            <TableHead>Review Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            const isOpen = expanded.includes(row.caseId)
            return (
              <TableRow
                key={row.caseId}
                expanded={isOpen}
                detail={
                  <div className="flex flex-col gap-(--stack-1)">
                    <Text variant="body-md" weight="semibold" className="text-(--text-surface-base)">{row.status}</Text>
                    <Text variant="body-sm" className="text-(--text-surface-subtle)">
                      {row.statusSubtext} · {row.serviceStatus} · {row.lob}
                    </Text>
                  </div>
                }
              >
                <TableCell type="expand">
                  <TableExpandButton expanded={isOpen} onClick={() => toggle(row.caseId)} aria-label={`Details for case ${row.caseId}`} />
                </TableCell>
                <TableCell type="text">{row.caseId}</TableCell>
                <TableCell type="text">{row.member}</TableCell>
                <TableCell type="text" subtext={row.drugSubtext}>{row.drug}</TableCell>
                <TableCell type="text">{row.reviewLevel}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

// ─── Truncation ───────────────────────────────────────────────────────────────

function TruncationTable() {
  const rows = REALISTIC_TABLE_ROWS.slice(0, 4)
  return (
    <div>
      <SectionLabel
        title="Truncation"
        description="maxWidth caps a cell; longer text ends in … and shows in full on hover. Without grow, the table hugs its content."
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Drug</TableHead>
            <TableHead>Case Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.caseId}>
              <TableCell type="text">{row.member}</TableCell>
              <TableCell type="text" subtext={row.drugSubtext} maxWidth="calc(var(--space-40) * 4)">{row.drug}</TableCell>
              <TableCell type="text" color={REALISTIC_STATUS_COLOR[row.status]} subtext={row.statusSubtext}>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// ─── Wide table ───────────────────────────────────────────────────────────────

function WideTable() {
  type SortColumn = 'caseId' | 'timeRemaining' | 'member' | 'drug' | 'reviewLevel' | 'serviceStatus' | 'lob'
  const { toggle, directionFor, sort } = useSort<SortColumn>()
  const [page, setPage] = useState(1)
  const pageSize = 10
  const pagedRows = sort(REALISTIC_TABLE_ROWS).slice((page - 1) * pageSize, page * pageSize)
  const pagination = <Pagination currentPage={page} pageSize={pageSize} totalItems={REALISTIC_TABLE_ROWS.length} onPageChange={setPage} />
  const sortableHead = (key: SortColumn, label: string, grow = false) => (
    <TableHead grow={grow} sortable sortDirection={directionFor(key)} onSort={() => toggle(key)}>{label}</TableHead>
  )

  return (
    <div>
      <SectionLabel
        title="Wide table (pinned first column, pinned actions)"
        description="Scroll sideways: Case ID stays pinned with stickyFirstColumn, and the action column pins itself automatically. Each shows a shadow only while content is hidden behind it."
      />
      <Table stickyFirstColumn paginationTop={pagination} paginationBottom={pagination}>
        <TableHeader>
          <TableRow>
            {sortableHead('caseId', 'Case ID')}
            {sortableHead('timeRemaining', 'Time Remaining')}
            {sortableHead('member', 'Member')}
            {sortableHead('drug', 'Drug', true)}
            {sortableHead('reviewLevel', 'Review Level')}
            {sortableHead('serviceStatus', 'Service Status')}
            {sortableHead('lob', 'Line of Business')}
            <TableHead>Case Status</TableHead>
            <TableHead align="center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagedRows.map((row) => (
            <TableRow key={row.caseId}>
              <TableCell type="link"><Button variant="link">{row.caseId}</Button></TableCell>
              <TableCell type="text" color={row.urgent ? 'var(--text-feedback-error-base)' : undefined}>{row.timeRemaining}</TableCell>
              <TableCell type="text">{row.member}</TableCell>
              <TableCell type="text" subtext={row.drugSubtext}>{row.drug}</TableCell>
              <TableCell type="text">{row.reviewLevel}</TableCell>
              <TableCell type="text">{row.serviceStatus}</TableCell>
              <TableCell type="text">{row.lob}</TableCell>
              <TableCell type="text" color={REALISTIC_STATUS_COLOR[row.status]} subtext={row.statusSubtext}>{row.status}</TableCell>
              <TableCell type="action">
                <div className="flex items-center gap-(--inline-1)">
                  {row.lockedBy && (
                    <Tooltip content={`Locked by ${row.lockedBy}`}>
                      <span tabIndex={0}>
                        <Icon icon={LockIcon} size="regular" className="text-(--icon-feedback-error-base)" />
                      </span>
                    </Tooltip>
                  )}
                  {row.hasNewDocument && (
                    <Tooltip content="New document attached">
                      <span tabIndex={0}>
                        <Icon icon={DocumentIcon} size="regular" className="text-(--icon-feedback-informational-base)" />
                      </span>
                    </Tooltip>
                  )}
                  <TableRowActions
                    label={`Actions for case ${row.caseId}`}
                    actions={[
                      { label: 'Open case', onClick: () => {} },
                      { label: 'Reassign', onClick: () => {} },
                      { label: 'Unlock', onClick: () => {}, disabled: !row.lockedBy },
                    ]}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
