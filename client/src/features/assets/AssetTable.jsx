import { useOutletContext, useSearchParams } from "react-router-dom";

import { useAssets } from "./useAssets";

import Spinner from "../../ui/Spinner";
import AssetRow from "./AssetRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import AssetHeaderItem from "./AssetHeaderItem";

function AssetTable() {
  const { category } = useOutletContext();
  const [searchParams] = useSearchParams();

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
      <Table.Header
        render={(headerItem, i) => (
          <AssetHeaderItem item={headerItem} key={i} />
        )}
      />

      <Table.Body
        render={(asset) => <AssetRow asset={asset} key={asset.id} />}
      />
    </Menus>
  );
}

export default AssetTable;
