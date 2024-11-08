import React from 'react';
import { InputNumber } from 'rsuite';

import FormFieldWrapper from './formFieldWrapper';

export default function Field ({ error, label, ...rest }) {
    return (
      <FormFieldWrapper error={error} label={label} {...rest}>
        <InputNumber {...rest} />
      </FormFieldWrapper>
    );
  };