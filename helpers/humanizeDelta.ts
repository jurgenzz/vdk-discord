interface Mapping {
  [key: string]: number;
}

const DURATION_MAPPING: Mapping = {
  y: 60 * 60 * 24 * 365,
  w: 60 * 60 * 24 * 7,
  d: 60 * 60 * 24,
  h: 60 * 60,
  m: 60,
  s: 1,
};

export const humanizeDelta = (delta: number) => {
  // Turns `12345678` into `3h 25m 45s`.

  let d = delta;
  let durations: any[] = [];

  Object.entries(DURATION_MAPPING).forEach(([durationKey, duration]) => {
    // let duration: number = DURATION_MAPPING[durationKey];
    if (duration <= d) {
      duration *= 1000;
      let count: number = Math.floor(d / duration);

      d -= duration * count;
      if (count) {
        durations.push([durationKey, count]);
      }
    }
  });

  return durations.map(([name, count]) => `${count}${name}`).join(" ");
};

export const stringToSeconds = (amount: string) => {
  if (!amount) {
    return 0;
  }

  const values = amount.match(/\d+[a-z]+/g);


  const ts = values?.reduce((curr, am) =>  {
    let value = (am.match(/\d+/) || [])[0];
    let key = (am.match(/[a-z]/) || [])[0];
  
    if (!value || !key) {
      return 0;
    }
  
    if (DURATION_MAPPING[key]) {
      return curr +  parseInt(value) * DURATION_MAPPING[key];
    }
    return 0;
  }, 0)

  return ts || 0
};

export const hypheniphyDate = (date: Date) => {
  return (
    ["getMonth", "getDate", "getHours", "getMinutes", "getSeconds"]
      // @ts-ignore
      .map((m: string) => date[m]())
      // @ts-ignore
      .map((n: number) => n.toString().padStart(2, 0))
      .join("-")
  );
};
