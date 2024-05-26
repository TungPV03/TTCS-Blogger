import { MDBBtn } from "mdb-react-ui-kit";
import "./styles.css";

export default function EditProfile({setEditingProfile}){
    return (
        <div className="edit-profile-form">
            <div className="edit-profile-container">
                <h2>Edit profile</h2>
                <div className="edit-profile-inp-container">
                    <label className="edit-profile-inp">
                        <input type="text" />
                    </label>
                    <label className="edit-profile-inp">
                        <input type="text" />
                    </label>
                    <label className="edit-profile-inp">
                        <input type="text" />
                    </label>
                </div>
                <div className="btn-container">
                    <MDBBtn color="success">Save</MDBBtn>
                    <MDBBtn color="dark" onClick={() => setEditingProfile(false)}>Cancel</MDBBtn>
                </div>
            </div>
        </div>
    )
}