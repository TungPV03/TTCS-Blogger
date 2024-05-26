import { useState } from "react";
import "./CreatePost.css";
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import API from "../../API";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faCamera } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const dispatch = useDispatch();
  const goTo = useNavigate();

  const handleCreatPost = (title, content, img, goTo) => {
    if(title === "" || content === ""){
      alert("Empty title or content!");
    }
    else{
      dispatch(API.createPost(title, content, img, goTo))
      .then(() => {
        toast.success('Blog created successfully!');
      })
    .catch((error) => {
        toast.error('Blog created unsuccessfully');
        console.error('Error posting comment:', error);
      });;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    if(file) setImgUrl(URL.createObjectURL(file));
  }

  const hanleClick = () => {
    goTo("/home");
  }

  return (
    <div className="create-post" style={{backgroundImage: 'url(/img/contact-bg.jpg)'}}> 
        <button className="backward" onClick={hanleClick}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="backward-icon"/>
        </button>
        <div className="create-post-container">
            <h1 className="cp-title">Create a post</h1>
            <input
              className="text-inp"
              id="title-inp"
              type="text"
              placeholder="#Title here..."
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="text-inp"
              name="content"
              id="textarea-content"
              cols="30"
              rows="5"
              placeholder= "Content here"
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="img-upload">
              <label>
                {imgUrl ? 
                  <img src={imgUrl} alt="preview-img"/> :
                  <FontAwesomeIcon className="upload-icon" size="10x" icon={faCamera} />}
                <input className="img-inp" type="file" onChange={handleFileChange} />
              </label>
            </div>
            <MDBBtn
              className="me-1"
              color="success"
              onClick={() => handleCreatPost(title, content, img, goTo)}
            >
              Post
            </MDBBtn>
        </div>
    </div>
  );
}
