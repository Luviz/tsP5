import * as p5 from "p5";


new p5((p: p5)=> {
    p.setup = () => {
        const canvas  = p.createCanvas(400, 400);
        canvas.parent("p5")
    }
    p.draw = () => {
        p.background(0)

    }
})