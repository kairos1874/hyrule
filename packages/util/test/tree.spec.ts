import MultipleTree from '../src/MultipleTree';
import treeData from './treeData.mock';

test('two plus two is four', () => {
  const entity = new MultipleTree(treeData, {
    childrenKey: 'child',
    routeKey: 'id',
  });
  console.log(entity);
  const result = entity.filter((item: { name: string }) => {
    return item.name === '测试排序';
  });
  debugger;
  expect(result.child[0].id).toEqual(352);
  expect(2 + 2).toBe(4);
});
