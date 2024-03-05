import {
  Outlet,
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import styled from "styled-components";

import Tab from "../ui/Tab";
import TabContainer from "../ui/TabContainer";
import Toolbar from "../ui/Toolbar";
import ToolbarPanel from "../ui/ToolbarPanel";
import AddAsset from "../features/assets/AddAsset";
import AssetTableOperations from "../features/assets/AssetTableOperations";
import { useAssets } from "../features/assets/useAssets";
import Table from "../ui/Table";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import { getAssetFriendlyName } from "../utils/helpers";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const tableOptions = {
  equip: {
    displayHeaders: ["Tag No.", "Make", "Model", "Description", "Rate", "Unit"],
    columnTemplate: "0.9fr 1fr 1fr 3fr 0.5fr 0.5fr 0.3fr",
  },
  rooms: {
    displayHeaders: ["Name", "Location", "Use", "Rate", "Unit"],
    columnTemplate: "1fr 1fr 1fr 0.5fr 0.5fr 0.15fr",
  },
  personel: {
    displayHeaders: ["Name", "Job", "Address", "Phone", "Email", "Rate"],
    columnTemplate: "1.5fr 1fr 2fr 1fr 2fr 1fr 0.15fr",
  },
};

function Assets() {
  const navigate = useNavigate();
  const { category } = useParams();
  console.log("Assets.jsx render. category: ", category);

  useEffect(() => {
    if (!category) {
      navigate("equip");
    }
  }, [category, navigate]);

  // const headerData = tableOptions["equip"].headers;
  // const columnWidths = tableOptions["equip"].columnTemplate;
  // const values = tableOptions[category].values;

  const { data: assets, error, isPending } = useAssets(category);

  if (error) return <div>{error}</div>;
  if (isPending || !category) return <Spinner />;

  const data = assets.rowData;
  const tableMetadata = assets.metadata;

  // Update column selector tool
  const headers = tableMetadata.map((column) =>
    getAssetFriendlyName(column.columnName)
  );

  // Return chosen columns to display
  const displayColumns = tableOptions[category].displayHeaders;
  const columnWidths = tableOptions[category].columnTemplate;

  return (
    <Table displayColumns={displayColumns} columnWidths={columnWidths}>
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
          <Outlet context={{ category, data }} />
        </div>
      </Container>
    </Table>
  );
}

export default Assets;
