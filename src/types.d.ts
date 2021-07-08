declare namespace rsQuerry {
  interface querryBlock {
    blockid: number;
    querrys: Array<querry>;
  }
  interface querry {
    world: string;
    endpoint: string;
  }
}

export default rsQuerry;
