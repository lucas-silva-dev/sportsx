import React, { useRef, useEffect } from 'react';
import ReactSelect, { Props as SelectProps } from 'react-select';

import { useField } from '@unform/core';

import './styles.scss';

interface Props extends SelectProps {
  name: string;
  label?: string;
}

export function Select({ name, label, ...rest }: Props) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error, clearError } =
    useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (!ref.props.value) {
          return '';
        }

        return ref.props.value?.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <label className='select' htmlFor={name}>
        {label}
        <ReactSelect
          id={fieldName}
          ref={selectRef}
          onFocus={clearError}
          defaultValue={defaultValue}
          className='react-select-container'
          classNamePrefix='react-select'
          {...rest}
        />

        {error && <span>{error}</span>}
      </label>
    </>
  );
}

// import React, { useRef, useEffect } from 'react';
// import ReactSelect, { Props as SelectProps } from 'react-select';
// import { useField } from '@unform/core';

// interface Props extends SelectProps {
//   name: string;
// }

// export function Select({ name, ...rest }: Props) {
//   const selectRef = useRef(null);
//   const { fieldName, defaultValue, registerField, error } = useField(name);

//   useEffect(() => {
//     registerField({
//       name: fieldName,
//       ref: selectRef.current,
//       getValue: (ref: any) => {
//         if (!ref.props.value) {
//           return '';
//         }
//         return ref.props.value.value;
//       },
//     });
//   }, [fieldName, registerField]);

//   return (
//     <>
//       <ReactSelect
//         defaultValue={defaultValue}
//         ref={selectRef}
//         classNamePrefix='react-select'
//         {...rest}
//       />
//       {error && <span>{error}</span>}
//     </>
//   );
// }
