/**
 * 多叉树
 * */
import Stack from './stack';
import _get from 'lodash/get';

interface IOptionParams {
  childrenKey?: string;
  routeKey?: string;
}

interface IOption {
  childrenKey: string;
  routeKey: string;
}

class MultiTree {
  private data: object;
  private option: IOption;
  private depth: number;
  private count: number;
  private degree: number;

  constructor(data: object, option: IOptionParams) {
    const defaultOption = {
      childrenKey: 'children',
      routeKey: 'id',
    };

    this.data = data;
    this.option = {
      ...defaultOption,
      ...option,
    };
    const { depth, count, degree } = this.traverse(data, (item: object) => {
      // console.log(_get(item, 'name'))
    });
    this.depth = depth;
    this.count = count;
    this.degree = degree;
    // depth // 最大深度，是否要给出最大深度所在的节点呢，所以给出一个 getDepth 方法？
    // breadth // 最大广度，是否要给出最大广度所在的层级呢，所以给出一个 getBreath 方法？
    // count // 节点数量
    // degree // 一棵树中最大的节点的度
  }

  // 遍历器1，使用栈来进行深度优先遍历
  // 还需要处理 data 为 null 的情况
  traverse(data: object, processor: Function) {
    const stack = new Stack();
    let depth = 0;
    let count = 0;
    let degree = 1;

    stack.push(data);

    while (!stack.isEmpty()) {
      const node = stack.pop();
      count++;
      const { [this.option.childrenKey]: children } = node;
      processor(node);
      if (Array.isArray(children) && children.length > 0) {
        const length = children.length;
        if (length > degree) {
          degree = length;
        }
        depth = depth + 1;
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push(children[i]);
        }
      }
    }
    return {
      depth,
      count,
      degree,
    };
  }

  map(callback: any) {
    return this.traverse(this.data, (item: any) => {});
  }

  filter(callback: any) {}
}

export default MultiTree;
