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
  relationKey?: string;
}

interface IOption {
  childrenKey: string;
  targetChildrenKey: string;
  routeKey: string;
  relationKey: string;
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
type PickCallback = (x?: object, y?: IStructData, z?: object) => boolean;

class MultiTree {
  private readonly data: object | null;
  private readonly option: IOption;
  // private structuralData: object | null;

  constructor(data: object | null, option: IOptionParams) {
    const defaultOption = {
      childrenKey: 'children',
      targetChildrenKey: 'children',
      routeKey: 'id',
      relationKey: 'id',
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
  recursiveTraverse(data: object, processor: MapCallback) {
    const { childrenKey, targetChildrenKey, routeKey } = this.option;

    function recursion(recursiveData: any, structure: any) {
      const { depth, index, route } = structure;

      const { [childrenKey]: children, ...content } = recursiveData;
      const target = processor(
        content,
        {
          ...structure,
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

    const rootChildren = _get(data, `${childrenKey}`);
    return recursion(data, {
      depth: 0,
      index: '0',
      route: [].concat(data[routeKey]),
      siblings: [data],
      children: Array.isArray(rootChildren) && rootChildren.length > 0 ? rootChildren : [],
      degree: Array.isArray(rootChildren) && rootChildren.length > 0 ? rootChildren.length : 0,
    });
  }

  // 中序遍历
  // 后序遍历

  /**
   * map 方法
   * */
  map(callback: MapCallback) {
    if (this.data === null) {
      return null;
    }
    return this.recursiveTraverse(this.data, callback);
  }

  /**
   * 获取结构化后的 data
   * */
  getStructuralData() {
    return this.map((item, structure) => {
      return {
        ...item,
        structure,
      };
    });
  }

  /**
   * pick 方法
   * */
  pick(callback: PickCallback) {
    if (this.data === null) {
      return [];
    }
    const structuralData = this.getStructuralData();
    const target = [];
    const queue = new Queue();
    queue.enqueue(structuralData);

    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      const { [this.option.childrenKey]: children, structure, ...content } = node;
      if (callback(content, structure, this.data)) {
        target.push(content);
      }
      if (Array.isArray(children) && children.length > 0) {
        const length = children.length;
        for (let i = 0; i <= length - 1; i++) {
          queue.enqueue(children[i]);
        }
      }
    }
    return target;
  }

  /**
   * filter 方法，用递归实现
   * */
  filter(callback: PickCallback) {
    const vm = this;
    if (this.data === null) {
      return null;
    }

    const { childrenKey, targetChildrenKey, routeKey } = this.option;

    function recursion(data: any, structData: any) {
      const { [childrenKey]: children, ...content } = data;
      const { depth, index, route } = structData;

      if (Array.isArray(children) && children.length > 0) {
        const shortlisted: any[] = children
          .map((item, subIndex) => {
            const subChildren = _get(item, `${childrenKey}`);

            return recursion(item, {
              depth: depth + 1,
              index: index.concat(`-${subIndex}`),
              route: route.concat(_get(item, `${routeKey}`)),
              siblings: children,
              children: Array.isArray(subChildren) && subChildren.length > 0 ? subChildren : [],
              degree: Array.isArray(subChildren) && subChildren.length > 0 ? subChildren.length : 0,
            });
          })
          .filter(ele => ele !== null);

        if (shortlisted.length > 0) {
          return {
            ...content,
            [targetChildrenKey]: shortlisted,
          };
        }
        if (
          callback(
            content,
            {
              ...structData,
              isLeaf: false,
            },
            vm.data as object,
          )
        ) {
          return { ...content };
        }
        return null;
      } else {
        if (
          callback(
            content,
            {
              ...structData,
              isLeaf: true,
            },
            vm.data as object,
          )
        ) {
          return { ...content };
        }
        return null;
      }
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

  /**
   * 获取所有的 节点 和 节点之间的连线关系，可以用在绘图等方面，使用深度优先遍历（栈）
   * */
  getNodesAndRelations() {
    if (this.data === null) {
      return {
        nodes: [],
        relations: [],
      };
    }
    const { childrenKey, relationKey } = this.option;
    const nodes = [];
    const relations = [];
    const stack = new Stack();
    stack.push(this.data);

    while (!stack.isEmpty()) {
      const node = stack.pop();
      const { [childrenKey]: children, ...content } = node;
      nodes.push(content);
      if (Array.isArray(children) && children.length > 0) {
        const length = children.length;
        for (let i = length - 1; i >= 0; i--) {
          stack.push(children[i]);
          relations.push({
            source: _get(node, relationKey),
            target: _get(children[i], relationKey),
          });
        }
      }
    }

    return {
      nodes,
      relations,
    };
  }

  flatten() {}
  sort() {}
  reduce() {}
  splice() {}
  moveNode() {}
}

export default MultiTree;
