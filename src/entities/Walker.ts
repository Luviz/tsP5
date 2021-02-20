import * as p5 from "p5";
import { util } from "webpack";

export default class Walker {
    public p: p5
    public postion: p5.Vector;
    public velocity: p5.Vector;
    public acceleration: p5.Vector;
    public size: number;
    public color : p5.Color

    constructor(p: p5, pos: p5.Vector, size: number) {
        this.p = p;
        this.postion = pos
        this.velocity = p.createVector(0, 0)
        this.acceleration = p.createVector(0, 0)
        this.size = size
        this.color = this.p.color("green")
        this.color.setAlpha(200)
    }

    public Update() {
        this.PastEdge();
        this.velocity.add(this.acceleration)
        this.acceleration = this.p.createVector();
        this.postion.add(this.velocity);
    }

    public ApplyForce(vector: p5.Vector) {
        this.acceleration.add(vector);
    }

    public Draw() {
        this.p.push();
        this.p.fill(this.color)
        
        this.p.circle(this.postion.x, this.postion.y, this.size)
        this.p.pop();
    }

    private PastEdge() {
        const size = this.size*0.5;
        const w = this.p.width - size, h = this.p.height - size;
        if (this.postion.x < size || this.postion.x > w){
            console.log(w,h,size)
            this.velocity.x *= -0.9
        }
        if (this.postion.y < size || this.postion.y > h){
            this.velocity.y *= -0.9
        }
    }
}