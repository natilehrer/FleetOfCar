import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditCarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.currCar.id,
      carName: props.currCar.carName,
      type: props.currCar.type,
      timeCreated: props.currCar.timeCreated,
      lastCon: props.currCar.lastCon
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = date => {
    this.setState({
      lastCon: date
    });
  };

  saveCar = () => {
    const { carName, type, lastCon } = this.state;
    const { currCar, submitCar } = this.props;

    submitCar(
      {
        _id: currCar._id,
        carName,
        type,
        lastCon
      },
      false
    );
  };

  render() {
    const { closeCarPage } = this.props;
    const { id, carName, type, timeCreated, lastCon } = this.state;

    return (
      <div align="center">
        <button className="genericBtn" onClick={closeCarPage}>
          Return to table
        </button>
        <div>
          <label>
            Id:
            <input value={id} size="35" readOnly />
          </label>
          <label>
            Car Name:
            <input
              value={carName}
              type="text"
              onChange={e => this.setState({ carName: e.target.value })}
            />
          </label>
          <label>
            Type:
            <input
              value={type}
              type="text"
              onChange={e => this.setState({ type: e.target.value })}
            />
          </label>
          <label>
            Time Created: <input value={timeCreated} size="65" readOnly />
          </label>
          <label>
            Last Connection Time:
            <DatePicker
              placeholderText="Click to select a date"
              selected={new Date(lastCon)}
              onChange={this.handleChange}
            />
          </label>
          <button className="genericBtn" onClick={this.saveCar}>
            Save
          </button>
        </div>
      </div>
    );
  }
}
export default EditCarPage;
