// RenderInput.js
import React from 'react';
import { Input, Switch, Select, Radio, Button } from 'antd';

const renderInput = ({ onChange, onBlur, value, name }, type, options = []) => {
  switch (type) {
    case 'text':
    case 'email':
    case 'color':
    case 'date':
    case 'datetime-local':
    case 'month':
    case 'number':
    case 'range':
    case 'search':
    case 'tel':
    case 'time':
    case 'url':
    case 'week':
      return <Input onChange={onChange} onBlur={onBlur} value={value} name={name} type={type} />;
    case 'password':
      // Explicitly use Input.Password for password fields
      return <Input.Password onChange={onChange} onBlur={onBlur} value={value} name={name} />;
    case 'checkbox':
      // Adjustments might be necessary for handling checked state
      return <Switch checked={value} onChange={onChange} name={name} />;
    case 'select':
      return (
        <Select onChange={onChange} value={value} onBlur={onBlur} name={name}>
          {options.map(option => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
    case 'radio':
      return (
        <Radio.Group onChange={onChange} value={value} name={name}>
          {options.map(option => (
            <Radio key={option.value} value={option.value}>{option.label}</Radio>
          ))}
        </Radio.Group>
      );
    case 'file':
      // For file inputs, the value is not directly controllable via state
      return <Input type="file" name={name} onChange={onChange} />;
    // Add cases for other input types as necessary
    default:
      return <Input onChange={onChange} onBlur={onBlur} value={value} name={name} />;
  }
};

export default renderInput;
