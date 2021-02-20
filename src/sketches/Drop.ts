import * as p5 from "p5";
import Walker from "../entities/Walker"

export const sketch = new p5((p: p5) => {
    let walker: Walker
    const walkers: Walker[] = [];

    const { createVector } = p;

    p.setup = () => {
        const canvas = p.createCanvas(800, 800);
        canvas.parent("p5");
        walker = new Walker(p, createVector(p.width / 2, p.height / 2), 50);
        walker.debug = true
        for (let i = 5; i < 10; i++) {
            const initX = 20 + i * 50, initY = 50
            const w = new Walker(p, createVector(initX, initY), 10 + i * 4)
            w.color = p.color("grey");
            w.color.setAlpha(128)
            walkers.push(w);
        }
        walkers.push(walker)
    }

    p.draw = () => {
        p.background(200);
        let xAcc = 0;
        for (const listWalker of walkers) {
            if (p.mouseIsPressed) {
                console.log("wind");
                
                listWalker.ApplyForce(p.createVector(1,0))
            }
            const fg = p.createVector(xAcc, 1*listWalker.mass);
            listWalker.ApplyForce(fg)
            listWalker.Update()
            listWalker.Draw();
        }
    }
})