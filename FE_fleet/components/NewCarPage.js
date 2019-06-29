import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class NewCarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carName: "",
      type: "",
      lastCon: ""
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
    const { submitCar } = this.props;

    submitCar(
      {
        carName,
        type,
        lastCon
      },
      true
    );
  };

  render() {
    //const { carName, type, lastCon } = this.state;
    const { closeCarPage } = this.props;

    return (
      <div align="center">
        <button className="genericBtn" onClick={closeCarPage}>
          Return to table
        </button>
        <div>
          <label>
            Car Name:
            <input
              type="text"
              onChange={e => this.setState({ carName: e.target.value })}
            />
          </label>
          <label>
            Type:
            <input
              type="text"
              onChange={e => this.setState({ type: e.target.value })}
            />
          </label>
          <label>
            Last Connection Time:
            <DatePicker
              placeholderText="Click to select a date"
              selected={this.state.lastCon}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <button className="genericBtn" onClick={this.saveCar}>
          Save
        </button>
      </div>
    );
  }
}

export default NewCarPage;
