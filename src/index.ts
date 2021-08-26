console.time("index");
import {sketch} from './sketches/MandelbrotSetAsync'
import {BuildMandArr, GetPixColor} from './sketches/MandelbrotSetAsyncCalc'

declare const window:any;

console.timeLog("index");
(window as any).matrix = [];
console.timeLog("index");
window.BuildMandArr = BuildMandArr;
BuildMandArr();
console.timeLog("index");
// console.log(window.matrix)
sketch
console.timeLog("index");