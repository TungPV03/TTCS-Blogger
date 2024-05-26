import {Link} from 'react-router-dom';

export default function UserList ({userList}){
    return (
        <div>
            { userList ?
               userList.map(user => (
                    <div key={user.id}>
                        <Link to={`/users/${user.id}`}>
                            <div className='user-container'>
                                <div className='user-img'>
                                    <img src={user.imgURL} alt="" />
                                </div>
                                <div className='user-name'>{user.name}</div>
                            </div>
                        </Link>
                    </div>
                )
               )
               :
               <div>No user found</div>
            }
        </div>
    )
}