import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function LoadingModel({text}){
    return(
        <div className="loading-container">
            <FontAwesomeIcon className="loading-icon" icon={faSpinner} spin size="3x"/>
            <p>{text || "Loading..."}</p>
        </div>
    )
}