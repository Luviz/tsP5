import * as p5 from "p5";
import Walker from "../entities/Walker"

export const sketch = new p5((p: p5) => {
    let walker: Walker
    const h2 = document.createElement('h1');
    let realComp = 0, imagComp = 0

    const { createVector } = p;

    p.setup = () => {
        const canvas = p.createCanvas(600, 600);
        canvas.parent("p5");
        document.body.appendChild(h2);
        p.pixelDensity(1)
        p.frameRate(1);
    }

    let itter = 128
    p.draw = () => {
        p.background(0);
        p.loadPixels()
        const len = p.pixels.length
        const range = 2
        for (let y = 0; y < p.height; y++) {
            for (let x = 0; x < p.width; x++) {
                let color = p.color(100);
                let _realComp = p.map(x, 0, p.width,-range, range);
                let _imagComp = p.map(y, 0, p.height, -range, range );

                let cr = _realComp
                let ci = _imagComp

                for (let n = 0; n < itter; n++) {
                    const rc = (_realComp * _realComp) - (_imagComp * _imagComp)                    
                    const ic = 2 * _realComp * _imagComp
                    _realComp = rc + cr
                    _imagComp = ic + ci 
                    if (rc > itter) {
                        const alpha = p.map(Math.sqrt(n/itter), 0, 1, 0, 255);
                        color.setAlpha(alpha)
                        break;
                    }
                }

                SetPixel(y, x, color);


            }
        }
        if (itter < 255) {
            itter += itter 
            console.log(itter)
        } else {
        }
        p.noLoop()


        p.updatePixels()
        h2.innerText = `fps: ${Math.floor(p.frameRate()).toString()} `;
        h2.innerText += `\n z: ${itter} `;
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
