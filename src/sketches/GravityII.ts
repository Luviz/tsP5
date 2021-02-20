import * as p5 from "p5";
import Planet from "../entities/Planet";

export const sketch = new p5((p: p5) => {
    const objects: Planet[] = [];

    function createPlant(color: string, size: number) {
        const planet = new Planet(p, p.createVector(0), size)
        planet.color = p.color(color)
        planet.id = color;
        return planet;
    }

    p.setup = () => {
        const canvas = p.createCanvas(1600, 1600);
        canvas.parent("p5");
        const initFvalue = 63.246//59.9998;
        

        const p1 = createPlant("yellow", 150);

        const p2 = createPlant("blue", 10);
        p2.setPostion(500, 0);
        p2.ApplyForce(p.createVector(0, -initFvalue))


        const p3 = createPlant("red", 10);
        p3.setPostion(0, 500);
        p3.ApplyForce(p.createVector(initFvalue, 0))


        const p4 = createPlant("black", 10);
        p4.setPostion(0, -500);
        p4.ApplyForce(p.createVector(-initFvalue, 0))

        const p5 = createPlant("orange", 10);
        p5.setPostion(-500, 0);
        p5.ApplyForce(p.createVector(0, initFvalue))

        objects.push(p1, p2, p3, p4, p5)

        for (const obj of objects) {
            obj.EffectedBy.push(...objects.filter(o => obj !== o))
        }
    }
    let a = 1000
    p.draw = () => {
        p.background(200);
        p.translate(p.width / 2, p.height / 2)

        for (const obj of objects) {
            obj.GetGravAcc();
        }

        for (const o of objects) {
            o.Update();
            o.Draw();
        }

        p.fill("grey");
        p.circle(0, 0, 5);
    }
})