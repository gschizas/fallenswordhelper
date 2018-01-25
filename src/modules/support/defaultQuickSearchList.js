function plants() {
  return [
    'Amber',
    'Blood Bloom',
    'Jademare',
    'Dark Shade',
    'Trinettle',
    'Heffle Wart'
  ].map(function(el) {
    return {category: 'Plants', searchname: el, nickname: ''};
  });
}

function potions() {
  return [
    ['Sludge Brew', 'DC 200'],
    ['Potion of Black Death', 'DC 225'],
    ['Potion of Aid', 'Assist'],
    ['Potion of Supreme Doubling', 'DB 450'],
    ['Potion of Acceleration', 'DB 500'],
    ['Potion of Lesser Death Dealer', 'DD'],
    ['Runic Potion', 'FI 250'],
    ['Potion of the Bookworm', 'Lib 225'],
    ['Potion of Truth', 'EW 1k'],
    ['Dull Edge', 'DE 25'],
    ['Notched Blade', 'DE 80'],
    ['Potion of Death', 'DW 125'],
    ['Potion of Decay', 'WI 150'],
    ['Potion of Fatality', 'WI 350'],
    ['Potion of Annihilation', 'DW 150'],
    ['Potion of the Wise', 'Lib 200'],
    ['Potion of Shattering', 'SA'],
    ['Dragons Blood Potion', 'ZK 200'],
    ['Berserkers Potion', 'ZK 300'],
    ['Potion of Fury', 'ZK 350'],
    ['Potion of Supreme Luck', 'FI 1k']
  ].map(function(el) {
    return {
      category: 'Potions',
      searchname: el[0],
      nickname: el[1],
      displayOnAH: true
    };
  });
}

export function def_quickSearch() {
  return JSON.stringify(plants().concat(potions()));
}
