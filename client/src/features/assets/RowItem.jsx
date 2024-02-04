import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

const StyledRowItem = styled.div`
  font-size: var(--table-font-size);
  font-weight: var(--table-font-weight);
  border-right: 1px solid var(--color-grey-200);
  overflow-wrap: anywhere;
`;

const StyledInput = styled.input`
  /* font-size: var(--table-font-size);
  font-weight: var(--table-font-weight);
  border-right: 1px solid var(--color-grey-200);
  overflow-wrap: anywhere; */
  width: 100%;
`;

// USE TERNARY CONDITIONAL STATEMENET IN HERE
// ALSO NEED TO DO SOMETHING ABOUT PRICE PER DAY
function RowItem({ children, editMode, assetKey }) {
  const { register, setValue } = useFormContext();

  useEffect(
    function () {
      setValue(assetKey, children);
    },
    [children, setValue, assetKey]
  );

  return !editMode ? (
    <StyledRowItem>{children}</StyledRowItem>
  ) : assetKey === 'priceUnit' ? (
    <select
      type="text"
      id={assetKey}
      defaultValue={children}
      {...register(assetKey)}
    >
      <option>Hour</option>
      <option>Day</option>
    </select>
  ) : (
    <StyledInput
      type="text"
      id={assetKey}
      defaultValue={children}
      {...register(assetKey)}
    />
  );
}

export default RowItem;
