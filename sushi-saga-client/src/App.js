import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      sushiArr: [],
      eatenCount: 0,
      balance: 100,
      page: 0,
    }
  }

  componentDidMount(){
    fetch(API)
      .then(resp => resp.json())
      .then(data => {
        const sushiData = data.map(sushi => {
          sushi.eaten = false;
          return sushi
        })
        this.setState({ sushiArr: sushiData})
      })
  }

  incrementStartPoint(){
    this.setState({
      page: this.state.page + 1
    })
  }

  handleEaten(eatenSushiId){
    const index = this.state.sushiArr.findIndex(sushi => sushi.id == eatenSushiId)
    const updatedBalance = this.state.balance - this.state.sushiArr[index].price
    if (updatedBalance < 0) {return}
    const updatedSushiArr = this.state.sushiArr
    updatedSushiArr[index].eaten = true;

    
    this.setState({
      sushiArr: updatedSushiArr,
      eatenCount: this.state.eatenCount + 1,
      balance: updatedBalance,
    });
  }

  render() {
    return (
      <div className="app">
        <SushiContainer 
          sushiArr={this.state.sushiArr} 
          page={this.state.page} 
          handleEaten={(eatenSushiId) => this.handleEaten(eatenSushiId)} 
          incrementStartPoint={() => this.incrementStartPoint()}/>
          <Table 
            balance={this.state.balance}
            eatenCount={this.state.eatenCount} />
      </div>
    );
  }
}

export default App;

