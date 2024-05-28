import { MDBBtn } from "mdb-react-ui-kit";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import API from "../../API";

export default function EditProfile({ setEditingProfile }) {
  const user = useSelector((state) => state.user);
  const fullnameRef = useRef(null);
  const dobRef = useRef(null);
  const phoneRef = useRef(null);
  const dispatch = useDispatch();

  const handleUpdateUserProfile = () => {
    const data = {
      displayName: fullnameRef.current.value,
      phoneNumber: phoneRef.current.value,
      dob: moment(dobRef.current.value).format("DD/MM/YYYY"),
    };

    try {
      dispatch(API.updateUser(data, user.id));
      toast.success("Updated profile successfully");
      setEditingProfile(false);
    } catch (e) {
      toast.error("Error to update profile!");
    }
  };
  return (
    <div className="edit-profile-form">
      <div className="edit-profile-container">
        <h2>Edit profile</h2>
        <div className="edit-profile-inp-container">
          <label className="edit-profile-inp">
            <span>Full Name: </span>
            <input
              type="text"
              defaultValue={user.displayName || "Not set"}
              ref={fullnameRef}
            />
          </label>
          <label className="edit-profile-inp">
            <span>Date of birth: </span>
            <input type="date" ref={dobRef} />
          </label>
          <label className="edit-profile-inp">
            <span>Phone Number: </span>
            <input
              type="text"
              ref={phoneRef}
              defaultValue={user.phoneNumber || "Not set"}
            />
          </label>
        </div>
        <div className="btn-container">
          <MDBBtn color="success" onClick={handleUpdateUserProfile}>Save</MDBBtn>
          <MDBBtn color="dark" onClick={() => setEditingProfile(false)}>
            Cancel
          </MDBBtn>
        </div>
      </div>
    </div>
  );
}
