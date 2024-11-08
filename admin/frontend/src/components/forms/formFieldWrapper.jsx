import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Whisper, Input, Panel, Tooltip } from 'rsuite';
import MainPanel from '../panels/mainPanel';

export default function Field ({ error, label, children, style, addition, bottom, whisper, halfed, helpText, ...rest }) {
    return (
      <Form.Group style={{marginBottom: bottom, width: halfed ? '50%' : '100%'}}>
        { whisper ?
        <Whisper trigger="hover" placement='bottomEnd' speaker={<Tooltip>{whisper}</Tooltip>}>
          <Form.ControlLabel className='form-label'>
              {label}
          </Form.ControlLabel>
        </Whisper> :
        <Form.ControlLabel className='form-label'>
          {label}
        </Form.ControlLabel>
        }
        <div style={style}>
          {addition}
          {children}
        </div>
        <Form.HelpText>{helpText}</Form.HelpText>
        <Form.ErrorMessage show={!!error} placement="bottomStart">
            {error}
        </Form.ErrorMessage>
      </Form.Group>
    );
  };

  export function FieldRow ({ error, label, children, style, addition, bottom, whisper, helpText, ...rest }) {
    return (
      
      <Form.Group style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: bottom}}>
        { whisper ?
        <Whisper trigger="hover" placement='bottomEnd' speaker={<Tooltip>{whisper}</Tooltip>}>
          <Form.ControlLabel className='form-label-thin'>
              {label}
          </Form.ControlLabel>
        </Whisper> :
        <Form.ControlLabel className='form-label-thin'>
          {label}
        </Form.ControlLabel>
        }
        <div style={style} className='form-field-row-inner'>
          {addition}
          {children}
        </div>
        <Form.HelpText>{helpText}</Form.HelpText>
        <Form.ErrorMessage show={!!error} placement="bottomStart">
            {error}
        </Form.ErrorMessage>
      </Form.Group>
    );
  };