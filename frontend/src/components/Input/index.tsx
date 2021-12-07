import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import './styles.scss';

interface Props {
  name: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

export function Input({ name, label, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error, clearError } =
    useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <label className='input' htmlFor={fieldName}>
        {label}

        <input
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          onFocus={clearError}
          {...rest}
        />

        {error && <span>{error}</span>}
      </label>
    </>
  );
}
