/**
 * Faq: questions and answers on the accessible Disclosure primitive.
 * One column by default; `columns={2}` on wide pages with six or more questions.
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
        <p className="font-sans text-body text-ink-600">{item.answer}</p>
      </Disclosure>
    ))}
  </div>
);
