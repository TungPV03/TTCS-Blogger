import { faComment, faHeart, faTrash, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux"
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig/firebaseConfig";
import API from "../../API";
import { MDBBtn } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import './Blog.css';
import CommentList from "../Comment/CommentList";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Blog ({id}){
    const isAuth = useSelector(state => state.isAuth);
    const blog = useSelector(state => state.blogs.find(blog => blog.id === id));
    const user = useSelector(state => state.user);
    const [showAlert, setShowAlert] = useState(false);
    const [like, setLike] = useState(false);
    const [userFetched, setUserFetched] = useState(false);
    const dispatch = useDispatch();
    const [showCmt, setShowCmt] = useState(false);
    const deleleBlog = async (blogId) => {
        const blogDoc = doc(db, '/blogposts', blogId);
        dispatch({type: "blogs/deletedBLog", payload: blogId})
        await deleteDoc(blogDoc)
        .then(() => {
            toast.success('Blog deleted successfully!');
          })
        .catch((error) => {
            toast.error('Blog deleted unsuccessfully');
            console.error('Error delete blog comment:', error);
          });;
    }

    const [blogUser, setBlogUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await API.getUserById(blog.userId);
                setBlogUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [blog.userId]);

    useEffect(() => {
        if (user && Array.isArray(user.likedBlog) && !userFetched) {
            setLike(user.likedBlog.includes(id));
            setUserFetched(true);
        }
    }, [user, id, userFetched]);

    const handleLike = () => {
        setLike(!like);
        dispatch(API.changeLikeCount(!like,blog.likeCount,id));
    }

    return(
        <div className="blog-card-container">
            <div className="blog-card-header">
                <div className="user-img">
                    <img src={blogUser?.imgURL} alt="" />
                </div>
                <div className="blog-name-time">
                    <div className="user-name">
                    <Link className="user-link" to={`/users/${blog.userId}`}>
                        {blogUser?.name}
                    </Link>
                    </div>
                    <div className="blog-time">{blog.createdAt}</div>
                </div>
                {isAuth && blog.userId === auth.currentUser.uid &&
                    <div className="blog-del" onClick={() => setShowAlert(true)}>
                        <FontAwesomeIcon className="del-btn" icon={faTrash}/>
                    </div>

                }
                {showAlert && 
                    <div className="alert-container">
                        <div className="alert">
                            <FontAwesomeIcon className="alert-icon" icon={faWarning}/>
                            <p>Are you sure to delete this blog?</p>
                            <div className="alert-btns">
                                <MDBBtn color="danger" className="delete-btn" onClick={() => deleleBlog(id)}>DELETE</MDBBtn>
                                <MDBBtn color="dark" className="cancel-btn" onClick={() => setShowAlert(false)}>CANCEL</MDBBtn>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="blog-body">
                <div className="blog-title">
                    {blog?.title}
                </div>
                <div className="blog-content">
                    {blog?.content}
                </div>
                <div className="blog-img">
                    <img src={blog?.imgUrl} alt="" />
                </div>
                <div className="blog-react-items">
                    <div className="blog-react-item-container">
                        <button className="blog-react-item" >
                            <FontAwesomeIcon
                             className={"blog-react-icon" + (like? " liked" : "")}
                             icon={faHeart}
                              onClick={handleLike}/>
                        </button>
                        <span className="react-cnt">{blog.likeCount}</span>
                    </div>
                    <div className="blog-react-item-container">
                        <button className="blog-react-item">
                            <FontAwesomeIcon 
                                className="blog-react-icon" 
                                icon={faComment} 
                                onClick={() => setShowCmt(!showCmt)}
                            />
                        </button>
                    </div>
                </div>
            </div>
            {showCmt &&
                <div className="body-footer">
                    <CommentList blogId={id}/>
                </div>
            }
        </div>
    )
}