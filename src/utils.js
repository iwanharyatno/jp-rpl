export function shuffle(array) {
  const result = [];

  while (result.length != array.length) {
    const i = Math.floor(Math.random() * array.length);
    const item = array[i];
    if (result.indexOf(item) >= 0) continue;
    result.push(item);
  }

  return result;
}

export function shufflePair(array1, array2) {
  let currentIndex = array1.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [ array1[currentIndex], array1[randomIndex] ] = 
    [ array1[randomIndex], array1[currentIndex] ];

    [ array2[currentIndex], array2[randomIndex] ] = 
    [ array2[randomIndex], array2[currentIndex] ];
  }

  return [ array1, array2 ];
}

export function selectItems(array, options) {
  const items = [];

  options = Object.assign({
    excludeIndex: 0,
    length: 3
  }, options);

  while (items.length != options.length) {
    const i = Math.floor(Math.random() * array.length);
    const item = array[i];
    if (i == options.excludeIndex || items.indexOf(item) >= 0) continue;
    items.push(item);
  }

  return items;
}
