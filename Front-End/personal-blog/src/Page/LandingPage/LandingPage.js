import { Link } from "react-router-dom";
import "./LandingPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEnvelope, faHeart, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {   
    return (
        <div className="landing-page" >
            <div className="hero-section" style={{ backgroundImage: "url(img/landing-page-bg.jpg)" }}>
                <div className="hero-content">
                    <h2 className="header-text">Welcome to</h2>
                    <span className="logo">Blog<span className="logo-highlight">ger</span></span>
                    <p>
                    Where you may communicate with individuals via blogs and exchange
                    personal blogs. Explore diverse topics, share your thoughts, and
                    engage with others in the Blogger community.
                    </p>
                    <p>
                    Join us today and start sharing your stories, experiences, and ideas
                    with the world. Whether you're passionate about travel, technology,
                    food, or anything in between, Blogger provides a platform for you to
                    express yourself and connect with like-minded individuals.
                    </p>
                    <div className="login-signup-btn-container">
                        <Link to={'/login'} className="login-signup-btn" >
                            Log In
                        </Link>
                        <Link to={'/signup'} className="login-signup-btn">
                            Sign up
                        </Link>
                    </div>
                </div>
                <div className="hero-blog-card-container">
                    <div className="blog-card">
                        <div className="blog-header">
                            <div className="avt">
                                <FontAwesomeIcon icon={faUser} className="avt-img"/>
                            </div>
                            <div className="user-name">TungPV</div>
                            <div className="time-stamp">20:37 16/04/2024</div>
                        </div>
                        <div className="blog-img-container">
                            <div className="blog-content">
                                The most adorable cat I've ever seen
                            </div>
                            <div className="blog-img">
                                <img src="./img/cat.jpg.webp" alt="" />
                            </div>
                            <div className="react">
                                <FontAwesomeIcon className="react-icon" icon={faHeart}/>
                                <span className="react-count">9999</span>
                                <FontAwesomeIcon className="react-icon" icon={faComment}/>
                                <span className="react-count">1204</span>
                            </div>
                        </div>
                        <div className="cmt-section">
                            <div className="cmt">
                                <div className="cmt-avt">
                                    <img src="./img/user1.jpeg" className="user-avt" alt="" />
                                </div>
                                <div className="cmt-user-time-cmt">
                                    <div className="cmt-user-time">
                                        <div className="cmt-user-name">thienhuong</div>
                                        <div className="cmt-time-stamp">21:15 16/04/2024</div>
                                    </div>
                                    <div className="cmt-content">Wow it's so cute !</div>
                                </div>
                            </div>
                            <div className="cmt">
                                <div className="cmt-avt">
                                    <img src="./img/user2.jpeg" className="user-avt" alt="" />
                                </div>
                                <div className="cmt-user-time-cmt">
                                    <div className="cmt-user-time">
                                        <div className="cmt-user-name">viettung</div>
                                        <div className="cmt-time-stamp">21:20 16/04/2024</div>
                                    </div>
                                    <div className="cmt-content">Not as cute as you!</div>
                                </div>
                            </div>
                            <div className="more-comment">---Load more comments---</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact">
                <div className="contact-detail">
                    <a href="https://www.facebook.com/phamtungqvql" target="_blank">
                        <i className="fa-brands fa-facebook link-icon"></i>
                        <span className="link-text">Pham Viet Tung</span>
                    </a>
                </div>
                <div className="contact-detail">
                    <FontAwesomeIcon icon={faPhone} className="link-icon"/>
                    <span className="link-text"> +84 34-549-81-63</span>
                </div>
                <div className="contact-detail">
                    <FontAwesomeIcon icon={faEnvelope} className="link-icon"/>
                    <span className="link-text">tungpv03.work@gmail.com</span>
                </div>
            </div>
        </div>
  );
}
