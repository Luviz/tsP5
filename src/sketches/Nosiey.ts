import * as p5 from "p5";
import Particle from "../entities/Particle";

export const sketch = new p5((p: p5) => {
    const h2 = document.createElement('h1');
    const { createVector } = p;
    const scl = 10;
    const arr: Particle[] = [];
    let zOff = 0;
    p.setup = () => {
        const canvas = p.createCanvas(800, 800);
        canvas.parent("p5");
        p.colorMode("hsb", 255)
        document.body.appendChild(h2);
        // p.noStroke();
        p.background(0);
        for (let a = 0; a < 400; a++) {
            const partical = new Particle(p);
            partical.postion = createVector(0, 0);
            const x = p.random(p.width), y = p.random(p.height)
            // w1.postion = p5.Vector.random2D();
            partical.postion = createVector(x, y)
            partical.color = p.color(255, 50);
            arr.push(partical);
        }
    }

    p.draw = () => {
        const inc = 0.01
        let yOff = 0
        const vectors = []
        for (let y = 0; y < p.height / scl; y++) {
            let xOff = 0
            for (let x = 0; x < p.width / scl; x++) {
                const angle = p.noise(xOff, yOff, zOff) * 4 * Math.PI * 2
                const v = p5.Vector.fromAngle(angle)
                v.setMag(1)
                vectors[x + y * p.height / scl] = v
                xOff += inc;
            }
            yOff += inc;
            zOff += 0.003;
        }
        for (const p of arr) {
            let frocePosX, frocePosY = 0
            try {
                var x = Math.floor(p.postion.x / scl);
                var y = Math.floor(p.postion.y / scl);
                var index = x + y * (p.p.width / scl);
                p.ApplyForce(vectors[index])
                p.Update();
                p.Draw();
            } catch (e) {
                console.log(frocePosX, frocePosY)
                debugger;
            }
        }

        h2.innerText = `${Math.floor(p.frameRate()).toString()} `;
    }
})