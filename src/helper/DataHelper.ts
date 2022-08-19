export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function removeFromArray(array: any[], value: string|number|object) {
    const index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
}

export function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

export async function sleep(delay) {
    return await new Promise((r) => setTimeout(r, delay))
}

export function formatPercent(percent, digits) {
    return (percent*100).toFixed(digits)
}

export function findValueByPartial(data, partial: string, key: string) {
    for(const dataFragment of data) {
        if(dataFragment[key].includes(partial)) {
            return dataFragment[key]
        }
    }
}

export function limitString(input:string, length: number) {
    if(input.length < length) {
        return input
    }
    return input.slice(0, length)
}

export function parsePageData(rawData: string, data) {
    const parsedData = rawData.replace(/(\${data).*?(})/g, (match) => {
        const dataProperty = match
            .replace(/(\${data.)/g, '')
            .replace(/(})/g, '')

        if(typeof data[dataProperty] === 'undefined') {
            return match
        }
        return data[dataProperty]
    })
    return parsedData
}

export function stripAnsi(input: string) {
    return input.replace(
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        '')
}

export function getObjectValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

export function formatTimestamp(seconds) {
    if (isNaN(Number(seconds)) || !isFinite(seconds)) { return 'N/A' }

    seconds = seconds.toFixed(0)

    const currentDate = new Date()

    const deltaStamp = (seconds * 1000) - currentDate.getTime()
    const deltaHours = deltaStamp / (1000 * 3600)

    if(deltaHours > 24) {
        return `<t:${seconds}:f>`
    }

    return `<t:${seconds}:t>`
}

export function formatTime(seconds) {
    if (isNaN(Number(seconds)) || !isFinite(seconds)) {seconds = 0}
    let isNeg = false
    if (seconds < 0) {
        seconds = Math.abs(seconds)
        isNeg = true
    }
    const h = Math.floor(seconds / 3600)
    const m = Math.floor(seconds % 3600 / 60)
    const s = Math.floor(seconds % 3600 % 60)

    let r = `${s  }s`
    r = `${m  }m ${  r}`
    if (h > 0) {r = `${h  }h ${  r}`}

    return (isNeg) ? `-${  r}` : r
}