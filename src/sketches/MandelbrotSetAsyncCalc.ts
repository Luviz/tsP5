// import * as p from "p5";

export declare let matrix: any[][];
export declare let window: any;

function map(n: number, start1: number, stop1: number, start2: number, stop2: number, withinBounds?: boolean) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

function colorA(grey: number) {
    return [grey, grey, grey];
}

function colorRGB(red: number, blue: number, green: number) {
    return [red, blue, green];
}


export async function BuildMandArr(width = 600, height = 600, range = 2.00, offReal = -1.13, offImg = 0.21) {
    // await "aa";
    matrix = [[]];
    for (let y = 0; y < height; y++) {
        if (!matrix[y]) matrix[y] = [];
        for (let x = 0; x < width; x++) {
            let _realComp = map(x, 0, width, -range + offReal, range + offReal);
            let _imagComp = map(y, 0, height, -range + offImg, range + offImg);
            // SetPixel(y, x, color);
            matrix[y][x] = GetPixColor(_realComp, _imagComp)
        }
    }
}


const colorFrom = (value: number, lim: number) => {
    const getGrey = (start: number, end: number, pos: number) => start + pos * (end - start);

    const procent = map(value, 0, lim, 0, 1);

    const gry = (p = procent) => getGrey(0x00, 0xff, p / (1 / 6));
    const igry = (p = procent) => getGrey(0xff, 0x00, p / (1 / 6));

    if (procent <= 1 / 6) {
        return [0, 0, gry()];
    } else if (procent > 1 / 6 && procent <= 2 / 6) {
        return [0x00, gry(procent - 1 / 6), 0xff];
    }
    else if (procent > 2 / 6 && procent <= 3 / 6) {
        return [0x00, 0xff, igry(procent - 2 / 6)]
    }
    else if (procent > 3 / 6 && procent <= 4 / 6) {
        return [gry(procent - 3 / 6), 0xff, 0]
    }
    else if (procent > 4 / 6 && procent <= 5 / 6) {
        return [0xff, igry(procent - 4 / 6), 0]
    }
    else if (procent > 5 / 6 && procent <= 6 / 6) {
        return [0xff, gry(procent - 5 / 6), gry(procent - 5 / 6)]
    }

    return [0xff, 0xff, 0xff];
}

export function GetPixColor(realComp: number, imagComp: number, itter = 0xff*2.5) {
    let cr = realComp
    let ci = imagComp
    let color = colorA(100);

    for (let n = 0; n < itter; n++) {
        const rc = (realComp * realComp) - (imagComp * imagComp)
        const ic = 2 * realComp * imagComp
        realComp = rc + cr
        imagComp = ic + ci
        if (rc > itter) {
            const alpha = map(Math.sqrt(n / itter), 0, 1, 0, 255);
            color = colorFrom(alpha, itter);
            break;
        } else {
            color = [0,0,0] // INFI
        }
    }
    // return [0xff,0,0xff]
    return color
}

