import { LuCopy, LuPencil, LuTrash2 } from "react-icons/lu";
import { useOutletContext } from "react-router-dom";

import { useDeleteAsset } from "./useDeleteAsset";
import { useCreateAsset } from "./useCreateAsset";

import CreateAssetForm from "./CreateAssetForm";
import RowItem from "./RowItem";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useContext } from "react";

function AssetRow({ asset }) {
  const { category } = useOutletContext();
  // const {
  //   id: assetId,
  //   assetTag,
  //   make,
  //   model,
  //   description,
  //   rate,
  //   rateUnit,
  // } = asset;
  // const assetVals = [assetTag, make, model, description, rate, rateUnit];

  const { id: assetId, ...assetVals } = asset;

  // Hooks
  const { deleteAsset, isDeleting } = useDeleteAsset(category);
  const { isCreating, createAsset } = useCreateAsset(category);

  function handleDuplicate() {
    createAsset({ ...asset });
  }
  // function handleDuplicate() {
  //   createAsset({
  //     assetTag,
  //     make: `Copy of ${make}`,
  //     model,
  //     description,
  //     rate,
  //     rateUnit,
  //   });
  // }

  // NEED TO FIGURE OUT HOW I ACCESS THE HEADERS DATA HERE TO FILTER THE ROW ITEMS FFS
  return (
    <Table.Row data={asset} render={(value, i) => <RowItem item={value} key={i} />}>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={assetId} />
            <Menus.List id={assetId}>
              <Menus.Button icon={<LuCopy />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>
              <Modal.Open opensWindowName="edit">
                <Menus.Button icon={<LuPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opensWindowName="delete">
                <Menus.Button icon={<LuTrash2 />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="edit">
            <CreateAssetForm category={category} assetToUpdate={asset} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={"equip"}
              disabled={isDeleting}
              onConfirm={() => deleteAsset(assetId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default AssetRow;
