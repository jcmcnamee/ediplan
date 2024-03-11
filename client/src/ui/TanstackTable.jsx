import { createContext, useContext } from "react";
import styled from "styled-components";
import { getAssetVariableName, getBookingVariableName } from "../utils/helpers";

// import Empty from "./Empty";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columnWidths};
  column-gap: 1.8rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledRow = styled(CommonRow)`
  padding: 0.5rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const CommonItem = styled.div`
  border-right: 1px solid var(--color-grey-200);
  overflow-wrap: anywhere;
`;

const StyledRowItem = styled(CommonItem)``;

const StyledHeaderItem = styled(CommonItem)`
  display: flex;
  justify-content: space-around;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

function TanstackTable({table}) {
    


    return (
        <div>
            
        </div>
    )
}

export default TanstackTable
