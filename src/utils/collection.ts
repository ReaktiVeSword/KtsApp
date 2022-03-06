export type CollectionT<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

export const getInitialCollectionModel = (): CollectionT<any, any> => ({
  order: [],
  entities: {},
});

export const normalizeCollection = <K extends string | number, T>(
  elements: T[],
  getKeyForElement: (element: T) => K
): CollectionT<K, T> => {
  const collection: CollectionT<K, T> = getInitialCollectionModel();

  elements.forEach((el) => {
    const id = getKeyForElement(el);
    collection.order.push(id);
    collection.entities[id] = el;
  });
  return collection;
};

export const linearizeCollection = <K extends string | number, T>(
  elements: CollectionT<K, T>
): T[] => elements.order.map((el) => elements.entities[el]);
