import { LiHTMLAttributes, ReactNode } from 'react';

import './styles.scss';

type CustomerProps = LiHTMLAttributes<HTMLLIElement> & {
  children?: ReactNode;
};

export function CustomerItem({ children, ...props }: CustomerProps) {
  return (
    <>
      <li
        title='Mostar informações do usuário'
        className='grid-list'
        {...props}
      >
        {children}
      </li>
    </>
  );
}
