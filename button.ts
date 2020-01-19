export function btn () {
  const node = document.createElement('divs') as HTMLDivElement;
  node.innerText = 'DYNAMIC'
  document.body.appendChild(node);
}