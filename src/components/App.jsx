/**
 * Author: Rachel Ng
 * Last modified: 9th October 2022
 * 
 * Problem approach based on Adolf Schmuck's tutorial at 
 * https://betterprogramming.pub/fetching-and-displaying-data-in-react-part-1-d40fe279a8be
 * 
 */

import Pagination from './Pagination';
import '../styles/post.css';

function App() {
  return (
    <div className="App">
      <Pagination itemsPerPage={10} />
    </div>
  );
}

export default App;
