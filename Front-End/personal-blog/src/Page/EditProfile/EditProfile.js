import { useDispatch, useSelector } from "react-redux";
import "./EditProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare,faCamera } from "@fortawesome/free-solid-svg-icons";
import Bloglist from "../../Component/BlogList/Bloglist";
import Navigation from "../../Component/Navigation/Navigation";
import { useState } from "react";
import { useRef } from "react";
import API from "../../API";
import { toast } from "react-toastify";
import { MDBBtn } from "mdb-react-ui-kit";
import EditProfileForm from "../../Component/Form/EditProfileForm";

export default function EditProfile(){
    const [img, setImg] = useState(null);
    const dispatch = useDispatch()
    const imgRef = useRef(null);
    const user = useSelector(state => state.user);
    const [editingProfile, setEditingProfile] = useState(false);

    const handleChangeAvt = async () => {
        await imgRef.current.click();
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setImg(selectedFile);
            dispatch(API.uploadAvt(selectedFile, user.id))
            .then(() => {
                toast.success("Avatar changed successfully!")
            }).catch(() => {
                toast.error("Avatar changed unsuccessfully!")
            })
        }
    }

    return (
        <div className="user-profile-container">
            <Navigation />
            <div className="edit-profile">
                <div className="user-avatar">
                    <img src={user.imgURL} alt="" />
                    <button className="changeAvt" onClick={handleChangeAvt}>
                        <FontAwesomeIcon icon={faCamera} className='change-avt-icon'/>
                    </button>
                    <input type="file" style={{display: "none"}} ref={imgRef} onChange={handleFileChange}/>
                </div>
                <div className="user-infor-container">
                    <div className="user-infor">
                        <span className="user-infor-span">Email: </span>
                        <span className="user-infor-detail">{user.email}</span>
                    </div>
                    <div className="user-infor">
                        <span className="user-infor-span">Name: </span>
                        <span className="user-infor-detail">{user.name}</span>
                    </div>
                    <div className="user-infor">
                        <span className="user-infor-span">Full Name: </span>
                        <span className="user-infor-detail">
                            {user.displayName || "Not set"}
                        </span>
                    </div>
                    <div className="user-infor">
                        <span className="user-infor-span">Date of birth: </span>
                        <span className="user-infor-detail">{user.dob || "Not set"}</span>
                    </div>
                    <div className="user-infor">
                        <span className="user-infor-span">Phone number: </span>
                        <span className="user-infor-detail">{user.phoneNumber || "Not set"}</span>
                    </div>
                    <div className="edit-profile-btn">
                        <MDBBtn color="success" onClick={() => setEditingProfile(true)}>
                           <span>Edit profile </span>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </MDBBtn>
                    </div>
                </div >
            </div>
            <div className="cur-user-blogs">
                <Bloglist userId={user.id}/>
            </div>
            {editingProfile && 
                <EditProfileForm setEditingProfile={setEditingProfile} />
            }
        </div>
    )
}
