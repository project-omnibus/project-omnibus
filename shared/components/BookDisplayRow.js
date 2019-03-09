import React from 'react'; // imports allows for JSX syntax
import '../styles/BookDisplayRow.css';
import Item from './BookDisplayItem';

class BookDisplayRow extends React.Component {
  constructor (props) {
    super(props);
    this.state ={
      bookClicked: false,
      selectedBook: {},
    };

    this.handleBookClick = this.handleBookClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  };
  handleBookClick(e){
    document.addEventListener('click', this.handleOutsideClick, true);
    this.setState({bookClicked: true});
    this.setState({selectedBook: e});
  }
  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
     return;
    }
    this.setState({bookClicked: false});
    document.removeEventListener('click', this.handleOutsideClick, true);
  }
  render(){
    return (
      <div className = "bookRow" ref={node => { this.node = node; }}>
        <ul className = "bookList">
        {this.props.bookRow.map((e,i)=>{
          return(
            (e.book.volumeInfo.imageLinks!= undefined && e.book.volumeInfo.imageLinks.thumbnail!=undefined) ? (
                    <li onClick={() =>{this.handleBookClick(e)}}
                    className="bookListItem" key={`${this.props.rowNum},${i}`}>
                      <img className="bookCover"
                      src={e.book.volumeInfo.imageLinks.thumbnail}/>
                    </li>
                ):(<li className="bookListItem" key={`${this.props.rowNum},${i}`}>
                  <img className="bookCover"
                  src='https://books.google.com/googlebooks/images/no_cover_thumb.gif'/>
                </li>))
        })}
        </ul>
        {this.state.bookClicked && (
          <div className="bookInfo">
            <p className="bookTitle">{this.state.selectedBook.book.volumeInfo.title}</p>
            <p className="bookAuthor">{this.state.selectedBook.book.volumeInfo.authors.join(', ')}</p>
            <p>{this.state.selectedBook.book.volumeInfo.description}</p>
            <p>Recommended because you mentioned {this.state.selectedBook.attribute.join(', ')}</p>
          </div>
        )}
      </div>
    );
  }

};

export default BookDisplayRow;
