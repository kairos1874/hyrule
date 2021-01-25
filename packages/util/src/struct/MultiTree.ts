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
  siblings?: any[];
  children?: any[];
  isLeaf?: boolean;
  degree?: number;
}

type Processor = (x: any) => any | void;
type MapCallback = (x?: object, y?: IStructData, z?: object) => object;

class MultiTree {
  private readonly data: object | null;
  private readonly option: IOption;

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
  }

  // 遍历器1，使用栈来进行深度优先遍历
  // 还需要处理 data 为 null 的情况
  // init(data: object, processor: Function) {
  //   const stack = new Stack();
  //   let depth = 0;
  //   let count = 0;
  //   let degree = 1;
  //
  //   stack.push(data);
  //
  //   while (!stack.isEmpty()) {
  //     const node = stack.pop();
  //     count++;
  //     const { [this.option.childrenKey]: children } = node;
  //     processor(node);
  //     if (Array.isArray(children) && children.length > 0) {
  //       const length = children.length;
  //       if (length > degree) {
  //         degree = length;
  //       }
  //       depth = depth + 1;
  //       for (let i = children.length - 1; i >= 0; i--) {
  //         stack.push(children[i]);
  //       }
  //     }
  //   }
  //   return {
  //     depth,
  //     count,
  //     degree,
  //   };
  // }

  // 用栈来实现的深度优先遍历（前序遍历）
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

  // 递归遍历
  // 中序遍历
  // 后序遍历

  /**
   * map 方法
   * */
  map(callback: MapCallback) {
    if (this.data === null) {
      return null;
    }
    const { childrenKey, targetChildrenKey, routeKey } = this.option;

    function recursion(data: any, structData: any) {
      const { depth, index, route } = structData;

      const { [childrenKey]: children, ...content } = data;
      const target = callback(
        content,
        {
          ...structData,
          isLeaf: !(Array.isArray(children) && children.length > 0),
        },
        data,
      );
      if (Array.isArray(children) && children.length > 0) {
        target[targetChildrenKey] = [];
        for (let i = 0; i < children.length; i++) {
          const subChildren = _get(children[i], `${childrenKey}`);

          target[targetChildrenKey].push(
            recursion(children[i], {
              depth: depth + 1,
              index: index.concat(`-${i}`),
              route: route.concat(_get(children[i], `${routeKey}`)),
              siblings: children,
              children: Array.isArray(subChildren) && subChildren.length > 0 ? subChildren : [],
              degree: Array.isArray(subChildren) && subChildren.length > 0 ? subChildren.length : 0,
            }),
          );
        }
      }
      return target;
    }

    const rootChildren = _get(this.data, `${childrenKey}`);
    return recursion(this.data, {
      depth: 0,
      index: '0',
      route: [].concat(this.data[routeKey]),
      siblings: [this.data],
      children: Array.isArray(rootChildren) && rootChildren.length > 0 ? rootChildren : [],
      degree: Array.isArray(rootChildren) && rootChildren.length > 0 ? rootChildren.length : 0,
    });
  }

  filter(callback: any) {}
  getNodesAndRelations() {}
  flatten() {}
  pick() {}
  sort() {}
  reduce() {}
  splice() {}
  moveNode() {}
}

export default MultiTree;
