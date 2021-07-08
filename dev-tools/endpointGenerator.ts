import fs from "fs"; //fileSystem

//read file into memory
let readData: string = fs.readFileSync("./world_list.txt", "utf-8");

//split file into array based on location of newlines
//return = \r   newline = \n   return & newline = \r\n
let worldList: Array<string> = readData.split(`\r\n`);

let endpoints: any = {};

for (let i = 0; i < worldList.length; i++) {
  //turn endpoint number to world number
  let worldName = Number(worldList[i]) + 300;

  //endpoint number to formatted endpoint
  let endpoint = "oldschool" + worldList[i] + ".runescape.com";

  //save endpoint into object indexed by world number
  endpoints[worldName.toString()] = endpoint;
}

//convert object to json formatted string with two spaces as tabs
let writeData = JSON.stringify(endpoints, null, 2);

//write data to `endpoints.json`
fs.writeFileSync(`endpoints.json`, writeData, `utf-8`);

console.log(`done`);
