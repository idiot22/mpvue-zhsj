// 将对象转变为style字符串
export function showJson (style) {
  let s = []
  for (let i in style) {
    s.push(i + ':' + style[i])
  }
  s = s.join(';')
  return s
}
