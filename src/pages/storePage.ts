class StorePage {
  //No open function, as the StorePage is only reachable after login unless I implement session persistence

  get title() {
    return $('h1=Good things, chosen well.');
  }
}

export default new StorePage();
