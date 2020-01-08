export function groupBy<TKey, TValue>(
  list: Array<TValue>,
  keyGetter: (item: TValue) => TKey
) {
  const map = new Map<TKey, TValue[]>();
  list.forEach(item => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
