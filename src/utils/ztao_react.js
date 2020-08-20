/**
 * Created by zengtao on 2017/3/29.
 */
export let treeSearchByArr = (tree, arr, label = 'id', children = 'children') => {
  let layer = 0;
  let obj = {};
  if (!tree) {
    console.log('提示', '你传递的tree是空');
  }
  let tree_ = cloneop(tree);
  if (!isArrayop(tree_)) {
    tree_ = [tree_];
  }
  let loop = (tree_,layer = 0) => {

    for (let i of tree_) {
      if (i[label] === arr[layer]) {
        if (arr[layer + 1] && i[children] && i[children].length >0) {
          loop(i[children],layer + 1);
        } else if(layer === (arr.length - 1)){
          obj = i;
        }
      }
    }
  };
  loop(tree_);
  return obj;
};