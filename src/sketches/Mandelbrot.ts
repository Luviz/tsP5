import { traceValue } from "../entities/Utilities";
// import { matrix } from "./MandelbrotSetAsyncCalc";

declare let window: any;

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

    constructor(height: number, width: number, range:number) {
        this._height = height;
        this._width = width;
        this._range = range;
        this._off_real = 0;
        this._off_imag = 0;
    }

    public setOffSet(real:number, imag:number){
        this._off_real = real;
        this._off_imag = imag;
    }

    public setItter = (val: number) => {
        this._itter = val;
    }

    public panLeft = (val: number) => {
        this._off_real -= val;
    }

    public panUp = (val: number) => {
        this._off_imag += val;
    }

    private _getRange() {
        return [
            this._range + this._off_real,
            this._range + this._off_imag,
        ]
    }

    private _getiRange() {
        return [
            -this._range + this._off_real,
            -this._range + this._off_imag,
        ]
    }

    render = () => {
        const matrix: any[][] = [[]];
        const { _height, _width, _range } = this;
        const [rangeX, rangeY] = this._getRange();
        const [irangeX, irangeY] = this._getiRange();
        for (let y = 0; y < _height; y++) {
            if (!matrix[y]) matrix[y] = [];
            for (let x = 0; x < _width; x++) {
                let realComp = map(x, 0, _width, irangeX, rangeX);
                let imagComp = map(y, 0, _height, irangeY, rangeY);
                matrix[y][x] = this.GetPixColor(realComp, imagComp)
            }
        }
        return matrix
    }

    colorFrom = (value: number, lim: number) => {
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
                color = this.colorFrom(alpha, itter);
                break;
            } else {
                color = [0, 0, 0]
            }
        }
        return color
    }
}