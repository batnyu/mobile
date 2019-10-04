const { Plugins } = capacitorExports;
const { Storage } = Plugins;

// JSON "set" example
async function setObject(object) {
  const key = object.title;

  await Storage.set({
    key,
    value: JSON.stringify(object)
  });
}

// JSON "get" example
async function getObject(key) {
  const ret = await Storage.get({ key });
  const user = JSON.parse(ret.value);
  return user;
}

async function setItem() {
  await Storage.set({
    key: "name",
    value: "Max"
  });
}

async function keys() {
  const keys = await Storage.keys();
  return keys;
}

async function clear() {
  await Storage.clear();
}
