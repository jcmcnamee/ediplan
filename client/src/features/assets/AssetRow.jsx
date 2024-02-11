import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LuCopy, LuPencil, LuTrash2 } from "react-icons/lu";
import styled from "styled-components";

import CreateAssetForm from "./CreateAssetForm";

import { useDeleteAsset } from "./useDeleteAsset";
import { useCreateAsset } from "./useCreateAsset";
import RowItem from "./RowItem";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columnTemplate} 1fr;

  column-gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 2rem;
  line-height: 1.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const FormRow = styled.form`
  display: grid;
  grid-template-columns: ${(props) => props.$columnTemplate} 1fr;

  column-gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 2rem;
  line-height: 1.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

function AssetRow({ asset, category, columnTemplate }) {
  // State
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // if (category === "equip") {
  //   const {
  //     id: assetId,
  //     assetNum,
  //     make,
  //     model,
  //     description,
  //     rate,
  //     rateUnit,
  //     cost,
  //   } = asset;
  //   const assetVals = [assetNum, make, model, description, rate, rateUnit, cost];
  //   const assetKeys = Object.keys(asset).splice(1);
  // }

  // if(category == "rooms") {
  //   const {
  //     id: assetId,
  //     name,
  //     locaton,
  //     use,
  //     rate,
  //     rateUnit,
  //     cost
  //   } = asset;
  // }

  const assetVals = Object.values(asset).splice(1);
  const assetKeys = Object.keys(asset).splice(1);
  console.log(assetVals);
  console.log(assetKeys);
  const assetId = 1;

  // Hooks
  const formMethods = useForm();
  const { deleteAsset, isDeleting } = useDeleteAsset(category);
  const { isCreating, createAsset } = useCreateAsset(category);
  // const { updateAsset, isUpdating } = useUpdateAsset(category);

  // Data from all the fields goes in here

  // function onSubmit(data) {
  //   console.log('submitted');
  //   updateAsset(
  //     { newData: { ...data }, id: assetId },
  //     {
  //       onSuccess: data => {
  //         console.log('Banging success!');
  //         formMethods.reset();
  //         setEditMode(false);
  //       },
  //     }
  //   );
  // }

  function handleDuplicate() {
    // createAsset({
    //   make: `Copy of ${make}`,
    //   model,
    //   description,
    //   price,
    //   priceUnit,
    // });
  }

  return (
    <FormProvider {...formMethods}>
      {editMode ? (
        {
          /*<FormRow
          $columnTemplate={columnTemplate}
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          {assetVals.map((value, index) => (
            <RowItem
              editMode={editMode}
              assetKey={assetKeys[index]}
              key={index}
            >
              {value}
            </RowItem>
          ))}
          <div>
            <button
              onClick={e => {
                e.preventDefault();
                setEditMode(!editMode);
              }}
            >
              <LuPencil />
            </button>
            <button>
              <LuCheckSquare />
            </button>
          </div>
         </FormRow> */
        }
      ) : (
        <>
          <TableRow role="row" $columnTemplate={columnTemplate}>
            {assetVals.map((value, index) => (
              <RowItem
                editMode={editMode}
                assetKey={assetKeys[index]}
                key={index}
              >
                {value}
              </RowItem>
            ))}

            <div>
              {/* <button onClick={() => setEditMode(!setEditMode)}><LuPencil /></button> */}
              <button
                onClick={() => {
                  console.log("click!");
                  setShowForm((show) => !show);
                }}
              >
                <LuPencil />
              </button>
              <button onClick={handleDuplicate} disabled={isCreating}>
                <LuCopy />
              </button>
              <button
                onClick={() => deleteAsset(assetId)}
                disabled={isDeleting}
              >
                <LuTrash2 />
              </button>
            </div>
          </TableRow>
          {showForm && (
            <CreateAssetForm category={category} assetToUpdate={asset} />
          )}
        </>
      )}
    </FormProvider>
  );
}

export default AssetRow;
