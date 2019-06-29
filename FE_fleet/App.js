import React from "react";
import EditCarPage from "./components/EditCarPage";
import NewCarPage from "./components/NewCarPage";
import Table from "./components/Table";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      currCarIndex: null,
      showCarPage: false
    };
  }

  componentDidMount() {
    this.fetchCars();
  }

  fetchCars = () => {
    fetch("http://localhost:3001/api/cars", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(data => this.updateCars(data.cars));
  };

  updateCars = (newCars = []) => this.setState({ cars: newCars });

  deleteCar = _id => {
    fetch("http://localhost:3001/api/cars/" + _id, {
      method: "delete",
      headers: {
        Accept: "application/json"
      }
    }).then(this.fetchCars); // === () => this.fetchCars()
  };

  setCurrCarIndex = index =>
    this.setState({ currCarIndex: index, showCarPage: true });

  createNewCar = () => this.setState({ currCarIndex: null, showCarPage: true });

  closeCarPage = () => this.setState({ showCarPage: false });

  submitCar = (car, isNew) => {
    const { carName, type, lastCon, _id } = car;
    const url = "http://localhost:3001/api/cars" + (!isNew ? "/" + _id : "");
    fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ carName, type, lastCon })
    }).then(() => {
      this.setState({ showCarPage: false });
      this.fetchCars();
      //console.error(err);
    });
  };

  render() {
    const { cars, currCarIndex, showCarPage } = this.state;
    const isCarSelected = currCarIndex != null;
    return (
      <div>
        <div className="sample-header-section">
          <h1>Fleet Of Vehicles</h1>
        </div>
        <div>
          {showCarPage ? (
            isCarSelected ? (
              <EditCarPage
                submitCar={this.submitCar}
                currCarIndex={currCarIndex}
                currCar={isCarSelected && cars[currCarIndex]}
                closeCarPage={this.closeCarPage}
              />
            ) : (
              <NewCarPage
                closeCarPage={this.closeCarPage}
                submitCar={this.submitCar}
              />
            )
          ) : (
            <Table
              deleteCar={this.deleteCar}
              createNewCar={this.createNewCar}
              setCurrCarIndex={this.setCurrCarIndex}
              cars={cars}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
