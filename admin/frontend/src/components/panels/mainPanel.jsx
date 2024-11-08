import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Input, Panel } from 'rsuite';

export default function MainPanel({children, header}) {
    
      return (
        <Panel header={header}>
          {children}
        </Panel>
      );
}