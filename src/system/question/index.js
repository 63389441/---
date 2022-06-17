import actionData from './action';
export default {
  getSentence(sentence) {
    let answer = this.fliterInformation(sentence.demo_1);
    return answer
  },
  //筛选数据
  fliterInformation(sentence) {
    const data = actionData;
    let keyTemp = '';
    let valueTemp = 0;
    let map = new Map();
    for (let index in sentence) {
      for (let item in data) {
        if (sentence[index].match(data[item].keywords)) {
          if (!map.has(data[item].type)) {
            map.set(data[item].type, 1)
          } else {
            let temp = map.get(data[item].type);
            console.log(temp++);
            map.set(data[item].type, temp++)
          }
        }
      }
    }
    //存在的话遍历map
    if (map.size) {
      for (var [key, value] of map) {
        console.log(value);
        if (valueTemp < value) {
          valueTemp = value;
          keyTemp = key;
        }
      }
    }
    return keyTemp
  }
}