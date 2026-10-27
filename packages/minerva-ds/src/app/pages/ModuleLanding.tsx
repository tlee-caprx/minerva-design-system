import { AppLayout } from '../../components/layout/AppLayout'
import { Button } from '../../components/ui/Button'
import { Text } from '../../components/ui/Text'

export interface ModuleLandingProps {
  onNavigate: (page: 'documentation' | 'tap') => void
}

export function ModuleLanding({ onNavigate }: ModuleLandingProps) {
  return (
    <AppLayout appName="Judi" breadcrumbs={[{ label: 'Home' }]} title="Modules">
      <div className="flex flex-col gap-(--stack-5)">
        <Text as="h2" variant="heading-md" className="text-(--text-surface-base)">
          Choose a module
        </Text>
        <div className="flex items-center gap-(--inline-4)">
          <Button variant="primary" onClick={() => onNavigate('tap')}>TAP</Button>
          <Button variant="secondary" onClick={() => onNavigate('documentation')}>Documentation</Button>
        </div>
      </div>
    </AppLayout>
  )
}
