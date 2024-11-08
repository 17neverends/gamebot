import React from 'react';
import { Input } from 'rsuite';

import FormFieldWrapper from './formFieldWrapper';

export default function Field ({ error, label, ...rest }) {
    return (
      <FormFieldWrapper error={error} label={label} {...rest}>
        <Input {...rest} />
      </FormFieldWrapper>
    );
  };