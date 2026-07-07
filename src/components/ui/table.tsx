/**
 * Table — Health OS v2.
 *
 * A semantic data table (real `<table>` / `<thead>` / `<th scope>`), styled the Health OS
 * way: hairline row dividers, no zebra fills, mono body, `tabular-nums` on numeric columns,
 * sentence-case headers in an uppercase mono overline. Wraps itself in an `overflow-x-auto`
 * container so wide tables scroll rather than crush on mobile. Optional `caption` for SR
 * context; `align`/`numeric` per column.
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TableColumn<Row> {
  key: string;
  header: string;
  /** cell renderer; defaults to String(row[key]) */
  cell?: (row: Row) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  /** tabular-nums + right align for numbers */
  numeric?: boolean;
}

export interface TableProps<Row> {
  columns: TableColumn<Row>[];
  rows: Row[];
  /** stable key per row */
  rowKey: (row: Row, index: number) => string;
  caption?: string;
  className?: string;
}

export function Table<Row>({ columns, rows, rowKey, caption, className }: TableProps<Row>) {
  const alignClass = (c: TableColumn<Row>) =>
    c.align === 'right' || c.numeric ? 'text-right' : c.align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={cn('overflow-x-auto rounded-lg border border-line', className)}>
      <table className="w-full border-collapse">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-line bg-surface-2/60">
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={cn(
                  'whitespace-nowrap px-4 py-3 font-mono text-overline font-bold uppercase tracking-label text-ink-500',
                  alignClass(c)
                )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={rowKey(row, i)} className="border-b border-line last:border-b-0">
              {columns.map((c, ci) => {
                const content = c.cell ? c.cell(row) : String((row as Record<string, unknown>)[c.key] ?? '');
                const Cell = ci === 0 ? 'th' : 'td';
                return (
                  <Cell
                    key={c.key}
                    scope={ci === 0 ? 'row' : undefined}
                    className={cn(
                      'px-4 py-3 font-mono text-body-sm font-normal text-ink-700',
                      c.numeric && 'tabular-nums',
                      alignClass(c)
                    )}
                  >
                    {content}
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
