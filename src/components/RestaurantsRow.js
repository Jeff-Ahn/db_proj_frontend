import React, { Component } from "react";

// 이미지주소만 넣어주면 되고, 데이터 가공할 때 대표 이미지도 넘겨줄 것
class RestaurantsRow extends Component {
  render() {
    return (
      <table key={this.props.restaurant.resId}>
        <tbody>
          <tr>
            <td>
              <img
                alt="Main Image"
                width="120"
                src={this.props.restaurant.mainImg}
              />
            </td>
            <td>
              <h1>{this.props.restaurant.resName}</h1>
              <p>
                {this.props.restaurant.location} -{" "}
                {this.props.restaurant.foodType}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default RestaurantsRow;
