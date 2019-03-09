import React from 'react'; // imports allows for JSX syntax
import '../styles/Home.css';
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
      <div ref={node => { this.node = node; }}>
        <ul className = "bookList">
        {this.props.bookRow.map((e,i)=>{
          return(<li onClick = {() =>{this.handleBookClick(e)}} className="bookListItem" key={`${this.props.rowNum},${i}`}>
            <img className="bookCover" src={e.book.volumeInfo.imageLinks.thumbnail}/>
          </li>)
        })}
        </ul>
        {this.state.bookClicked && (
          <div>
            <p>{this.state.selectedBook.book.volumeInfo.title}<br></br>
            {this.state.selectedBook.book.volumeInfo.authors.join(', ')}</p>
            <p>{this.state.selectedBook.book.volumeInfo.description}</p>
            <p>Recommended because you mentioned {this.state.selectedBook.attribute.join(', ')}</p>
          </div>
        )}
      </div>
    );
  }

};

export default BookDisplayRow;
