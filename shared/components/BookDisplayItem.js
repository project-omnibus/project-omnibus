import React from 'react'; // imports allows for JSX syntax
import '../styles/Home.css';

const BookDisplayItem = props => {

  return (
    <li className="bookListItem">
      <img className="bookCover" src={props.item.book.volumeInfo.imageLinks.thumbnail}/>
    </li>
  );
};

export default BookDisplayItem;
