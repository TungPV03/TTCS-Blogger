import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import API from '../../API';
import './Comment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../FirebaseConfig/firebaseConfig';

export default function Comment({id}){
    const cmt = useSelector(state => state.comments.find(cmt => cmt.id === id));
    const isAuth = useSelector(state => state.isAuth);

    const [cmtUser, setCmtUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await API.getUserById(cmt.userId);
                setCmtUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [cmt.userId]);
    return isAuth && (
        <div className="cmt-container">
            <div className='user-avt'>
                <img src={cmtUser?.imgURL} alt="" />
            </div>
            <div className='cmt-body'>
                <div className="cmt-user">
                    <div className="user-name">
                        {cmtUser?.name}
                    </div>
                    <div className='cmt-time'>
                        {cmt?.createdAt}
                    </div>
                    {auth.currentUser.uid === cmt.userId &&
                        <button className='blog-del'>
                            <FontAwesomeIcon icon={faTrash} className='del-btn'/>
                        </button>
                    }
                </div>
                <div className='cmt'>
                    {cmt?.content}
                </div>
            </div>
        </div>
    )
}