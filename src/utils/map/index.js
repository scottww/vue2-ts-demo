import Map2DService from './Map2DService';
// import Map3DService from './Map3DService';

export function createMapService(type = '2D', target, options = {}) {
  if (type === '3D') {
    // return new Map3DService(target, options);
  }
  return new Map2DService(target, options);
}
