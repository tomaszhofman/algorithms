const fs = require("fs");
const path = require("path");

(function init() {
  const users = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/users.json"), "utf-8")
  );
  const mobileDevices = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../data/mobile_devices.json"),
      "utf-8"
    )
  );
  const iotDevices = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../data/iot_devices.json"),
      "utf-8"
    )
  );

  console.log(new Date().toISOString());
  console.log(count(users, mobileDevices, iotDevices));
  console.log(new Date().toISOString());
})();

function getFirstName(name) {
  return name.split(" ").slice(0, 1).join("");
}

function count(users, mobileDevices, iotDevices) {
  const INITIAL_COUNT = 1;
  if (
    !Array.isArray(users) ||
    !Array.isArray(mobileDevices) ||
    !Array.isArray(iotDevices)
  ) {
    throw new Error("The arguments must be array type");
  }
  const mobilesToIotDevices = new Map();
  iotDevices.forEach((iotDevice) =>
    mobilesToIotDevices.has(iotDevice.mobile)
      ? mobilesToIotDevices.set(
          iotDevice.mobile,
          mobilesToIotDevices.get(iotDevice.mobile) + 1
        )
      : mobilesToIotDevices.set(iotDevice.mobile, INITIAL_COUNT)
  );

  const usersToIotDevices = new Map();
  mobileDevices.forEach((mobileDevice) => {
    const { user: matchingItem } = mobileDevice;

    return usersToIotDevices.has(matchingItem)
      ? usersToIotDevices.set(
          matchingItem,
          usersToIotDevices.get(matchingItem) +
            mobilesToIotDevices.get(mobileDevice.id) || 0
        )
      : usersToIotDevices.set(
          matchingItem,
          mobilesToIotDevices.get(mobileDevice.id) || 0
        );
  });

  const userNamesToIotDevices = new Map();
  users.forEach((user) => {
    const { name } = user;
    const matchingItem = getFirstName(name);

    if (userNamesToIotDevices.has(matchingItem)) {
      const hasUserAnyMobile = !!usersToIotDevices.get(user.id);

      userNamesToIotDevices.set(
        matchingItem,
        hasUserAnyMobile
          ? usersToIotDevices.get(user.id) +
              userNamesToIotDevices.get(matchingItem) || 0
          : userNamesToIotDevices.get(matchingItem)
      );
    } else {
      userNamesToIotDevices.set(
        matchingItem,
        usersToIotDevices.get(user.id) || 0
      );
    }
    return userNamesToIotDevices;
  });
  return userNamesToIotDevices;
}
