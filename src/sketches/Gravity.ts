import * as p5 from "p5";
import Plant from "../entities/Plant";

export const sketch = new p5((p: p5) => {
    const p1 = new Plant(p, p.createVector(0), 50)
    const p2 = new Plant(p, p.createVector(0), 100)
    p.setup = () => {
        const canvas  = p.createCanvas(800, 800);
        canvas.parent("p5");
        p1.postion = p.createVector(100, 200)
        p1.color= p.color("blue")
        p1.EffectedBy.push(p2)
        p1.ApplyForce(p.createVector(500,0))
        
        p2.postion = p.createVector(p.width/2, p.height/2)
        p2.color= p.color("yellow")
        p2.EffectedBy.push(p1)
        p2.mass *= 10
        // p2.ApplyForce(p.createVector(0,-1))
        
    }

    p.draw = () => {
        p.background(200)
        

        
        p1.GetGravAcc();
        p2.GetGravAcc();
        
        p1.Update();
        p2.Update();
        
        p1.Draw();
        p2.Draw();
    }
})