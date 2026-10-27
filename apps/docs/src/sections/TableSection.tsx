import { useState } from 'react'
import { Button, Tag, Text, Checkbox, Tooltip, Modal, Table, TableCell, TableCellHeader, Pagination, Icon, DeleteIcon, EditIcon, LockIcon, DocumentIcon } from '@judi-health/minerva-ds'
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

export function TableSection() {
  const [sortColumn, setSortColumn] = useState<'name' | 'date' | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const [selected, setSelected] = useState<number[]>([])
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const pageSize = 10

  const [realisticPage, setRealisticPage] = useState(1)
  const realisticPageSize = 10

  type RealisticSortColumn = 'caseId' | 'timeRemaining' | 'member' | 'drug' | 'reviewLevel' | 'serviceStatus' | 'lob'
  const [realisticSortColumn, setRealisticSortColumn] = useState<RealisticSortColumn | null>(null)
  const [realisticSortDirection, setRealisticSortDirection] = useState<'asc' | 'desc' | undefined>(undefined)

  const sortedRealisticRows = [...REALISTIC_TABLE_ROWS].sort((a, b) => {
    if (!realisticSortColumn) return 0
    const dir = realisticSortDirection === 'desc' ? -1 : 1
    return a[realisticSortColumn].localeCompare(b[realisticSortColumn]) * dir
  })
  const pagedRealisticRows = sortedRealisticRows.slice(
    (realisticPage - 1) * realisticPageSize,
    realisticPage * realisticPageSize
  )

  const handleSort = (column: 'name' | 'date') => {
    if (sortColumn !== column) {
      setSortColumn(column)
      setSortDirection('asc')
    } else if (sortDirection === 'asc') {
      setSortDirection('desc')
    } else {
      setSortColumn(null)
      setSortDirection(undefined)
    }
  }

  const handleRealisticSort = (column: RealisticSortColumn) => {
    if (realisticSortColumn !== column) {
      setRealisticSortColumn(column)
      setRealisticSortDirection('asc')
    } else if (realisticSortDirection === 'asc') {
      setRealisticSortDirection('desc')
    } else {
      setRealisticSortColumn(null)
      setRealisticSortDirection(undefined)
    }
  }

  const toggleSelected = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const sortedRows = [...DEMO_TABLE_ROWS].sort((a, b) => {
    if (!sortColumn) return 0
    const dir = sortDirection === 'desc' ? -1 : 1
    return a[sortColumn].localeCompare(b[sortColumn]) * dir
  })
  const pagedRows = sortedRows.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const standaloneBoxClass = 'inline-flex flex-col w-fit rounded-(--radius-sm) overflow-hidden'
  const standaloneBoxStyle = { border: 'var(--space-1) solid var(--border-surface-base)' }

  return (
    <div className="min-h-full flex flex-col gap-(--layout-3)">
      <div>
        <Text as="h2" variant="heading-md" className="mb-(--stack-4) text-(--text-surface-base)">
          Table
        </Text>
        <Text variant="body-sm" className="text-(--text-surface-subtle)">
          TableCellHeader, TableCell, and Pagination shown standalone, then assembled into a full Table.
          Gridlines are a 1px gap over a gray background, not per-cell borders — avoids double-border
          seams where cells meet.
        </Text>
      </div>

      <div className="flex flex-wrap items-start gap-(--layout-3)">
        <div>
          <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
            TableCellHeader
          </Text>
          <div className={standaloneBoxClass} style={standaloneBoxStyle}>
            <TableCellHeader
              label="Sortable, with tooltip"
              tooltip="This column can be sorted by clicking anywhere on the header"
              sortable
              sortDirection="asc"
              onSort={() => {}}
            />
            <TableCellHeader label="Not sortable, no tooltip" />
          </div>
        </div>

        <div>
          <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
            TableCell
          </Text>
          <div className={standaloneBoxClass} style={standaloneBoxStyle}>
            <TableCell type="text" subtext="Member ID: 1234567">
              Walter White
            </TableCell>
            <TableCell type="tag" odd>
              <Tag variant="success">Approved</Tag>
            </TableCell>
            <TableCell type="checkbox">
              <Checkbox checked={false} onChange={() => {}} />
            </TableCell>
            <TableCell type="money" odd>
              $1,240.00
            </TableCell>
          </div>
        </div>

        <div>
          <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
            Pagination
          </Text>
          <div className={standaloneBoxClass} style={standaloneBoxStyle}>
            <Pagination currentPage={currentPage} pageSize={pageSize} totalItems={DEMO_TABLE_ROWS.length} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>

      <div>
      <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
        Full Table
      </Text>
      <Table
        columns="48px 1fr max-content max-content max-content max-content"
        onRowClick={(rowIndex) => {
          const row = pagedRows[rowIndex]
          if (row) toggleSelected(row.id)
        }}
        header={[
          <TableCellHeader label="" />,
          <TableCellHeader
            label="Member Name"
            tooltip="Full legal name on file"
            sortable
            sortDirection={sortColumn === 'name' ? sortDirection : undefined}
            onSort={() => handleSort('name')}
          />,
          <TableCellHeader label="Status" />,
          <TableCellHeader label="Amount" />,
          <TableCellHeader
            label="Date Submitted"
            sortable
            sortDirection={sortColumn === 'date' ? sortDirection : undefined}
            onSort={() => handleSort('date')}
          />,
          <TableCellHeader label="Actions" align="center" />,
        ]}
        rows={pagedRows.map((row) => [
          <TableCell type="checkbox">
            {/* No-op onChange — the row's own onClick is the single source of
                truth for toggling selection, so this just reflects state. */}
            <Checkbox checked={selected.includes(row.id)} onChange={() => {}} />
          </TableCell>,
          <TableCell type="text" subtext={`Member ID: ${row.memberId}`}>
            {row.name}
          </TableCell>,
          <TableCell type="tag">
            <Tag variant={TABLE_STATUS_VARIANT[row.status]}>{row.status}</Tag>
          </TableCell>,
          <TableCell type="money">{row.amount}</TableCell>,
          <TableCell type="date">{row.date}</TableCell>,
          <TableCell type="action">
            <div className="flex items-center gap-(--inline-3)">
              <Tooltip content="Edit">
                <button
                  type="button"
                  aria-label="Edit"
                  className="inline-flex items-center justify-center cursor-pointer bg-transparent p-0"
                  style={{ border: 'none' }}
                >
                  <Icon icon={EditIcon} size="regular" className="text-(--icon-action-secondary-idle)" />
                </button>
              </Tooltip>
              <Tooltip content="Delete">
                <button
                  type="button"
                  aria-label="Delete"
                  onClick={() => setDeleteModalOpen(true)}
                  className="inline-flex items-center justify-center cursor-pointer bg-transparent p-0"
                  style={{ border: 'none' }}
                >
                  <Icon icon={DeleteIcon} size="regular" className="text-(--icon-action-secondary-critical-idle)" />
                </button>
              </Tooltip>
            </div>
          </TableCell>,
        ])}
        paginationBottom={
          <Pagination currentPage={currentPage} pageSize={pageSize} totalItems={DEMO_TABLE_ROWS.length} onPageChange={setCurrentPage} />
        }
      />

      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete"
        rightActions={
          <>
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" destructive onClick={() => setDeleteModalOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        <Text variant="body-md" className="text-(--text-surface-base)">
          This action cannot be undone.
        </Text>
      </Modal>
      </div>

      <div>
      <Text as="div" variant="label-lg" className="mb-(--stack-3) text-(--text-surface-subtle)">
        Realistic table (sticky first/last column, horizontal scroll)
      </Text>
      <Text as="div" variant="body-sm" className="mb-(--stack-3) text-(--text-surface-subtle)">
        Rows aren't click targets here — only the Case ID link and the status icons are interactive.
        Scroll horizontally to see Case ID and Actions stay pinned.
      </Text>
      <Table
        columns="max-content max-content max-content minmax(220px,1fr) max-content max-content max-content max-content max-content"
        stickyFirstColumn
        paginationTop={
          <Pagination
            currentPage={realisticPage}
            pageSize={realisticPageSize}
            totalItems={REALISTIC_TABLE_ROWS.length}
            onPageChange={setRealisticPage}
          />
        }
        paginationBottom={
          <Pagination
            currentPage={realisticPage}
            pageSize={realisticPageSize}
            totalItems={REALISTIC_TABLE_ROWS.length}
            onPageChange={setRealisticPage}
          />
        }
        header={[
          <TableCellHeader
            label="Case ID"
            sortable
            sortDirection={realisticSortColumn === 'caseId' ? realisticSortDirection : undefined}
            onSort={() => handleRealisticSort('caseId')}
          />,
          <TableCellHeader
            label="Time Remaining"
            sortable
            sortDirection={realisticSortColumn === 'timeRemaining' ? realisticSortDirection : undefined}
            onSort={() => handleRealisticSort('timeRemaining')}
          />,
          <TableCellHeader
            label="Member"
            sortable
            sortDirection={realisticSortColumn === 'member' ? realisticSortDirection : undefined}
            onSort={() => handleRealisticSort('member')}
          />,
          <TableCellHeader
            label="Drug"
            sortable
            sortDirection={realisticSortColumn === 'drug' ? realisticSortDirection : undefined}
            onSort={() => handleRealisticSort('drug')}
          />,
          <TableCellHeader
            label="Review Level"
            sortable
            sortDirection={realisticSortColumn === 'reviewLevel' ? realisticSortDirection : undefined}
            onSort={() => handleRealisticSort('reviewLevel')}
          />,
          <TableCellHeader
            label="Service Status"
            sortable
            sortDirection={realisticSortColumn === 'serviceStatus' ? realisticSortDirection : undefined}
            onSort={() => handleRealisticSort('serviceStatus')}
          />,
          <TableCellHeader
            label="Line of Business"
            sortable
            sortDirection={realisticSortColumn === 'lob' ? realisticSortDirection : undefined}
            onSort={() => handleRealisticSort('lob')}
          />,
          <TableCellHeader label="Case Status" />,
          <TableCellHeader label="Actions" align="center" />,
        ]}
        rows={pagedRealisticRows.map((row) => [
          <TableCell type="link">
            <Button variant="link">{row.caseId}</Button>
          </TableCell>,
          <TableCell type="text" color={row.urgent ? 'var(--text-feedback-error-base)' : undefined}>
            {row.timeRemaining}
          </TableCell>,
          <TableCell type="text">{row.member}</TableCell>,
          <TableCell type="text" subtext={row.drugSubtext}>
            {row.drug}
          </TableCell>,
          <TableCell type="text">{row.reviewLevel}</TableCell>,
          <TableCell type="text">{row.serviceStatus}</TableCell>,
          <TableCell type="text">{row.lob}</TableCell>,
          <TableCell type="text" color={REALISTIC_STATUS_COLOR[row.status]} subtext={row.statusSubtext}>
            {row.status}
          </TableCell>,
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
            </div>
          </TableCell>,
        ])}
      />
      </div>
    </div>
  )
}
