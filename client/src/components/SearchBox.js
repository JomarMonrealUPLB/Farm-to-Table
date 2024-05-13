import { FaSearch } from "react-icons/fa";

import "./SearchBox.css"

const SearchBox = props => {
    const placeholder = props.placeholder

    return <div className='search_box'>
        <input type='text' className='search_box_input' placeholder={placeholder} />
        <FaSearch />
    </div>;
}

export default SearchBox