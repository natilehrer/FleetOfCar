import React from "react";

class Table extends React.Component {
  render() {
    const { deleteCar, cars, setCurrCarIndex, createNewCar } = this.props;

    return (
      <div align="center">
        <button className="genericBtn" onClick={createNewCar}>
          Create A New Car
        </button>
        <table id="cars">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Vehicle Name</th>
              <th>Actions</th>
            </tr>
            {cars.map((car, index) => {
              const { id, carName } = car;
              return (
                <tr key={id} id="car-row">
                  <td>{id}</td>
                  <td>{carName}</td>
                  <td>
                    <button
                      className="genericBtn"
                      onClick={() => deleteCar(car._id)}
                    >
                      Delete
                    </button>
                    <div> </div>
                    <button
                      className="genericBtn"
                      onClick={() => setCurrCarIndex(index)}
                    >
                      Details / Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div />
      </div>
    );
  }
}

export default Table;
