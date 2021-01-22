/**
 * 多叉树
 * */
import Stack from './Stack';
import Queue from './Queue';
import _get from 'lodash/get';

interface IOptionParams {
  childrenKey?: string;
  targetChildrenKey?: string;
  routeKey?: string;
}

interface IOption {
  childrenKey: string;
  targetChildrenKey: string;
  routeKey: string;
}

interface IStructData {
  depth?: number;
  index?: string;
  route?: any[];
  allRoutes?: any[];
  siblings?: object[];
  children?: object[];
  isLeaf?: boolean;
  degree?: boolean;
}

type Processor = (x: any) => any | void;
type MapCallback = (x?: object, y?: IStructData, z?: object) => object;

class MultiTree {
  private readonly data: object | null;
  private readonly option: IOption;
  private depth: number;
  private count: number;
  private degree: number;

  constructor(data: object | null, option: IOptionParams) {
    const defaultOption = {
      childrenKey: 'children',
      targetChildrenKey: 'children',
      routeKey: 'id',
    };

    this.data = data;
    this.option = {
      ...defaultOption,
    };

    if (option.childrenKey) {
      this.option = {
        ...this.option,
        targetChildrenKey: option.childrenKey,
      };
    }

    this.option = {
      ...this.option,
      ...option,
    };

    const { depth, count, degree } = this.init(data, (item: object) => {
      // console.log(_get(item, 'name'))
    });
    this.depth = depth;
    this.count = count;
    this.degree = degree;
    // depth // 最大深度，是否要给出最大深度所在的节点呢，所以给出一个 getDepth 方法？
    // breadth // 最大广度，是否要给出最大广度所在的层级呢，所以给出一个 getBreath 方法？
    // count // 节点数量
    // degree // 一棵树中最大的节点的度

    // this.bfsTraverse(data, (item) => {
    //   console.log(_get(item, 'label'))
    // })
    // this.dfsTraverse(data, (item) => {
    //   console.log(_get(item, 'label'))
    // })
  }

  // 遍历器1，使用栈来进行深度优先遍历
  // 还需要处理 data 为 null 的情况
  init(data: object, processor: Function) {
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

  // 用栈来实现的深度优先遍历（先序）
  dfsTraverse(data: object | null, processor: Processor) {
    const stack = new Stack();
    // 入栈
    stack.push(data);
    while (!stack.isEmpty()) {
      // 出栈
      const node = stack.pop();
      const { [this.option.childrenKey]: children } = node;
      processor(node);
      if (Array.isArray(children) && children.length > 0) {
        const length = children.length;
        for (let i = length - 1; i >= 0; i--) {
          stack.push(children[i]);
        }
      }
    }
  }

  // 用队列来实现的广度优先遍历
  bfsTraverse(data: object | null, processor: Processor) {
    const queue = new Queue();
    // 入队
    queue.enqueue(data);
    while (!queue.isEmpty()) {
      // 出队
      const node = queue.dequeue();
      const { [this.option.childrenKey]: children } = node;
      processor(node);
      if (Array.isArray(children) && children.length > 0) {
        const length = children.length;
        for (let i = 0; i <= length - 1; i++) {
          queue.enqueue(children[i]);
        }
      }
    }
  }

  /**
   * map 方法
   * */
  map(callback: MapCallback) {
    console.log(this.data);
    if (this.data === null) {
      return null;
    }

    const stack = new Stack();
    stack.push(this.data);

    const target = callback(this.data, {}, this.data);

    while (!stack.isEmpty()) {
      // debugger
      const node = stack.pop();
      const { childrenKey } = this.option;
      const { [childrenKey]: children } = node;

      if (Array.isArray(children) && children.length > 0) {
        const { targetChildrenKey } = this.option;
        const length = children.length;
        target[targetChildrenKey] = [];

        for (let i = length - 1; i >= 0; i--) {
          stack.push(children[i]);
          target[targetChildrenKey].unshift(callback(children[i], {}, this.data));
        }
      }
    }

    return target;
  }

  filter(callback: any) {}
  getNodesAndRelations() {}
  flatten() {}
  pick() {}
  sort() {}
  reduce() {}
  splice() {}
  moveNode() {}

  // 还需要实现中序遍历，后续遍历，和递归实现的方式等
}

export default MultiTree;
