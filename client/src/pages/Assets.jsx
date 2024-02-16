import { Outlet, useLocation } from "react-router-dom";

import styled from "styled-components";

import Tab from "../ui/Tab";
import TabContainer from "../ui/TabContainer";
import Toolbar from "../ui/Toolbar";
import ToolbarPanel from "../ui/ToolbarPanel";
import AddAsset from "../features/assets/AddAsset";
import AssetTableOperations from "../features/assets/AssetTableOperations";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function Assets() {
  const location = useLocation();
  const currentPath = location.pathname.split("/");
  const category = currentPath[currentPath.length - 1];

  return (
    <Container>
      <Toolbar>
        <ToolbarPanel side="left">
          <AddAsset category={category} />
        </ToolbarPanel>
        <ToolbarPanel side="right"></ToolbarPanel>
      </Toolbar>
      <div>
        <TabContainer>
          <Tab route="./equip">Assets</Tab>
          <Tab route="./rooms">Rooms</Tab>
          <Tab route="./personel">People</Tab>
        </TabContainer>
        {/* This renders an AssetTable componenet on each route */}
        <Outlet context={{ category }} />
      </div>
    </Container>
  );
}

export default Assets;
