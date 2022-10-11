import React, { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import axios from 'axios';
import '../styles/post.css';
import '../styles/pagination.css';

// initialises the array for pagination
const items = [...Array(100).keys()];

/**
 * Takes array of posts and maps them to individual cards to form a list
 * 
 * @param {object} param0 
 * @returns posts displayed in a list
 */
function Posts({ posts }) {
    return (
        <div className='item-container'>
            {posts && posts.map((post) => (
            <div className='card' key={post.id}>
                <img src={post.author.avatar} alt='' />
                <h3>{post.author.name}</h3>
                <p>{post.title}</p>
                <p>{post.summary}</p>
                {post.categories.map((category) => (
                    <li>{category.name}</li>
                ))}
                <br></br>
                <p><i>{post.publishDate}</i></p>
            </div>
            ))}
        </div>
    );
  }

  /**
   * Retrieves API data and display them in pages
   * 
   * @param {object} param0 
   * @returns paginated posts
   */
function Pagination({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    // state for filtering
    const [categoryFilter, setCategoryFilter] = useState("")

    // Handles the input from categoryFilterSearchInput
    let InputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setCategoryFilter(lowerCase);
    }

  
    useEffect(() => {
      // scroll to top  
      window.scrollTo({ behavior: 'smooth', top: '0px' });

      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      
      // Fetch API data
      axios
      .get('/api/posts')
      .then((res) => {
        console.log(res)
        return res.data.posts;
      })
      // Limit data to display based on category filter
      .then((data) => {
        if (categoryFilter === "" || categoryFilter.length === 1) {
            return data
        } else {
            return data.filter((post) => {
                const postCategories = post.categories.map((cat) => cat.name.toLowerCase())
                return postCategories.includes(categoryFilter);
            })
        }
      })
      // Set posts to display in the current page
      .then((data) => {
        setCurrentItems(data.slice(itemOffset, endOffset));
      });
    setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, categoryFilter]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <div className="header">
        <h1>Posts</h1>
        </div>
        <div className="categoryFilterSearchDiv">
        <input 
          type='text' 
          placeholder="Category Filter..." 
          className="categoryFilterSearchInput"
          onChange={InputHandler}></input>
        </div>
        <Posts posts={currentItems} />
        <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      </>
    );
  }

  export default Pagination;