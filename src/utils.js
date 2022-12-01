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
  let result1 = [];
  let result2 = [];

  const LIMIT = array1.length * 5;
  let iteration = 1;

  while (result1.length != array1.length) {
    const i = Math.floor(Math.random() * array1.length);
    const item1 = array1[i];
    const item2 = array2[i];

    iteration += 1;

    if (iteration >= LIMIT) {
      result1 = result1.concat(
        array1.filter(item => result1.indexOf(item) < 0)
      );
      result2 = result2.concat(
        array2.filter(item => result2.indexOf(item) < 0)
      );

      break;
    }
    if (result1.indexOf(item1) >= 0) continue;

    result1.push(item1);
    result2.push(item2);
  }

  return [result1, result2];
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
