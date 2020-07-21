export default (
  str: string
): {
  [type: string]: string;
} => {
  let sp = str.split(";").filter(Boolean);

  let obj = {};
  for (let i = 0; i < sp.length; i++) {
    let c = sp[i].split("=").filter(Boolean);
    obj[c[0].trim()] = c[1].trim();
  }

  return obj;
};
