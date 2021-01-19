/**
 * 一个实用的 Tree 类
 * */

interface IOption {
  childrenKey: string;
  routeKey: string;
}

interface IStructData {
  depth: number;
  treeIndex: string;
  layerIndex: number;
  route: string;
  isLeaf: boolean;
}

interface IFilterCallbackOption {
  restData: object;
  structData: IStructData;
  originData: object;
}

/**
 * 多叉树
 * */
class MultipleTree {
  private readonly data: object;
  private readonly option: IOption;
  private readonly initialStructData: object;

  constructor(data = {}, option = {}, initialStructData = {}) {
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

  public filter(callback: any) {
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
