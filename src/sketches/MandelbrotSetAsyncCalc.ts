// import * as p from "p5";

export declare let matrix: any[][];
export declare let window: any;

function map(n: number, start1: number, stop1: number, start2: number, stop2: number, withinBounds?: boolean) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
}

function colorA(grey: number) {
    return [grey, grey, grey];
}

function colorRGB(red: number, blue: number, green: number) {
    return [red, blue, green];
}


export async function BuildMandArr(width = 600, height = 600, range = 2.00, offReal = -1.13, offImg=0.21) {
    // await "aa";
    matrix = [[]];
    for (let y = 0; y < height; y++) {
        if (!matrix[y]) matrix[y] = [];
        for (let x = 0; x < width; x++) {
            let _realComp = map(x, 0, width, -range+offReal, range+offReal);
            let _imagComp = map(y, 0, height, -range+offImg, range+offImg);
            // SetPixel(y, x, color);
            matrix[y][x] = GetPixColor(_realComp, _imagComp)
        }
    }
}


const colorFrom = (value: number, lim: number) => {
    if (window['valMax'] < value){
        window['valMax'] = value 
    }else {
        window['valMax'] = 0 
    }
    const v = map(value, 0, lim, 0, 0x00ffff);
    if (v < 0xff) {
        return [0x00, 0x00, v]
    }
    else if (v < 0xff00) {
        return [0, v >> 8, 0xff]
    }else if (v < 0xffff){
        console.log("a")
        return [0, 0xff, v << 8]
    }else if (v < 0xffff00){
        return [0, 0xff, v << 8]
    }
    else {
        return [0xff, 0xff, 0xff]
    }
}

export function GetPixColor(realComp: number, imagComp: number, itter = 0xff) {
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
            const frac = 255 / 5
            // console.log({y,x, alpha, rd});
            // color = color(alpha - frac, alpha - frac * 2, alpha - frac * 3)
            // if (alpha < frac) {
            //     color = colorRGB(alpha, 0, 0)            // R
            // } else if (alpha < frac * 2) {
            //     color = colorRGB(alpha, alpha - frac, 0) // R G
            // } else if (alpha < frac * 3) {
            //     color = colorRGB(0, alpha, 0)            // G
            // } else if (alpha < frac * 4) {
            //     color = colorRGB(0, alpha, alpha - frac) // G B
            // } else if (alpha < frac * 5) {
            //     color = colorRGB(0, 0, alpha)            // B
            // } else {
            //     color = colorA(100)
            //     console.log(alpha)
            // }
            color = colorFrom(alpha, 255);
            break;
        } else {
            color = colorA(0) // INFI
        }
    }
    return color
}
