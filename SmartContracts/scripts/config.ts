import { promises as fs } from "fs";

let config: any;

export async function initConfig() {
  console.log("init");
  config = JSON.parse(
    (await fs.readFile("/SmartContracts/config.json")).toString(),
  );
  return config;
}

export function getConfig() {
  return config;
}

export function setConfig(path: string, val: string) {
  console.log("Config: ", config);
  const splitPath = path.split(".").reverse();

  let ref = config;
  while (splitPath.length > 1) {
    let key = splitPath.pop();

    if (key) {
      if (!ref[key]) ref[key] = {};
      ref = ref[key];
    } else return;
  }

  let key = splitPath.pop();
  if(key) ref[key] = val;
}

export async function updateConfig() {
    console.log('write: ', JSON.stringify(config));

    return fs.writeFile('/SmartContracts/config.json', JSON.stringify(config, null, 2));
}
