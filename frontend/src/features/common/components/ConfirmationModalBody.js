import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_CLOSE_TYPES,
} from "../../../utils/globalConstantUtil";
import { deleteLead } from "../../leads/leadSlice";
import { showNotification } from "../headerSlice";
import { deleteEmployee } from "../../employeeManagement/employeeSlice";
import { deleteZoneDetails } from "../../products/productSlice";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  const { message, type, _id, index, toastMsg, zone, product } = extraObject;

  const proceedWithYes = async () => {
    // if (type === CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE) {
    //   // positive response, call api or dispatch redux function
    //   dispatch(deleteLead({ index }));
    //   dispatch(showNotification({ message: toastMsg, status: 1 }));
    // }
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.EMPLOYEE_DELETE) {
      dispatch(deleteEmployee(_id));
      dispatch(showNotification({ message: toastMsg, status: 1 }));
    }
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.ZONE_DETAILS_DELETE) {
      dispatch(deleteZoneDetails({ _id, zone, product }));
      dispatch(showNotification({ message: toastMsg, status: 1 }));
    }
    closeModal();
  };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary w-36"
          onClick={() => proceedWithYes()}
        >
          Yes
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
