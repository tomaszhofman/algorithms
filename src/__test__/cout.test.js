const count = require("../index");

const mobileDevicesMock = [
  {
    id: "3cd02528-eeb1-4342-a63e-f0675006032c",
    name: "Device - 1",
    user: "b3836a54-31f7-427b-a2d2-2d09323c7ab5",
  },
  {
    id: "1067daa9-7b59-456f-8cd1-79f38c2b0c10",
    name: "Device - 2",
    user: "b3836a54-31f7-427b-a2d2-2d09323c7ab5",
  },
];

const iotDevicesMock = [
  {
    id: "5a7a8a5d-4a41-42fc-a0e7-7cd301234e0a",
    name: "IOT - 1",
    mobile: "3cd02528-eeb1-4342-a63e-f0675006032c",
  },
  {
    id: "78496218-31cc-44e2-be4e-655d23f41812",
    name: "IOT - 2",
    mobile: "3cd02528-eeb1-4342-a63e-f0675006032c",
  },
];
const usersMock = [
  { id: "b3836a54-31f7-427b-a2d2-2d09323c7ab5", name: "Alice - 1" },
  { id: "0edf5981-ccc8-43c2-b32f-a5526c173a64", name: "Bob - 2" },
];

const result = new Map();
result.set("Alice", 14);
result.set("Bob", 11);
result.set("Martin", 8);
result.set("Henry", 3);
result.set("Olaf", 10);

it("it should calculate correctly number of iot devices owned by users", () => {
  expect(count(usersMock, mobileDevicesMock, iotDevicesMock)).deepEqual(
    Array.from(result)
  );
});
