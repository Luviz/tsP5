import * as p5 from "p5";
import Walker from "../entities/Walker"


declare let matrix: any[][];


export const sketch = new p5((p: p5) => {
    // let matrix: p5.Color[][]

    const h2 = document.createElement('h1');

    p.setup = () => {
        const canvas = p.createCanvas(600, 600);
        canvas.parent("p5");
        document.body.appendChild(h2);
        p.background(100)
        p.pixelDensity(1);
        // p.frameRate(15);
        console.time("init")
        console.log("FOO")
        // new Promise(async (r, e) => {
        //     console.time("async")
        //     console.log("ASYNC FOO")
        //     r("ASYNC");
        //     await BuildMandArr().then(a => console.log("DONE!"));
        //     console.log("ASYNC BAR");
        //     console.timeLog("async")

        // });
        // setTimeout(async () => await BuildMandArr().then(a => console.log("DONE!")), 1000)
        console.timeLog("init")
        console.log("Bar")

    }

    let itter = 512
    p.draw = () => {
        const _matrix = matrix ?? []
        // p.background(100,0,0);
        p.loadPixels()
        const len = p.pixels.length
        const range = 2
        // p.noLoop()
        if (_matrix){
            for (let iy = p.frameCount % 60 ; iy < matrix.length; iy += (60)) {
                for (const ix in matrix[iy]) {
                    if (matrix[iy][ix]) {
                        const y = Number(iy);
                        const x = Number(ix);
                        SetPixel(y, x, matrix[iy][ix]);
                    }
                }
            }
        }

        p.updatePixels()
        h2.innerText = `fps: ${Math.floor(p.frameRate()).toString()} `;
        h2.innerText += `\n z: ${itter} `;
        h2.innerText += `\n matrix Size: ${matrix?.length} `;
    }

    function SetPixel(y: number, x: number, color: p5.Color) {
        const d = p.pixelDensity();
        for (let i = 0; i < d; i++) {
            for (let j = 0; j < d; j++) {
                // loop over
                p.color("red");
                const index = 4 * ((y * d + j) * p.width * d + (x * d + i));
                p.pixels[index] = p.red(color);
                p.pixels[index + 1] = p.green(color);
                p.pixels[index + 2] = p.blue(color);
                p.pixels[index + 3] = p.alpha(color);
            }
        }
    }


})
