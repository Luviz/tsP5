import * as p5 from "p5";
import Planet from "../entities/Planet";

export const sketch = new p5((p: p5)=> {
    const objects: Planet[] = [];
    let mouseTrace: p5.Vector[] = []
    const canvCenter = p.createVector(0, 0)

    const {createVector} = p;

    function createPlant(color: string, size: number) {
        const planet = new Planet(p, p.createVector(0), size)
        planet.color = p.color(color)
        planet.id = color;
        return planet;
    }

    p.setup = () => {
        const canvas  = p.createCanvas(1600, 1600);
        canvas.parent("p5");
        const initFvalue = 420;
        canvCenter.x = p.width / 2;
        canvCenter.y = p.height / 2;

        const p1 = createPlant("yellow", 150);

        const p2 = createPlant("blue", 75);
        p2.setPostion(600, 0);
        p2.ApplyForce(p.createVector(0, initFvalue))

        const p2a = createPlant("brown", 5);
        p2a.setPostion(680, 0);
        p2a.ApplyForce(p.createVector(0, 80))


        objects.push(p1, p2, p2a)

        // for (const obj of objects) {
        //     obj.EffectedBy.push(...objects.filter(o => obj !== o))
        // }
        p2.EffectedBy.push(p1,p2a)
        p2a.EffectedBy.push(p1,p2)
    }
    
    p.draw = () => {
        p.background(200);
        p.scale(0.75)
        p.translate(canvCenter.x, canvCenter.y)
        const mouseVector = p.createVector(p.mouseX, p.mouseY);

        if (p.mouseIsPressed) {
            mouseTrace.push(mouseVector);
            const deltaMouse = mouseTrace[mouseTrace.length-1].copy().sub(mouseTrace[mouseTrace.length-2])
            canvCenter.add(deltaMouse.copy().limit(50))
        } else {
            mouseTrace = []
        }

        for (const obj of objects) {
            obj.GetGravAcc();
        }

        for (const o of objects) {
            o.Update();
            o.Draw();
        }
    }
})