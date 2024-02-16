import styled from "styled-components";
import { LuArrowDownUp } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";

import Table from "../../ui/Table";

// const StyledHeaderItem = styled.div`
//   display: flex;
//   justify-content: space-between;
//   border-right: 1px solid var(--color-grey-200);

// `;

const Button = styled.button``;

function AssetHeaderItem({ item }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick() {
    searchParams.set("sortBy");
  }

  return (
    <Table.HeaderItem>
      <div>{item}</div>
      <Button>
        <LuArrowDownUp onClick={handleClick} />
      </Button>
    </Table.HeaderItem>

    // <StyledHeaderItem>
    //   <div>{item}</div>
    //   <Button>
    //     <LuArrowDownUp onClick={handleClick}/>
    //   </Button>
    // </StyledHeaderItem>
  );
}

export default AssetHeaderItem;
