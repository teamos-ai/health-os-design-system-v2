/**
 * Alert: an inline status message that stays on the page until the situation changes.
 * Three tones, the functional colours: success, warning and error. Tint background,
 * deep text, a leading icon. Warning and error announce with role="alert".
 * For a passing confirmation that should disappear on its own, use a toast instead.
 */
import * as React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, X, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/ui/icon-button';

export type AlertTone = 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone;
  title: string;
  onDismiss?: () => void;
}

const TONES: Record<AlertTone, { wrap: string; icon: LucideIcon; iconClass: string; role: 'status' | 'alert' }> = {
  success: { wrap: 'border-success-600/25 bg-success-100 text-success-700', icon: CheckCircle2, iconClass: 'text-success-600', role: 'status' },
  warning: { wrap: 'border-warning-600/25 bg-warning-100 text-warning-700', icon: AlertTriangle, iconClass: 'text-warning-600', role: 'alert' },
  error: { wrap: 'border-error-600/25 bg-error-100 text-error-700', icon: XCircle, iconClass: 'text-error-600', role: 'alert' },
};

export const Alert = ({ tone = 'success', title, children, onDismiss, className, ...props }: AlertProps) => {
  const t = TONES[tone];
  const Icon = t.icon;
  return (
    <div role={t.role} className={cn('flex items-start gap-3 rounded-lg border px-4 py-3', t.wrap, className)} {...props}>
      <Icon className={cn('mt-1 h-5 w-5 shrink-0', t.iconClass)} strokeWidth={1.5} aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="font-display text-body">{title}</p>
        {children && <div className="mt-1 font-sans text-body">{children}</div>}
      </div>
      {onDismiss && (
        <IconButton variant="text" size="small" aria-label="Dismiss" onClick={onDismiss} className="-mr-2 -mt-1 text-current hover:bg-carbon/5 hover:text-current">
          <X className="h-4 w-4" strokeWidth={1.5} />
        </IconButton>
      )}
    </div>
  );
};
