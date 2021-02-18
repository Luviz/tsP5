import * as p5 from "p5";


new p5((p: p5)=> {
    p.setup = () => {
        const canvas  = p.createCanvas(400, 400);
        canvas.parent("p5")
        p.background(200)
    }
    p.draw = () => {
        p.circle(100, 100, 20)
    }
})