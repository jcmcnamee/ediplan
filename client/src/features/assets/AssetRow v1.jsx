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

function AssetRow({ asset }) {
  const { category } = useOutletContext();
  const {
    id: assetId,
    assetTag,
    make,
    model,
    description,
    rate,
    rateUnit,
  } = asset;
  const assetVals = [assetTag, make, model, description, rate, rateUnit];

  // Hooks
  const { deleteAsset, isDeleting } = useDeleteAsset(category);
  const { isCreating, createAsset } = useCreateAsset(category);

  function handleDuplicate() {
    createAsset({
      assetTag,
      make: `Copy of ${make}`,
      model,
      description,
      rate,
      rateUnit,
    });
  }

  return (
    <Table.Row>
      {assetVals.map((value, index) => (
        <RowItem key={index}>{value}</RowItem>
      ))}

      <div>
        {/* <button onClick={() => setEditMode(edit => !edit)}><LuPencil /></button> */}
        <Modal>
          <Modal.Open opensWindowName="edit">
            <button>
              <LuPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateAssetForm category={category} assetToUpdate={asset} />
          </Modal.Window>
          <button onClick={handleDuplicate} disabled={isCreating}>
            <LuCopy />
          </button>
          <Modal.Open opensWindowName="delete">
            <button>
              <LuTrash2 />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={"equip"}
              disabled={isDeleting}
              onConfirm={() => deleteAsset(assetId)}
            />
          </Modal.Window>
        </Modal>

        <Menus.Menu>
          <Menus.Toggle id={assetId} />
          <Menus.List id={assetId}>
            <Menus.Button icon={<LuCopy />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>
            <Menus.Button icon={<LuPencil />}>Edit</Menus.Button>
            <Menus.Button icon={<LuTrash2 />}>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}

export default AssetRow;
