import React from "react";

// main page
class Main extends React.Component {
  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <div>
        <form className="form" id="addItemForm">
          <input
            type="text"
            className="searchBar"
            id="addInput"
            placeholder="지역 식당 또는 이름"
          />
          <button className="button is-info" onClick={this.addItem}>
            검색
          </button>
        </form>
      </div>
    );
  }
}

export default Main;
