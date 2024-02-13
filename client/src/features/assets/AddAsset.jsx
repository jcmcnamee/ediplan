import Button from "../../ui/Button";
import CreateAssetForm from "./CreateAssetForm";
import Modal from "../../ui/Modal";


function AddAsset({ category }) {
  return (
    <Modal>
      <Modal.Open opensWindowName="asset-form">
        <Button>Add new asset</Button>
      </Modal.Open>
      <Modal.Window name="asset-form">
        <CreateAssetForm category={category} />
      </Modal.Window>

      {/* MULTIPLE THINGS/WINDOWS ARE ALLOWED! */}
      <Modal.Open opensWindowName="table">
        <Button>Add new asset</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CreateAssetForm category={category} />
      </Modal.Window>
    </Modal>
  );
}

export default AddAsset;

// function AddAsset({ category }) {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   console.log(isOpenModal);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new asset
//       </Button>
//       {isOpenModal && (
//         <Modal
//           onClose={() => {
//             setIsOpenModal(false);
//           }}
//         >
//           <CreateAssetForm
//             category={category}
//             onCloseModal={() => setIsOpenModal(false)}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// }