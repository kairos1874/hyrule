/**
 * 一个实用的 Tree 类
 * */

interface IOption {
  childrenKey: string;
  routeKey: string;
}

interface IOptionParams {
  childrenKey?: string;
  routeKey?: string;
}

interface IStructData {
  depth: number;
  treeIndex: string;
  layerIndex: number;
  route: string;
  isLeaf: boolean;
}

interface IStructDataParams {
  depth?: number;
  treeIndex?: string;
  layerIndex?: number;
  route?: string;
}

type MapCallback = (x: object, y?: IStructData, z?: object) => object | null;
type FilterCallback = (x?: object, y?: IStructData, z?: object) => boolean;

/**
 * 多叉树
 * */
class MultipleTree {
  private readonly data: object;
  private readonly option: IOption;
  private readonly initialStructData: object;

  constructor(data: object, option: IOptionParams, initialStructData: IStructDataParams = {}) {
    const defaultOption = {
      childrenKey: 'children',
      routeKey: 'id',
    };

    this.data = data;
    this.option = {
      ...defaultOption,
      ...option,
    };
    this.initialStructData = initialStructData;
  }

  /**
   * map 方法
   * */
  map(callback: MapCallback) {
    const { childrenKey } = this.option;
    // @ts-ignore
    const { [childrenKey]: children } = this.data;

    // function recursion(data, structData) {
    //
    // }
    //
    // return recursion(this.data, {
    //   depth: 0, // 深度
    //   index: '0', // 在树中的索引，在树中是唯一的，表现形式如 '0-3-4-2-1'，标记的是该节点在树中的位置
    //   route: [].concat(this.data[this.option.routeKey]), // 由父节点到当前节点的路径，需要在 new 实例的时候指明 routeKey
    //   ...this.initialStructData,
    // })

    // let target: any = {
    //   ...callback(this.data, {}),
    // };
    // if (Array.isArray(children) && children.length) {
    //   target.children = [];
    //   children.forEach(item => {
    //     // target.children.push(this.map(callback))
    //   });
    // }
  }

  /**
   * filter 方法
   * */
  filter(callback: FilterCallback) {
    const vm = this;
    const { childrenKey } = this.option;

    function recursion(data: any, structData: any) {
      const { [childrenKey]: children, ...rest } = data;
      const { depth, treeIndex, route } = structData;

      if (Array.isArray(children) && children.length > 0) {
        const shortlisted: any[] = children
          .map((item, index) => {
            return recursion(item, {
              depth: depth + 1,
              treeIndex: `${treeIndex}-${index}`,
              layerIndex: index,
              route: route.concat(item[vm.option.routeKey]),
            });
          })
          .filter(ele => ele !== null);

        if (shortlisted.length > 0) {
          return {
            ...rest,
            children: shortlisted,
          };
        }
        // @ts-ignore
        if (
          callback(
            rest,
            {
              ...structData,
              isLeaf: false,
            },
            vm.data,
          )
        ) {
          return { ...rest };
        }
        return null;
      } else {
        if (
          callback(
            rest,
            {
              ...structData,
              isLeaf: true,
            },
            vm.data,
          )
        ) {
          return { ...rest };
        }
        return null;
      }
    }

    return recursion(this.data, {
      depth: 0,
      treeIndex: '0',
      layerIndex: 0,
      route: [].concat(this.data[this.option.routeKey]),
      ...this.initialStructData,
    });
  }
}

export default MultipleTree;
