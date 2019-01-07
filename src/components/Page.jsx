let blockPosition = 0;
let observer = null;

function emitChange() {
  observer(blockPosition);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }
  observer = o;
  emitChange();
}

export function moveBlock(location, name, id) {
  blockPosition = [location, name, id];
  emitChange();
}
