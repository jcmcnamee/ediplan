import { createContext, useContext } from "react";
import styled from "styled-components";

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
  grid-template-columns: ${(props) => props.columns};
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

function Table({ columns, headers, values, children }) {
  return (
    <TableContext.Provider value={{ columns, headers, values }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ data, render }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" columns={columns} as="header">
      {data.map(render)}
    </StyledHeader>
  );
}

function Row({ data, render, children }) {
  const { columns, values } = useContext(TableContext);
  console.log(`Chosen values: `, values);
  console.log("Table.Row before reduce: ", data);

  const filteredVals = Object.keys(data).reduce((acc, key) => {
    if (values.includes(key)) {
      acc.push(data[key]);
    }
    return acc;
  }, []);

  console.log("Table.Row after reduce: ", filteredVals);

  const items = filteredVals.map(render);

  return (
    <StyledRow role="row" columns={columns}>
      {items}
      {children}
    </StyledRow>
  );
}

function HeaderItem({ children }) {
  return <StyledHeaderItem>{children}</StyledHeaderItem>;
}

function Item({ children }) {
  return <StyledRowItem>{children}</StyledRowItem>;
}

function Body({ data, render }) {
  if (!data.length) return <Empty>No data to display</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

function Filter() {
  const {values} = useContext(TableContext);

  return 

}

Table.Header = Header;
Table.Footer = Footer;
Table.Row = Row;
Table.Item = Item;
Table.HeaderItem = HeaderItem;
Table.Body = Body;

export default Table;
