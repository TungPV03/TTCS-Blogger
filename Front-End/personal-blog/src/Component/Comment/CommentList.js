import { shallowEqual, useDispatch, useSelector } from "react-redux"
import Comment from "./Comment";
import './Comment.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import API from "../../API";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import { toast } from "react-toastify";

export default function CommentList ({blogId}) {
    const dispatch = useDispatch()
    const [cmtContent, setCmtContent] = useState("")
    const [isFetched, setIsFetched] = useState(false);
    const cmtIds = useSelector(state => state.comments
        .filter(
            cmt => cmt.blogId === blogId
        )
        .sort((a, b) => {
            const dateA = moment(a.createdAt, "DD-MM-YYYY HH:mm");
            const dateB = moment(b.createdAt, "DD-MM-YYYY HH:mm");
            return dateB.diff(dateA);
        })
        .map(
            cmt => cmt.id
        ), shallowEqual);
    const hanldePostComment = () => {
        if(cmtContent.trim() === ''){
            return;
        }
        dispatch(API.creatCmt(cmtContent, blogId))
        .then(() => {
            toast.success('Comment created successfully!');
            setCmtContent('');
          })
        .catch((error) => {
            toast.error('Comment created unsuccessfully');
            console.error('Error posting comment:', error);
          });
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            hanldePostComment();
        }
    };
    
    useEffect(
        () => {
            if(!isFetched){
                dispatch(API.fetchCmt());
                setIsFetched(false);
            }
        },
        [isFetched, dispatch]
    );

    return (
        <div className="cmt-list">
            <div className="cmt-input-container">
                <span>You: </span>
                <input 
                    type="text" 
                    className="cmt-input" 
                    placeholder="Enter your comment" 
                    value={cmtContent}
                    onChange={(evt) => setCmtContent(evt.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="post-cmt-btn" onClick={hanldePostComment} >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
            <div className="cmts-container">
                {cmtIds.map(
                    cmtId => (
                        <Comment key={cmtId} id={cmtId}/>
                    )
                )}
            </div>
        </div>
    )
}