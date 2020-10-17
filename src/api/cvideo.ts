import request, { ResponsePackage } from '@/utils/request'
import settings from './cvideo.settings'

export interface Device {
    id: number
    deviceName: string
    ip?: string

    /** parentID is the **device group id** */
    parentId: number

    cloudControl?: any
    type: number
    netType: number
    onlinestatus: number
    recStatus?: any
    longitude: number
    latitude: number
    saveType: number
}

export interface DeviceGroup {
    id: number
    groupName: string
    parentId: number
    orderNumber: number
    platformId?: any
    deviceId?: any
    type: number
    gbid: string
    outgbid: string
    children?: DeviceGroup[]
}

interface DevicesResponse {
    devices: Device[]
    devicegroups: DeviceGroup[]
}

interface QueryDevicesResponse {
    code: number
    msg: string
    data?: DevicesResponse
}

enum CenterType {
    dedicated, government, internet
}

enum RtpType {
    rtsp = "0",
    rtmp = "1",
    hls  = "2",
    flv  = "3"
}

interface GetVideoStreamParams {
    id: number
    centertype: CenterType
    rtptype: RtpType
}

interface GetVideoStreamResponse {
    code: number
    msg: string
    data: string
}

export function queryDevices(): Promise<DevicesResponse> {
    if ( process.env.NODE_ENV !== 'development' ) {
        return request.get<QueryDevicesResponse>(`${settings.api}/trees/client`)
            .then(res => {
                console.log(res)
                if ( res.status !== 200 )
                    throw new Error(`status code ${res.status} !== 200`)
                
                if ( res.data.code !== 1 )
                    throw new Error(`response code failed: ${res.data.code} - ${res.data.msg}`)
    
                return res.data.data
            })
    } else {
        return Promise.resolve({
            devices: [
                {
                    id: 1,
                    deviceName: 'device1',
                    parentId: 1,
                    type: 0,
                    netType: 0,
                    onlinestatus: 1,
                    longitude: null, latitude: null, saveType: 0
                },{
                    id: 2,
                    deviceName: 'device2',
                    parentId: 1,
                    type: 0,
                    netType: 0,
                    onlinestatus: 1,
                    longitude: null, latitude: null, saveType: 0
                },{
                    id: 3,
                    deviceName: 'device3',
                    parentId: 1,
                    type: 0,
                    netType: 0,
                    onlinestatus: 1,
                    longitude: null, latitude: null, saveType: 0
                },{
                    id: 4,
                    deviceName: 'device3',
                    parentId: 1,
                    type: 0,
                    netType: 0,
                    onlinestatus: 1,
                    longitude: null, latitude: null, saveType: 0
                },{
                    id: 5,
                    deviceName: 'device3',
                    parentId: 1,
                    type: 0,
                    netType: 0,
                    onlinestatus: 1,
                    longitude: null, latitude: null, saveType: 0
                }
            ],
            devicegroups: [
                {
                    id: 1,
                    groupName: "root1",
                    parentId: 0,
                    orderNumber: 1,
                    type: null, gbid: null, outgbid: null
                },
                {
                    id: 2,
                    groupName: "root2",
                    parentId: 0,
                    orderNumber: 1,
                    type: null, gbid: null, outgbid: null
                },
                {
                    id: 3,
                    groupName: "sub1",
                    parentId: 1,
                    orderNumber: 1,
                    type: null, gbid: null, outgbid: null
                },
                {
                    id: 4,
                    groupName: "sub2",
                    parentId: 1,
                    orderNumber: 1,
                    type: null, gbid: null, outgbid: null
                },
                {
                    id: 5,
                    groupName: "sub3",
                    parentId: 2,
                    orderNumber: 1,
                    type: null, gbid: null, outgbid: null
                }
            ]
        })
    }
}

export function getVideoStream(device_id: number,
                               rtptype: RtpType = RtpType.flv,
                               centertype: CenterType = CenterType.dedicated): Promise<string> {

    if ( process.env.NODE_ENV !== 'development' ) {
        throw new Error('getVideoStream API is unfinished')
    } else {
        let url: string = "http://192.168.2.180:50080/zksv/live/"

        switch ( device_id ) {
            case 1: url += "cam_3_3"; break;
            case 2: url += "cam_3_4"; break;
            case 3: url += "cam_3_2"; break;
            case 4: url += "cam_3_0"; break;
            case 5: url += "cam_3_5"; break;
            default: url += "cam_3_1";
        }

        return Promise.resolve(url)
    }
}
