

// 角色
export function roleName(value: number): string {
  if (typeof value == 'undefined') {
    return ''
  }
  value = Number(value);
  switch (value) {
    case 0:
      return "超级管理员"
    case 1:
      return "管理员"
    case 2:
      return "普通用户"
    default:
      return ""
  }
}


// 运行状态
export function taskState(value: number): string {
  if (typeof value == 'undefined') {
    return ''
  }
  value = Number(value);
  switch (value) {
    case 0:
      return "运行中"
    case 1:
      return "未运行"
    case 2:
      return "运行失败"
    default:
      return ""
  }
}

// 请求返回信息类型
export function responseTypeName(value: number): string {
  if (typeof value == 'undefined') {
    return ''
  }
  value = Number(value);
  switch (value) {
    case 0:
      return "字符串"
    case 1:
      return "JSON"
    case 2:
      return "图片"
    case 3:
      return "二进制"
    default:
      return ""
  }
}


// 推理服务任务类型
export function taskTypeName(value: number): string {
  if (typeof value == 'undefined') {
    return ''
  }
  value = Number(value);
  switch (value) {
    case 0:
      return "图片"
    case 1:
      return "视频"
    default:
      return ""
  }
}
