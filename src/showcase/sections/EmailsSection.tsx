/**
 * EmailsSection: every Health OS email and newsletter, written from the Health OS database, in one
 * searchable library. Series fold open and closed, each email previews as the inbox shows it, and
 * its HTML or plain text copies in one click.
 */
import { Section, Example } from '@/showcase/Section';
import { EmailLibrary } from '@/components/email/EmailLibrary';

export const EmailsSection = () => (
  <Section id="emails">
    <Example id="email-library" label="Email library">
      <EmailLibrary />
    </Example>
  </Section>
);
