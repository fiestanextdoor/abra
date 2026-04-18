'use client';

import { useRouter, usePathname } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  'aria-label'?: string;
};

export function TransitionLink({ href, className, children, onClick, 'aria-label': ariaLabel }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const isSamePage = href.startsWith('/') && !href.includes('#') && href === pathname;
  const isInternal = href.startsWith('/') && !href.includes('#') && !isSamePage;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isSamePage) {
      e.preventDefault();
      onClick?.();
      return;
    }
    if (!isInternal) return;
    e.preventDefault();
    onClick?.();

    window.dispatchEvent(new CustomEvent('page-transition-start'));

    const onReady = () => {
      window.removeEventListener('page-transition-ready', onReady);
      router.push(href);
    };
    window.addEventListener('page-transition-ready', onReady);
  };

  return (
    <a href={href} className={className} onClick={handleClick} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
