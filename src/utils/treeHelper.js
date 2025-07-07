export function cleanTreeData(nodes, typeField = 'type', childrenField = 'children') {
  return nodes.map(node => {
    const newNode = { ...node };
    if (newNode[typeField] === 'point') {
      delete newNode[childrenField];
    } else if (Array.isArray(newNode[childrenField])) {
      newNode[childrenField] = cleanTreeData(newNode[childrenField], typeField, childrenField);
    }
    return newNode;
  });
}
