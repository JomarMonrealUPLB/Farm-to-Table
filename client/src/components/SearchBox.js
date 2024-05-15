import { FaSearch } from "react-icons/fa";

import "./SearchBox.css"

const SearchBox = props => {
    const placeholder = props.placeholder

    return <div className='search_box'>
        <input type='text' className='search_box_input' placeholder={placeholder} onChange={props.onChange} />
        <FaSearch color="var(--primary-green-dark)"/>
    </div>;
}

export default SearchBox