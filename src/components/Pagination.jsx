import React, { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import axios from 'axios';
import '../styles/post.css';
import '../styles/pagination.css';

const items = [...Array(250).keys()];

function Posts({ posts }) {
    return (
        <div>
        <h1>Posts</h1>

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
                <p><i>{post.publishDate}</i></p>
            </div>
            ))}
        </div>
      </div>
    );
    
  }

function Pagination({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    useEffect(() => {
      // scroll to top  
      window.scrollTo({ behavior: 'smooth', top: '0px' });

      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);

      axios
      .get('/api/posts')
      .then((res) => {
        console.log(res)
        return res.data.posts;
      })
      .then((data) => {
        setCurrentItems(data.slice(itemOffset, endOffset));
      });
    setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
  
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

  export default Pagination