import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navigation.css';
import { useState } from 'react';
import { faHome, faSearch, faUser, faX } from '@fortawesome/free-solid-svg-icons';
import UserList from "./UserList";
import API from "../../API";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navigation (){
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const goTo = useNavigate();
    const user = useSelector(state => state.user);

    console.log(user)

    const search = (e) => {
        setQuery(e.target.value)
    }
    
    const searchUsers = async () => {
        setShowSearchResult(true);
        try {
            const result = await API.getUserByName(query);
            setSearchResults(result);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    }

    const hideSearchResult = () => {
        setShowSearchResult(false);
        setQuery("");
    }

    return (
        <div className="nav-bar">
            <div className="logo-container">
                <span className="logo">
                    BLOG
                    <span className="logo-highlight">GER</span>
                </span>
            </div>
            <div className="search-bar">
                <input 
                    type="text" 
                    value={query} 
                    onChange={search} 
                    placeholder='Search user'
                />
                <button onClick={searchUsers}>
                    <FontAwesomeIcon icon={faSearch}/>
                </button>
                {
                    showSearchResult && 
                    (<div className='search-result'>
                        <button onClick={hideSearchResult}>
                            <FontAwesomeIcon icon={faX} />
                        </button>
                        <UserList userList={searchResults}/>
                    </div>)
                }
            </div>
            <div className="nav-item">
                <button onClick={() => goTo('/home')}>
                    <FontAwesomeIcon icon={faHome}/>
                </button>
                <button onClick={() => goTo('/home/edit-profile')}>
                    <FontAwesomeIcon icon={faUser}/>
                </button>
            </div>
        </div>
    )
}
