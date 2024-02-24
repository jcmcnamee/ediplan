import { useOutletContext, useSearchParams } from "react-router-dom";

import { useAssets } from "./useAssets";

import Spinner from "../../ui/Spinner";
import AssetRow from "./AssetRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import AssetHeaderItem from "./AssetHeaderItem";

const tableOptions = {
  equip: {
    headers: ["Tag No.", "Make", "Model", "Description", "Rate", "per"],
    values: ["assetTag", "make", "model", "description", "rate", "rateUnit"],
    columnTemplate: "0.9fr 1fr 1fr 3fr 0.5fr 0.5fr 0.3fr",
  },
  rooms: {
    headers: ["Name", "Location", "Use", "Rate", "Unit"],
    values: ["name", "location", "use", "rate", "rateUnit"],
    columnTemplate: "1fr 1fr 1fr 0.5fr 0.5fr 0.15fr",
  },
  personel: {
    headers: ["Name", "Job", "Address", "Phone", "Email", "Rate"],
    values: ["firstName", "role", "address", "phone", "email", "rate"],
    columnTemplate: "1.5fr 1fr 2fr 1fr 2fr 1fr 0.15fr",
  },
};

function AssetTable() {
  const { category } = useOutletContext();
  const { data, error, isPending } = useAssets(category);
  
  const [searchParams] = useSearchParams();
  
  const selectedHeaders = tableOptions[category].headers;
  const columns = tableOptions[category].columnTemplate;
  const values = tableOptions[category].values;
  
  if (isPending) return <Spinner />;
  
  const assets = data.rowData;
  const tableMetadata = data.tableMetadata;

  // const filterValue = searchParams.get("rateUnit") || "all";
  
  // let filteredAssets;
  // if (filterValue === "all") filteredAssets = assets;
  // if (filterValue === "daily")
  //   filteredAssets = assets.filter((asset) => asset.rateUnit === "Day");
  // if (filterValue === "hourly")
  //   filteredAssets = assets.filter((asset) => asset.rateUnit === "Hour");

  // const sortBy = searchParams.get("sortBy") || "name-asc";

  return (
    <Menus>
      <Table columns={columns} headers={selectedHeaders} values={values}>
        <Table.Header
          data={selectedHeaders}
          render={(headerItem, i) => <AssetHeaderItem item={headerItem} key={i}/>}
        />

        <Table.Body
          data={assets}
          render={(asset) => <AssetRow asset={asset} key={asset.id} />}
        />
      </Table>
    </Menus>
  );
}

export default AssetTable;
