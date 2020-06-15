import React, { Component } from "react";
import RestaurantsRow from "./RestaurantsRow";
// import { Link } from "react-router-dom";

class MainPage extends Component {
  state = {
    restaurants: [],
    showTable: [],
  };
  constructor(props) {
    super(props);
    this.getRestaurants();
    this.getMenus();
    this.getImages();
  }

  getRestaurants = () => {
    fetch("/api/restaurants")
      .then((res) => res.json())
      .then((restaurants) => {
        this.setState({ restaurants });
      })
      .catch((err) => console.error(err));
  };

  getMenus = () => {
    fetch("/api/menus")
      .then((res) => res.json())
      .then((menus) => {
        this.setRestaurantsInfoFromMenus(menus);
      })
      .catch((err) => console.error(err));
  };

  getImages = () => {
    fetch("api/images")
      .then((res) => res.json())
      .then((images) => {
        this.setRestaurantsInfoFromImages(images);
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

  // 데이터 셋팅 restaurants와 images를 id로 mapping 시킴
  setRestaurantsInfoFromImages = (_images) => {
    this.state.restaurants.forEach((restaurant) => {
      const images = [];
      _images.forEach((image) => {
        if (restaurant.resId === image.resId) {
          images.push({ imgAddress: image.imgAddress });
        }
      });
      restaurant.images = images;
    });
  };

  serarchData(word) {
    if (word === "") return;
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
        resId: restaurant.resId,
        resName: restaurant.resName,
        location: restaurant.locationKeyword,
        foodType: restaurant.foodType,
        mainImg: restaurant.images[0].imgAddress,
      };
    });
  }

  performSearch(searchTerm) {
    if (searchTerm === "") return;
    const results = this.serarchData(searchTerm);
    const showTable = [];
    results.forEach((restaurant) => {
      const restaurantRow = (
        <RestaurantsRow key={restaurant.resId} restaurant={restaurant} />
      );
      showTable.push(restaurantRow);
    });
    this.setState({ showTable: showTable });
  }

  searchChangeHandler(event) {
    const searchTerm = event.target.value;
    this.performSearch(searchTerm);
  }

  render() {
    return (
      <div>
        <div className="form" id="addItemForm">
          <input
            type="text"
            className="searchBar"
            id="addInput"
            placeholder="지역 식당 또는 이름"
            onChange={this.searchChangeHandler.bind(this)}
          />
        </div>
        {this.state.showTable}
      </div>
    );
  }
}

export default MainPage;
