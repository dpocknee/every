let blockPosition = [1, 7];
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

export function moveBlock(toX, toY) {
  blockPosition = [toX, toY];
  emitChange();
}