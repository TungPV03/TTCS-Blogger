import { shallowEqual, useSelector } from 'react-redux';
import './Bloglist.css';
import Blog from './Blog';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Bloglist({userId}){
    const goto = useNavigate();
    const blogsId = useSelector(state => {
        let filterBlogs = state.blogs;
        if(userId){
            filterBlogs = filterBlogs.filter(blog => blog.userId === userId);
        }
        return filterBlogs
            .slice()
            .sort((a, b) => {
                const dateA = moment(a.createdAt, "DD-MM-YYYY HH:mm");
                const dateB = moment(b.createdAt, "DD-MM-YYYY HH:mm");
                return dateB.diff(dateA);
            })
            .map(blog => blog.id)
        },shallowEqual
    );
    return (
        <div className="bloglist">
            <button className='create-post-btn' onClick={() => goto('/home/createpost')}>
                -----------------------------------------------
                <FontAwesomeIcon icon={faPlus} className='create-icon'/>
                -----------------------------------------------
            </button>
            {
                blogsId.map(id => (
                    <Blog key={id} id={id}/>
                ))
            }
        </div>
    )
}