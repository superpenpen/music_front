import request, { ResponsePackage } from '@/utils/request'



interface ServerListResponse extends ResponsePackage<ServerListItem[]> {
    [propName: string]: any
}


export interface ServerListItem {
    id: number
    ip: string          // IP地址
    time: string        // 运行时间
    memory: string       // 总内存数
    cpus: number         // CPU核数
    irateCpu: string     // CPU使用率
    irateMemory: string  // 内存使用率
    diskRead: string       // 磁盘读取速度
    diskWrite: string       // 磁盘写入速度
    networkReceive: string       // 下载带宽
    networkTransmit: string       // 上传带宽
    fileSystemSize: string       // 分区使用率
    DCGMPower: string       // GPU实时功耗
    DCGMDevGPUUtil: string       // GPU瞬时使用率
    DCGMMemCopyUtil: string       // GPU内存使用率
    DCGMTemp: string       // GPU瞬时温度
  }

/**
 * serverList 服务器列表
 * @return 
 */
export function serverList() {
    return request.get<ServerListResponse>('/api/servers', {
    }).then(res => res.data)
}


/**
 * 服务器的CPU、内存、硬盘趋势
 */
export function getServerTrend() {
    return request.get('/api/servers/trends', {
    }).then(res => res.data)
}