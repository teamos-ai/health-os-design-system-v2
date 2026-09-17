/**
 * DashboardsSection: the Health OS product screens. The featured dashboard opens the section, and
 * every screen sits under it, tagged by area, layout and the parts it is built from.
 */
import { Section, Example } from '@/showcase/Section';
import { DashboardLibrary } from '@/components/dashboards/DashboardLibrary';

export const DashboardsSection = () => (
  <Section id="dashboards">
    <Example id="dashboard-library" label="Dashboard library">
      <DashboardLibrary />
    </Example>
  </Section>
);
