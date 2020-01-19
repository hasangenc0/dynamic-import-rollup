let count = 0;
const interval = setInterval(function() {
  if (count == 2) {
    import('./button').then((module) => module.btn());
  } else if (count == 4) {
      clearInterval(interval);
  } else {
    const node = document.createElement('div') as HTMLDivElement;
    node.innerText = 'NOT DYNAMIC';
    document.body.appendChild(node);
  }
  count++;
}, 2000);
