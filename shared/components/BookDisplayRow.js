import React from 'react'; // imports allows for JSX syntax
import '../styles/BookDisplayRow.css';

class BookDisplayRow extends React.Component {
  constructor (props) {
    super(props);
    this.state ={
      bookClicked: false,
      selectedBook: {},
      infoBlocks: 0,
    };

    this.handleBookClick = this.handleBookClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  };
  handleBookClick(e,i){
    document.addEventListener('click', this.handleOutsideClick, true);
    this.setState({bookClicked: true});
    this.setState({selectedBook: e});
    if(i<this.props.bookRow.length-1){
      this.setState({infoBlocks: i})
    }
    else{
      this.setState({infoBlocks: i-1})
    }
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
    let bookDisplay = this.props.bookRow.map((e,i)=>{
      if (e==''){
        return(
          <li className="bookListItem" key={`${this.props.rowNum},${i}`}>
            <div className="bookPlaceholder"></div>
          </li>
        )

      }
      else{
        return(
          (e.book.volumeInfo.imageLinks!= undefined && e.book.volumeInfo.imageLinks.thumbnail!=undefined) ? (
                  <li onClick={() =>{this.handleBookClick(e,i)}}
                  className="bookListItem" key={`${this.props.rowNum},${i}`}>
                    <img className="bookCover"
                    src={e.book.volumeInfo.imageLinks.thumbnail}/>
                  </li>
              ):(<li className="bookListItem" key={`${this.props.rowNum},${i}`}>
                <img className="bookCover"
                src='https://books.google.com/googlebooks/images/no_cover_thumb.gif'/>
              </li>)
        );
      }
    })
    
    let displayInfoBlock = [];
    for (let i = 0; i < this.state.infoBlocks; i++) {
      displayInfoBlock.push(<div className="bookInfoBlock" key={`block-${i}`}></div>);
    }

    return (
      <div className="bookBlock" key='1' ref={node => { this.node = node; }}>
        <ul className="bookList" key = 'A'>
        {bookDisplay}
        </ul>

        {this.state.bookClicked && (
          <div className="bookInfoRow" key = 'B'>
          {displayInfoBlock.length>0 && displayInfoBlock}
          <div className="bookInfo">
            <p className="bookTitle">{this.state.selectedBook.book.volumeInfo.title}</p>
            <p className="bookAuthor">{this.state.selectedBook.book.volumeInfo.authors!=undefined
              && (this.state.selectedBook.book.volumeInfo.authors.join(', '))}</p>
            <p>{this.state.selectedBook.book.volumeInfo.description}</p>
            <p>Recommended because you mentioned {this.state.selectedBook.attribute.join(', ')}</p>
          </div>
          </div>
        )}

      </div>
    );
  }

};

export default BookDisplayRow;
