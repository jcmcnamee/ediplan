import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import styled from "styled-components";

import CreateAssetForm from "../features/assets/CreateAssetForm";
import Tab from "../ui/Tab";
import TabContainer from "../ui/TabContainer";
import Toolbar from "../ui/Toolbar";
import ToolbarButton from "../ui/ToolbarButton";
import ToolbarPanel from "../ui/ToolbarPanel";
import AddAsset from "../features/assets/AddAsset";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const column = new Map();

column.set("assetNum", "Asset No.").set("Make", "make");

const tableOptions = {
  equip: {
    headers: ["Asset No.", "Make", "Model", "Description", "Rate", ""],
    columnTemplate: "0.5fr 1fr 1fr 3fr 0.5fr 0.5fr",
  },
  rooms: {
    headers: ["Name", "Location", "Use", "Rate", "Unit"],
    columnTemplate: "1fr 1fr 1fr 0.5fr 0.5fr",
  },
  personel: {
    headers: ["Name", "Address", "Phone", "email", "Rate"],
    columnTemplate: "1.5fr 2fr 1fr 2fr 1fr",
  },
};

function Assets() {
  const location = useLocation();
  const currentPath = location.pathname.split("/");
  const category = currentPath[currentPath.length - 1];
  console.log(category);

  return (
    <Container>
      <Toolbar>
        <ToolbarPanel side="left">
          <ToolbarButton>+</ToolbarButton>
          <AddAsset category={category} />
        </ToolbarPanel>
      </Toolbar>
      <div>
        <TabContainer>
          <Tab route="./equip">Assets</Tab>
          <Tab route="./rooms">Rooms</Tab>
          <Tab route="./personel">People</Tab>
        </TabContainer>
        <Outlet context={{ tableOptions, category }} />
      </div>
    </Container>
  );
}

export default Assets;
