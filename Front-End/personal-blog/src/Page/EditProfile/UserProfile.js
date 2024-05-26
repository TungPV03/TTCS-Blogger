import { useParams } from "react-router-dom";
import Bloglist from "../../Component/BlogList/Bloglist";
import Navigation from "../../Component/Navigation/Navigation";
import API from "../../API";
import { useEffect, useState } from "react";

export default function UserProfile(){
    const {userId} = useParams();
    const [user, setUser] = useState({});

    useEffect(
        () => {
            API.getUserById(userId).then(
                (res) => {
                    setUser(res);
                }
            ).catch(e => console.error(e))
        }, []
    )

    return (
        <div className="user-profile-container">
            <Navigation />
            <div className="edit-profile">
                <div className="user-avatar">
                    <img src={user.imgURL} alt="" />
                </div>
                <div className="user-infor-container">
                    <div className="user-infor">
                        <span className="user-infor-span">Email: </span>
                        <span className="user-infor-detail">{user.email}</span>
                    </div>
                    <div className="user-infor">
                        <span className="user-infor-span">UserName: </span>
                        <span className="user-infor-detail">{user.name}</span>
                    </div>
                    <div className="user-infor">
                        <span className="user-infor-span">Full Name: </span>
                        <span className="user-infor-detail">{user.displayName}</span>
                    </div>
                    <div className="user-infor">
                        <span className="user-infor-span">Date of birth: </span>
                        <span className="user-infor-detail">{user.dob}</span>
                    </div>
                    <div className="user-infor">
                        <span className="user-infor-span">Phone number: </span>
                        <span className="user-infor-detail">{user.phoneNumber}</span>
                    </div>
                </div >
            </div>
            <div className="cur-user-blogs">
                <Bloglist userId={user.id}/>
            </div>
        </div>
    )
}