console.time("index");
import { sketch } from './sketches/MandelbrotSetAsync'
import { BuildMandArr, GetPixColor } from './sketches/MandelbrotSetAsyncCalc'
import Mandelbrot from './sketches/Mandelbrot'

declare const window: any;

window.matrix = [[]]


sketch
const mb = new Mandelbrot(600, 600, 0.00011);
mb.setItter(500);
mb.setOffSet(-0.00017999999999999998, 0.7468996000000003)

window.mb = mb;
window.runItter = (n: number) => {
    mb.setItter(n);
    window.matrix = mb.render();
}
window.panLeft = (n: number) => {
    mb.panLeft(n);
    window.matrix = mb.render();
}
window.panRight = (n: number) => {
    mb.panLeft(-n);
    window.matrix = mb.render();
}

window.panUp = (n: number) => {
    mb.panUp(n);
    window.matrix = mb.render();
}

window.panDown = (n: number) => {
    mb.panUp(-n);
    window.matrix = mb.render();
}

window.setRange= (n:number) => {
    mb.setRange(n);
    window.matrix = mb.render();
}
// console.timeLog("index");
// (window as any).matrix = [];
// console.timeLog("index");
// window.BuildMandArr = BuildMandArr;
// BuildMandArr(600, 600, 0.00021, -1.1455);
// console.timeLog("index");
// console.log(window.matrix)
window.matrix = mb.render();
// console.log(a)
// console.timeLog("index");
