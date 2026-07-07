/**
 * Alert — Health OS v2.
 *
 * An inline status message using the locked tint + text pairs (`-100` background,
 * `-700` text — AA in every theme). A leading Lucide icon per tone, sentence-case title
 * and optional body, an optional dismiss. Flat, hairline, `rounded-lg`. `role="status"`
 * for info/success, `role="alert"` for warn/danger so screen readers announce urgency
 * correctly.
 */
import * as React from 'react';
import { Info, CheckCircle2, AlertTriangle, XCircle, X, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/ui/icon-button';

type Tone = 'info' | 'success' | 'warn' | 'danger';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  title: string;
  onDismiss?: () => void;
}

const TONES: Record<Tone, { wrap: string; icon: LucideIcon; iconClass: string; role: 'status' | 'alert' }> = {
  info: { wrap: 'bg-info-100 border-info-600/25 text-info-700', icon: Info, iconClass: 'text-info-600', role: 'status' },
  success: { wrap: 'bg-success-100 border-success-600/25 text-success-700', icon: CheckCircle2, iconClass: 'text-success-600', role: 'status' },
  warn: { wrap: 'bg-warn-100 border-warn-600/25 text-warn-700', icon: AlertTriangle, iconClass: 'text-warn-600', role: 'alert' },
  danger: { wrap: 'bg-danger-100 border-danger-600/25 text-danger-700', icon: XCircle, iconClass: 'text-danger-600', role: 'alert' },
};

export const Alert = ({ tone = 'info', title, children, onDismiss, className, ...props }: AlertProps) => {
  const t = TONES[tone];
  const Icon = t.icon;
  return (
    <div
      role={t.role}
      className={cn('flex items-start gap-3 rounded-lg border px-4 py-3', t.wrap, className)}
      {...props}
    >
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', t.iconClass)} strokeWidth={1.5} aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="font-display text-body-md font-medium">{title}</p>
        {children && <div className="mt-1 font-mono text-body-sm leading-relaxed opacity-90">{children}</div>}
      </div>
      {onDismiss && (
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="-mr-1 -mt-1 shrink-0 text-current hover:bg-carbon/5"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </IconButton>
      )}
    </div>
  );
};
