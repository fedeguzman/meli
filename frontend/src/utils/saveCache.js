const ls = localStorage;

export const saveToCache = (where, data) => {
  const info = {
    data,
    date: new Date()
  };

  const value = getCache(where);

  if (!value) {
    ls.setItem(where, JSON.stringify([info]));
    return true;
  }

  value.push(info);
  ls.setItem(where, JSON.stringify(value));
  return true;
};

export const getCache = where => {
  return JSON.parse(ls.getItem(where));
};

export const isInCache = (query, where, searchBy) => {
  return new Promise(resolve => {
    const cache = getCache(where);

    if (cache && cache.length > 0) {
      let findInCache;

      switch (searchBy) {
        case "query":
          findInCache = cache.filter(c => c.data.query === query);
          break;
        case "id":
          findInCache = cache.filter(c => c.data.item.id === query);
          break;
      }

      if (findInCache.length > 0) {
        const lastResult = findInCache[findInCache.length - 1];
        const currentDate = new Date();
        const expireTime = 1 * 60 * 1000; // the query expires after 1 Minute

        if (currentDate - new Date(lastResult.date) > expireTime) {
          resolve(false); // in cache but expired
        } else {
          resolve(lastResult.data); // in cache and not expired
        }
      } else {
        resolve(false); // new and it's not in cache
      }
    } else {
      resolve(false); // cache is empty
    }
  });
};
