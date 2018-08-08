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

export function canMoveBlock(toX, toY) {
  const [x, y] = blockPosition;
  const dx = toX - x;
  const dy = toY - y;

  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
         (Math.abs(dx) === 1 && Math.abs(dy) === 2);
}