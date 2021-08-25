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

    let itter = 512
    p.draw = () => {
        // p.background(100,0,0);
        p.loadPixels()
        const len = p.pixels.length
        const range = 2
        for (let y = 0; y < p.height; y++) {
            for (let x = 0; x < p.width; x++) {
                let color = p.color(100);
                let _realComp = p.map(x, 0, p.width, -range, range);
                let _imagComp = p.map(y, 0, p.height, -range, range);

                let cr = _realComp
                let ci = _imagComp

                for (let n = 0; n < itter; n++) {
                    const rc = (_realComp * _realComp) - (_imagComp * _imagComp)
                    const ic = 2 * _realComp * _imagComp
                    _realComp = rc + cr
                    _imagComp = ic + ci
                    if (rc > itter) {
                        const alpha = p.map(Math.sqrt(n / itter), 0, 1, 0, 255);
                        // color.setAlpha(alpha)
                        // if (alpha < 255/3){
                        //     color = p.color(alpha,0,0)
                        // }else if (alpha < (255/3 + 255)){
                        //     color = p.color(alpha-255,alpha,0)
                        // }else {
                        //     color = p.color(0,alpha/2,alpha)
                        // }
                        const frac = 255 / 6
                        // console.log({y,x, alpha, rd});
                        color = p.color(alpha - frac, alpha - frac * 2, alpha - frac * 3)
                        if (alpha < frac) {
                            color = p.color(alpha, 0, 0)            // R
                        } else if (alpha < frac * 2) {
                            color = p.color(alpha, alpha - frac, 0) // R G
                        } else if (alpha < frac * 3) {
                            color = p.color(0, alpha, 0)            // G
                        } else if (alpha < frac * 4) {
                            color = p.color(0, alpha, alpha - frac) // G B
                        } else if (alpha < frac * 5) {
                            color = p.color(0, 0, alpha)
                        } else {
                            // color = p.color(100)
                        }


                        break;
                    } else {
                        color = p.color(0)
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
