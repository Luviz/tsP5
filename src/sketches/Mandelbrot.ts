import { traceValue } from "../entities/Utilities";

export declare let matrix: any[][];

function map(n: number, start1: number, stop1: number, start2: number, stop2: number, withinBounds?: boolean) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

function colorA(grey: number) {
    return [grey, grey, grey];
}

function colorRGB(red: number, blue: number, green: number) {
    return [red, blue, green];
}

export default class Mandelbrot {
    private _height: number;
    private _width: number;
    private _range: number
    private _off_real: number;
    private _off_imag: number;
    private _itter: number;

    private _getRange() {
        return [
            this._range + this._off_real,
            this._range + this._off_imag,
        ]
    }

    render = () => {
        matrix = [[]];
        const { _height, _width, _range } = this;
        const [rangeX, rangeY] = this._getRange();
        for (let y = 0; y < _height; y++) {
            if (!matrix[y]) matrix[y] = [];
            for (let x = 0; x < _width; x++) {
                let realComp = map(x, 0, _width, -rangeX, rangeX);
                let imagComp = map(y, 0, _height, -rangeY, rangeY);

                matrix[y][x] = this.GetPixColor(realComp, imagComp)
            }
        }
    }

    /*
    0    0 black
    1    1-256 red
    2    256-512 yellow (red + green)
    3    512-756 green (yellow - red)
    4    756-1024 cyan (green + blue)
    5    1024-1280 blue (cyan - green)
    6    1280-1536 prupurl (blue + red)
    7    1280-1536 white (blue + red)
    */
    /*
     0 - black   
                (0, 0, v)
     1 - blue    
                (0, v-f*1, v)
     2 - cyan
     3 - green
     4 - yellow
     5 - red 
     6 - white
    */

    colorFrom = (value: number, lim: number) => {
        const v = map(value, 0, lim, 0, 0xffffff);
        if (v < 0xff) {
            return [0x00, 0x00, v]
        }
        else if (v < 0xff00) {
            return [0, v >> 8, 0xff]
        }
        else {
            return [0xff, 0xff, 0xff]
        }
    }

    GetPixColor = (realComp: number, imagComp: number, itter = this._itter) => {
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
                if (alpha < frac) {
                    color = colorRGB(alpha, 0, 0)            // R
                } else if (alpha < frac * 2) {
                    color = colorRGB(alpha, alpha - frac, 0) // R G
                } else if (alpha < frac * 3) {
                    color = colorRGB(0, alpha, 0)            // G
                } else if (alpha < frac * 4) {
                    color = colorRGB(0, alpha, alpha - frac) // G B
                } else if (alpha < frac * 5) {
                    color = colorRGB(0, 0, alpha)            // B
                } else {
                    color = colorA(100)
                    console.log(alpha)
                }
                break;
            } else {
                color = colorA(0) // INFI
            }
        }
        return color
    }
}