import './Asset.css';
import { auth } from '../FirebaseConfig/firebaseConfig';
import { signOut } from 'firebase/auth';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Asset () {
    const user = useSelector(state => state.user);
    const goTo = useNavigate()
    const dispatch = useDispatch();
    const handleLogout = async () => {
    try {
        await signOut(auth);
        dispatch({ type: 'auth/setIsAuth', payload: false });
        dispatch({ type: 'user/clearUser' });
        localStorage.removeItem('isAuth');
        goTo('/');
    } catch (error) {
        console.error('Logout error:', error);
    }
};

    return (
        <div className='asset-container'>
            <div className='user-img-name asset-item'>
                <div className="user-img">
                    <img src={user.imgURL} alt="" />
                </div>
                <div className='user-name'>
                    {user?.name}
                </div>
                <button className='edit-profile-btn' onClick={() => goTo('/home/edit-profile')}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </div >
            <div className='user-email asset-item'>
                <span className='user-infor-span'>Email: </span>
                <span className='user-infor-detail'>{user?.email}</span>
            </div>
            <div className="user-fullname asset-item" >
                <span className="user-infor-span">Full Name: </span>
                <span className="user-infor-detail">{user?.displayName || "Not set"}</span>
            </div>
            <div className='user-phone asset-item'>
                <span className='user-infor-span'>Phone Number: </span>
                <span className='user-infor-detail'>{user?.phoneNumber || "Not set"}</span>
            </div>
            <div className='user-dob asset-item'>
                <span className='user-infor-span'>DOB: </span>
                <span className='user-infor-detail'>{user?.dob || "Not set"}</span>
            </div>
            <div className='asset-item holder'></div>
            <div className="logout-btn asset-item">
                <MDBBtn className='me-1' color='danger' onClick={handleLogout}>
                    Log out
                </MDBBtn>
            </div>
        </div>
    )
}
