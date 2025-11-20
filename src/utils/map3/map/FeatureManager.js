// FeatureManager.js - 负责要素的增删查改（依赖 LayerManager）
export default class FeatureManager {
  constructor(layerManager) {
    if (!layerManager) throw new Error("FeatureManager requires LayerManager");
    this.layerManager = layerManager;
  }

  addFeature(layerKey, feature) {
    const src = this.layerManager.getSource(layerKey);
    if (!src) throw new Error(`Layer ${layerKey} not found or has no source`);
    src.addFeature(feature);
  }

  removeFeature(layerKey, feature) {
    const src = this.layerManager.getSource(layerKey);
    if (!src) return;
    src.removeFeature(feature);
  }

  clear(layerKey) {
    const src = this.layerManager.getSource(layerKey);
    if (!src) return;
    src.clear();
  }

  getFeatures(layerKey) {
    const src = this.layerManager.getSource(layerKey);
    return src ? src.getFeatures() : [];
  }

  findFeatureByProp(layerKey, propName, propValue) {
    const features = this.getFeatures(layerKey);
    return features.find((f) => f.get(propName) === propValue) || null;
  }
}
