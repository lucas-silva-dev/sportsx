import { ButtonHTMLAttributes, ReactNode } from 'react';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  addBtn?: boolean;
  rmBtn?: boolean;
  children?: ReactNode;
};

export function Button({
  addBtn = false,
  rmBtn = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button ${rmBtn ? '-remove' : ''} ${addBtn ? '-add' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function AddOnButton(props: ButtonProps) {
  return (
    <button className='new-button' {...props}>
      <svg
        width='16'
        height='22'
        viewBox='0 0 16 22'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M4 5V3C4 2.46957 4.21071 1.96086 4.58579 1.58579C4.96086 1.21071 5.46957 1 6 1H10C10.5304 1 11.0391 1.21071 11.4142 1.58579C11.7893 1.96086 12 2.46957 12 3V5M15 5V19C15 19.5304 14.7893 20.0391 14.4142 20.4142C14.0391 20.7893 13.5304 21 13 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V5H15Z'
          stroke='#737380'
          stroke-width='1.5'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </button>
  );
}