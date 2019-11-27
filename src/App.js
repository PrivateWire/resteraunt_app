import React, {Component} from 'react';
import RestaurantsTable from './components/RestaurantsTable'
import './css/App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            restaurants:[],
            loading:true
        }
    }

    componentWillMount(){
        this.loadRestaurants();
    }

    //load data
    loadRestaurants=()=>{
      this.requestResteraunts('GET','/restaurants', this.filterResponse).then((filteredResteraunts)=>{
          this.setState({restaurants:filteredResteraunts, loading:false})
      })
    }

    //Make Request and convert to JSON
    requestResteraunts=(method,endPoint,onSuccess)=>{
        let baseURl = 'https://waraclecodetesting.azurewebsites.net/api';
        const options = {mode: 'cors', method:method, headers: new Headers({'Content-Type':'application/json'}),};
        return fetch(baseURl+ endPoint,options).then(response => response.json()).then(onSuccess);
    }

    //Remove unwanted resteraunt
    filterResponse=(data)=>{
        let flattened = data.reduce((a,b) => { return a.concat(b)});
        let filteredResteraunts = flattened.filter((resteraunt) => { return resteraunt.address.city !== 'Bielefeld'});
        return filteredResteraunts;
    }

    render() {
        return (
            <div className="App">
                <header className="header">
                    <h2>Resteraunt Index</h2>
                </header>
                <br/>
                <body>
                {this.state.loading ? <div className="loading-styles"><br/>Loading...<br/></div> : <RestaurantsTable resterauntData={this.state.restaurants}/>
                    }
                </body>
                <footer className="footer">
                </footer>
            </div>
        );

    }
}

export default App;
