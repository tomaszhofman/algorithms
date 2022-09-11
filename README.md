See [task.md](task.md) file

This is my solution to this task below trying to explain my choices and failures.

At first I tried creating objects like:

mobile[id]: [Array<iotDevices>] and users[id]: [Array<mobileIds>] then combine them and finally count the iotDevices by
calculating how deep this object is

```js

 const iotGroupedByMobile = groupByKey(iotDevices, "mobile");
 const mobileGroupedByUser = groupByKey(mobileDevices, "user");

 console.table(users);
 console.log(iotGroupedByMobile);
 function groupByKey(arrayToGroup, searchKey) {
   return arrayToGroup.reduce((acc, obj) => {
     const key = obj[searchKey];
     if (!acc[key]) {
      acc[key] = [obj];
    } else {
      acc[key].push(obj);
    }
    return acc;
  }, []);
 }

```

Then I realized that this was not an efficient way to solve this problem, so I looked for something that would not
contain so many iterations within iterations. 
The solution can be found in src/index.js


In order to streamline my work, I also decided that I would make some abstractions, after some time the code below began to look incomprehensible.
So I decided to keep it as it is and not do abstractions.


Below is the code from the abstractions I tried:


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
