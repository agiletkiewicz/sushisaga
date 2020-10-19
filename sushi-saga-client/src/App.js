// import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import React, { useState, useEffect } from 'react';

// Endpoint!
const API = "http://localhost:3000/sushis"

function App () {
  const [sushiArr, setSushiArr] = useState([]);
  const [eatenCount, setEatenCount] = useState(0);
  const [balance, setBalance] = useState(100);
  const [page, setPage] = useState(0);

  useEffect(() => {
      fetch(API)
      .then(resp => resp.json())
      .then(data => {
        const sushiData = data.map(sushi => {
          sushi.eaten = false;
          return sushi
        })
        setSushiArr(sushiData)
      })
  })

  function handleEaten(eatenSushiId) {
    const index = sushiArr.findIndex(sushi => sushi.id == eatenSushiId)
    const updatedBalance = balance - sushiArr[index].price
    if (updatedBalance < 0) {return}
    const updatedSushiArr = sushiArr
    updatedSushiArr[index].eaten = true;

    setSushiArr(updatedSushiArr);
    setEatenCount(eatenCount + 1);
    setBalance(updatedBalance);
  }

  return (
    <div className="app">
         <SushiContainer 
          sushiArr={sushiArr} 
          page={page} 
          handleEaten={(eatenSushiId) => handleEaten(eatenSushiId)} 
          incrementStartPoint={() => setPage(page + 1) }/>
          <Table 
            balance={balance}
            eatenCount={eatenCount} />
      </div>
  );

}

export default App;

