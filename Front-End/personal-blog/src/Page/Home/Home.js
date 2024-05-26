import "./Home.css";
import Navigation from "../../Component/Navigation/Navigation";
import Bloglist from "../../Component/BlogList/Bloglist";
import { useDispatch, useSelector } from "react-redux";
import Asset from "../../Component/Asset/Asset";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../../API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../Component/FirebaseConfig/firebaseConfig";


export default function Home() {
    const isAuth = useSelector(state => state.isAuth);
    const goTo = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isAuth || !auth.currentUser) {
            goTo('/login');
        }
        else {
            dispatch(API.fetchCurrentUser());
        }
    }, [isAuth]);
    return (
        <div className="Home" id="home">
            <Navigation />
            <div className="page-body">
                <Bloglist />
                <Asset />
            </div>
            <div className="goTop">
                <a href="#home">
                    <FontAwesomeIcon icon={faArrowCircleUp} />
                </a>
            </div>
        </div>
    )
}