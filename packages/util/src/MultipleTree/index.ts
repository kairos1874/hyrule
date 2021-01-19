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

  constructor(data: object = {}, option: IOptionParams, initialStructData: IStructDataParams = {}) {
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
    const { [childrenKey]: children, ...rest } = this.data;

    let target: any = {
      ...callback(rest),
    };
    if (Array.isArray(children) && children.length) {
      target.children = [];
      children.forEach(item => {
        // target.children.push(this.map(callback))
      });
    }
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
