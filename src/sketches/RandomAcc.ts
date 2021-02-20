import * as p5 from "p5";
import Walker from "../entities/Walker"

export const sketch = new p5((p: p5)=> {
    let walker: Walker

    const {createVector} = p;

    p.setup = () => {
        const canvas  = p.createCanvas(800, 800);
        canvas.parent("p5");
        walker = new Walker(p, createVector(p.width/2, p.height/2), 50);
    }
    
    p.draw = () => {
        p.background(200);
        walker.ApplyForce(createVector(p.random(-10,10),p.random(-10,10)))
        walker.Update();
        // p.circle(p.random(p.width, 20 ), 100, 20)
        walker.Draw();
    }
})