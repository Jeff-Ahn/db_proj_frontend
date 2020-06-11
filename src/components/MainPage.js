import React, { Component } from "react";

class MainPage extends Component {
  state = {
    restaurants: [],
  };
  constructor(props) {
    super(props);
    this.getRestaurants();
    this.getMenus();
  }

  getRestaurants = () => {
    fetch("/api/restaurants")
      .then((res) => res.json())
      .then((restaurants) => {
        //this.setState({ restaurants });
        this.state.restaurants = restaurants;
      })
      .catch((err) => console.error(err));
  };

  getMenus = () => {
    fetch("/api/menus")
      .then((res) => res.json())
      .then((menus) => {
        this.setRestaurantsInfoFromMenus(menus);
        console.log(this.state.restaurants);
      })
      .catch((err) => console.error(err));
  };

  // 데이터 셋팅 restaurants와 menus를 id로 mapping 시킴
  setRestaurantsInfoFromMenus = (_menus) => {
    this.state.restaurants.forEach((restaurant) => {
      const menus = [];
      _menus.forEach((menu) => {
        if (restaurant.resId === menu.resId) {
          menus.push({ name: menu.name, price: menu.price });
        }
      });
      restaurant.menus = menus;
    });
  };

  serarchData(word) {
    const searchedRestaurants = this.state.restaurants.filter((restaurant) => {
      if (
        restaurant.resName.includes(word) ||
        restaurant.locationKeyword.includes(word) ||
        restaurant.foodType.includes(word)
      ) {
        return true;
      } else {
        let flag = false;
        restaurant.menus.forEach((menu) => {
          if (menu.name.includes(word)) {
            flag = true;
          }
        });
        return flag;
      }
    });
    return searchedRestaurants.map((restaurant) => {
      return {
        resName: restaurant.resName,
        location: restaurant.locationKeyword,
        foodType: restaurant.foodType,
      };
    });
  }

  performSearch(searchTerm) {
    const data = this.serarchData(searchTerm);
    console.log(data);
  }

  searchChangeHandler(event) {
    const searchTerm = event.target.value;
    this.performSearch(searchTerm);
  }
  render() {
    return (
      <div>
        <form className="form" id="addItemForm">
          <input
            type="text"
            className="searchBar"
            id="addInput"
            placeholder="지역 식당 또는 이름"
            onChange={this.searchChangeHandler.bind(this)}
          />
        </form>
      </div>
    );
  }
}

export default MainPage;
