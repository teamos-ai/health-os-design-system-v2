/**
 * Faq — Health OS v2 marketing block.
 *
 * A list of questions built on the accessible `Disclosure` primitive (each with wired
 * `aria-controls` / labelled panel). Single-column by default; pass `columns={2}` for a
 * side-by-side layout on wider screens. Sentence-case questions, calm mono answers.
 */
import * as React from 'react';
import { Disclosure } from '@/components/ui/disclosure';
import { cn } from '@/lib/utils';

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqProps {
  items: FaqItem[];
  columns?: 1 | 2;
  className?: string;
}

export const Faq = ({ items, columns = 1, className }: FaqProps) => (
  <div className={cn(columns === 2 ? 'grid gap-x-8 gap-y-2 md:grid-cols-2' : 'flex flex-col', className)}>
    {items.map((item) => (
      <Disclosure key={item.question} title={item.question}>
        <p className="font-mono text-body-sm leading-relaxed text-ink-600">{item.answer}</p>
      </Disclosure>
    ))}
  </div>
);
