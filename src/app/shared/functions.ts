

export function getPathToBody(el: HTMLElement) {

  const arr: HTMLElement[] = [];
  let cur = el;

  while(cur) {
    arr.push(cur);
    cur = cur.parentElement!;
  }

  return arr;

}
