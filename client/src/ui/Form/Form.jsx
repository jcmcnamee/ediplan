import styled, { css } from 'styled-components';
import Input from './Input';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { LuCalendar } from 'react-icons/lu';

const Form = styled.form`
  display: grid;
  gap: 2.4rem;
  /* grid-auto-flow: row; */
  /* grid-auto-rows: auto; */
  grid-template-columns: 1fr;

  ${props =>
    props.type === 'regular' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-tab-active);
    `}

  ${props =>
    props.type === 'modal' &&
    css`
      width: 80rem;
    `}
    
  ${props =>
    props.columns &&
    css`
      grid-template-columns: 1fr 1fr;
    `}
  
  overflow: hidden;
  font-size: 1.4rem;
`;

const StyledFormItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 0.8rem;
  align-items: center;
  grid-column: 1;

  ${props =>
    props.side === 'right' &&
    css`
      grid-column: 2;
    `}
`;

const StyledLabel = styled.label`
  font-weight: 500;
`;

const StyledTextArea = styled.textarea`
  resize: none;
`;

Form.defaultProps = {
  type: 'regular',
  columns: true,
};

StyledFormItem.defaultProps = {
  side: 'left',
};

function TextShort({ side, label, id }) {
  return (
    <StyledFormItem side={side}>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <Input type="text" id={id} />
    </StyledFormItem>
  );
}

function TextLong({ side, label, id }) {
  return (
    <StyledFormItem side={side}>
      <StyledLabel htmlFor={id} style={{ alignSelf: 'start' }}>
        {label}
      </StyledLabel>
      <StyledTextArea rows="2" cols="25" id={id} />
    </StyledFormItem>
  );
}

function DateSelect({ side, label, id }) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <StyledFormItem>
      <StyledLabel>{label}</StyledLabel>
      <DatePicker
        showIcon
        selected={startDate}
        icon={<LuCalendar size={100}/>
        }
      />
    </StyledFormItem>
  );
}

Form.TextShort = TextShort;
Form.TextLong = TextLong;
Form.DateSelect = DateSelect;

export default Form;
