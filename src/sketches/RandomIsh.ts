import * as p5 from "p5";
import { SingleEntryPlugin } from "webpack";
import { traceValue } from "../entities/Utilities";
import Walker from "../entities/Walker"

export const sketch = new p5((p: p5) => {
    let walker: Walker

    const { createVector } = p;

    p.setup = () => {
        const canvas = p.createCanvas(800, 800);
        canvas.parent("p5");
        walker = new Walker(p, createVector(p.width / 2, p.height / 2), 50);
        walker.ApplyForce(createVector(100, 200))
    }


    const t1: number[] = [], t2: number[] = [], t3: number[] = [], t4: number[] = [],
        t5: number[] = [], t6: number[] = [], t7: number[] = [], t8: number[] = [], t9: number[] = [];
    p.draw = () => {
        p.background(200);
        walker.Update();
        // p.circle(p.random(p.width, 20 ), 100, 20)

        if (p.mouseIsPressed) {
            const vMouse = p.createVector(p.mouseX, p.mouseY);
            const wPos = walker.postion.copy();
            const fg = vMouse.sub(wPos);
            const r = fg.mag();
            fg.setMag(walker.mass * 100 / r ** 2)

            walker.ApplyForce(fg)
        }

        // p.noStroke()

        const noiseVal = p.noise(p.frameCount / 100, 10);
        const size = p.map(noiseVal, 0, 1, 10, 60);
        const color = p.map(noiseVal, 0, 1, 0, 255);

        // p.noFill();
        
        
        traceValue(p, (color) * 0.5, "black", t1)
        traceValue(p, (color) * 0.1, "blue", t2)
        traceValue(p, (color) * 1.0, "red", t3)
        
        const offSet = p.height/2
        const sinOverT = 50 * Math.sin(1 * p.frameCount * Math.PI / p.width);
        const conOverT = 50 * Math.cos(1 * p.frameCount * Math.PI / p.width);

        traceValue(p, (color) + sinOverT, "green", t4)
        // traceValue(p, offSet, "brown", t6)
        traceValue(p, offSet + sinOverT + conOverT, "yellow", t7)
        traceValue(p, offSet + sinOverT - conOverT, "green", t9)
        traceValue(p, offSet + sinOverT, "grey", t5)
        traceValue(p, offSet + conOverT, "magenta", t8)
        // traceValue(p, (size), "red", values)
        walker.size = size;
        walker.color = p.color(color);
        walker.Draw();
    }


})