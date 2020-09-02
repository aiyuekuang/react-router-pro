export let treeFindStrInArr = (treeData,key, string, children = "children") => {
  let arr = []
  let loop = (_arr) => {
      for (let i of _arr){
        if(i[key].includes('/:')){
          arr.push(i)
        }
        if(i.children && i.children.length){
          loop(i.children)
        }
      }
  }
  return arr
}