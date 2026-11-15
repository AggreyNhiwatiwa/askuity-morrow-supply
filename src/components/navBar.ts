class NavBar {
  get cartButton() {
    return $('[data-test="nav-cart"]');
  }
}

export default new NavBar();
