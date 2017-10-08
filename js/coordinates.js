function hexToVox(coord) {
  // Parse
  var c = coord.split(':');
  // To decimal
  var dx = parseInt(c[0], 16);
  var dy = parseInt(c[1], 16);
  var dz = parseInt(c[2], 16);
  // Shift
  var vx = dx - 2047;
  var vy = dy - 127;
  var vz = dz - 2047;

  return {x: vx, y: vy, z: vz};
}
