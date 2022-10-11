/**
 * Author: Rachel Ng
 * Last modified: 9th October 2022
 * 
 * Problem approach based on Adolf Schmuck's tutorial at 
 * https://betterprogramming.pub/fetching-and-displaying-data-in-react-part-1-d40fe279a8be
 * 
 * All basic requirements fulfilled. Category filtering is done by search bar instead of select,
 * the user has to input the exact search term (case insensitive) to filter the posts.
 * 
 */

import Pagination from './Pagination';

function App() {
  return (
    <div className="App">
      <Pagination itemsPerPage={10} />
    </div>
  );
}

export default App;
