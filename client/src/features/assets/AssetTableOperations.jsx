import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function AssetTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={"rateUnit"}
        options={[
          { value: "all", label: "All" },
          { value: "daily", label: "Daily" },
          { value: "hourly", label: "Hourly" },
        ]}
      />

      <SortBy options={[
        {value: "name-asc", label: "Sort by name (A-Z)"},
        {value: "name-desc", label: "Sort by name (Z-A)"},
        {value: "rate-asc", label: "Sort by rate (lowest first)"},
        {value: "rate-desc", label: "Sort by rate (highest first)"}
    ]} />
    </TableOperations>
  );
}

export default AssetTableOperations;
