


export function randomNumBoth(Min: number, Max: number): number {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}

/**
 * [getQueryObject 获取地址栏参数]
 * @param  {[type]} url [url地址]
 * @return {[object]}     [返回 url包含的 所有参数 对象键值对]
 */
export function getQueryObject(url: string): { [propName: string]: any } {
    url = url == null ? window.location.href : url
    const search: string = url.substring(url.lastIndexOf('?') + 1)
    const obj: { [propName: string]: any } = Object.create(null)
    const reg: RegExp = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
        const name: string = decodeURIComponent($1)
        let val: any = decodeURIComponent($2)
        val = String(val)
        obj[name] = val
        return rs
    })
    return obj
}

/**
 * 判断是否为对象
 * @return {[boolean]}
 */
export function isPlainObject(data: any): boolean {
    return Object.prototype.toString.call(data) === '[object Object]'
}
/**
 * 判断是否为数组
 * @return {[boolean]}
 */
export function isPlainArray(data: any): boolean {
    return Object.prototype.toString.call(data) === '[object Array]'
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func: () => any, wait: number, immediate?: boolean): () => void {
    let timeout: number | null;

    return function (this: any) {
        const context = this;
        const args: any[] = Array.prototype.slice.call(arguments)

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            const callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait)
            if (callNow) { func.apply(context, args as []) }
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args as [])
            }, wait);
        }
    }
}
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
export function throttle(func: () => any, wait: number, type?: number): () => void {
    let previous: number;
    let timeout: number | null;
    if (type === 1) {
        previous = 0;
    }
    return function (this: any) {
        const context = this;
        const args: any[] = Array.prototype.slice.call(arguments)
        if (type === 1) {
            const now = Date.now();

            if (now - previous > wait) {
                func.apply(context, args as []);
                previous = now;
            }
        } else if (type === 2) {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args as [])
                }, wait)
            }
        }
    }
}

export const storage = {
    set(key: string, val: any) {
        localStorage.setItem(key, val)
    },
    get(key: string): any {
        let keyVal
        // JSON.parse方法 字符串数子 转换 为数字
        try {
            keyVal = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : ''
        } catch (e) {
            keyVal = localStorage.getItem(key)
        }
        return keyVal
    },
    remove(key: string): void {
        localStorage.removeItem(key)
    },
    clear(): void {
        localStorage.clear()
    }
}