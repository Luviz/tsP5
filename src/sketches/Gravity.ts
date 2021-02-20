import * as p5 from "p5";
import Planet from "../entities/Planet";

export const sketch = new p5((p: p5) => {
    const p1 = new Planet(p, p.createVector(0), 50)
    const p2 = new Planet(p, p.createVector(0), 100)
    const p3 = new Planet(p, p.createVector(0), 10)
    const objects: Planet[] = [];
    p.setup = () => {
        const canvas = p.createCanvas(1600, 1600);
        canvas.parent("p5");
        p1.postion = p.createVector(100, 200)
        p1.color = p.color("blue")
        p1.EffectedBy.push(p2, p3)
        p1.ApplyForce(p.createVector(500, 0))

        p2.postion = p.createVector(p.width / 2, p.height / 2)
        p2.color = p.color("yellow")
        p2.mass *= 10
        p2.EffectedBy.push(p1, p3)

        p3.postion = p.createVector((p.width / 2) + 200, (p.height / 2) + 300)
        p3.color = p.color("red")
        p3.mass *= 10
        p3.EffectedBy.push(p1, p2)
        p3.ApplyForce(p.createVector(-1500, -1000))
        

        for (const planet of objects) {
            // planet()
        }

        objects.push(p1, p2, p3)

    }

    p.draw = () => {
        p.background(200)
        for (const planet of objects) {
            planet.GetGravAcc();
        }

        for (const planet of objects) {
            planet.Update();
            planet.Draw();
        }
    }
})