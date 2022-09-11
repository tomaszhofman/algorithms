See [task.md](task.md) file

This is my solution, firstly i tried to solve this task by 
![](../../../../../var/folders/v7/xnb4clr95k9cl0t0md9qv8n80000gn/T/TemporaryItems/NSIRD_screencaptureui_2rcavH/Zrzut ekranu 2022-09-11 o 18.06.22.png)
// const iotGroupedByMobile = groupByKey(iotDevices, "mobile");
// const mobileGroupedByUser = groupByKey(mobileDevices, "user");
//
// console.table(users);
// console.log(iotGroupedByMobile);
// function groupByKey(arrayToGroup, searchKey) {
//   return arrayToGroup.reduce((acc, obj) => {
//     const key = obj[searchKey];
//     if (!acc[key]) {
//       acc[key] = [obj];
//     } else {
//       acc[key].push(obj);
//     }
//     return acc;
//   }, []);
// }


```js

function increaseByExistingValue(existingValue, increaseBy) {
  return existingValue + increaseBy;
}

function countByKey(arrayToGroup, key, arrayToReference, keyToReference) {
  const isKeyName = key === "name";

  if (!Array.isArray(arrayToGroup) || typeof key !== "string") {
    return null;
  }
  const mapper = new Map();

  arrayToGroup.forEach((arrayItem) => {
    const matchingKey = isKeyName
      ? getFirstName(arrayItem[key])
      : arrayItem[key];

    if (mapper.has(matchingKey)) {
      mapper.set(
        matchingKey,
        increaseByExistingValue(
          mapper.get(matchingKey),
          arrayToReference && keyToReference
            ? arrayToReference.get(arrayItem[keyToReference])
            : 1
        )
      );
    } else {
      mapper.set(
        matchingKey,
        arrayToReference && keyToReference
          ? arrayToReference.get(arrayItem[keyToReference])
          : 1
      );
    }
    return mapper;
  });
  return mapper;
}
```