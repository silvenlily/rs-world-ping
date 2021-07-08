/*
rs-ping written by lily.slvr

depencencys:
https://www.npmjs.com/package/ping written by Daniel Zelisko
*/

import fs from "fs";
import ping from "ping";

//number of worlds to output
let worldsToOutput = 5;
//when true outputs the ping of each world as it is pinged
let showPingProgress = false;
//number of ms to wait between pinging
let delayPings = 10;
//continus mode
let repeat = 0;

if (process.argv[2]) {
  try {
    worldsToOutput = Number(process.argv[2]);
  } catch (error) {
    console.log(error);
    process.exit();
  }
}
if (process.argv[3]) {
  try {
    if (process.argv[3] == "true") {
      showPingProgress = true;
    } else {
      showPingProgress = false;
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

if (process.argv[4]) {
  try {
    delayPings = Number(process.argv[4]);
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

if (process.argv[5]) {
  try {
    repeat = Number(process.argv[5]);
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

let endpoints = JSON.parse(fs.readFileSync("./conf/endpoints.json", `utf-8`));

let worldList = Object.keys(endpoints);

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

async function pingWorlds() {
  let pings: any = {};
  let worldPings: any = {};
  let unresolvedPings = 0;
  for (let i = 0; i < worldList.length; i++) {
    unresolvedPings++;
    ping.promise.probe(endpoints[worldList[i]]).then(async (res) => {
      pings[i] = Number(res.avg);
      if (!worldPings[pings[i]]) {
        worldPings[pings[i]] = [];
      }

      worldPings[pings[i]].push(worldList[i]);
      if (showPingProgress) {
        console.log(`world ${worldList[i]} > ${pings[i]}ms`);
      }
      unresolvedPings = unresolvedPings - 1;
    });
    await sleep(delayPings);
  }

  let timeout = 50;
  while (unresolvedPings >= 1 && timeout > 0) {
    await sleep(100);
    timeout = timeout - 1;
  }
  return worldPings;
}

async function output(worlds: any, target: number) {
  worlds = await worlds;
  console.log(`lowest ${target} ping worlds:`);
  let out = 0;
  let i = 0;
  while (out <= target && i < 1000) {
    i++;
    if (worlds[i]) {
      for (let a = 0; a < worlds[i].length; a++) {
        console.log(`world ${worlds[i][a]} > ${[i]}ms`);
        out++;
        if (out >= target) {
          break;
        }
      }
    }
  }
}

if (repeat > 0) {
  if (repeat > delayPings + 4000) {
    console.clear();
    console.log(
      `rs-ping > lowest: ${worldsToOutput} ping worlds - msg per ping: ${showPingProgress} - delaying pings by: ${delayPings}ms - repeating: ${repeat}ms`
    );

    output(pingWorlds(), worldsToOutput);
    setInterval(async () => {
      let data = await pingWorlds();
      console.clear();
      console.log(
        `rs-ping > lowest: ${worldsToOutput} ping worlds - msg per ping: ${showPingProgress} - delaying pings by: ${delayPings}ms - repeating: ${repeat}ms`
      );
      output(data, worldsToOutput);
    }, repeat);
  } else {
    console.log(`If repeat is enabled it can't be lower then delayPings + 4000.`);
  }
} else {
  console.log(
    `rs-ping > lowest: ${worldsToOutput} ping worlds - msg per ping: ${showPingProgress} - delaying pings by: ${delayPings}ms - repeating: disabled`
  );
  output(pingWorlds(), worldsToOutput);
}
