import * as p5 from "p5";
import { util } from "webpack";

export default class Walker {
    public p: p5
    public postion: p5.Vector;
    public velocity: p5.Vector;
    public acceleration: p5.Vector;
    public size: number;
    public color: p5.Color
    public mass: number
    public debug = false;
    public debug_hist: number[] = [];

    constructor(p: p5, pos: p5.Vector, size: number) {
        this.p = p;
        this.postion = pos
        this.velocity = p.createVector(0, 0)
        this.acceleration = p.createVector(0, 0)
        this.size = size
        this.color = this.p.color("green")
        this.color.setAlpha(200)
        this.mass = size * 5;
    }

    public Update() {
        this.velocity.add(this.acceleration)
        this.PastEdge();
        this.acceleration = this.p.createVector(0, 0);
        this.postion.add(this.velocity);
    }

    public ApplyForce(vector: p5.Vector) {
        const f = p5.Vector.div(vector, this.mass)
        this.acceleration.add(f);
    }

    public Draw() {
        this.p.push();
        this.p.fill(this.color)

        this.p.circle(this.postion.x, this.postion.y, this.size)
        this.p.pop();
    }

    private GetKineticEnergy(velocity: number) {
        return (this.mass * velocity * velocity) * 0.5
    }

    private GetVelocity(energy: number) {
        if (energy < -25) {
            return 0
        }
        return Math.sqrt(2 * energy / this.mass)
    }

    protected PastEdge() {
        const elasticity = 0.75;
        const r = this.size * 0.5;
        const w = this.p.width - r, h = this.p.height - r;
        const nextPostion = this.postion.copy().add(this.velocity);

        if (!(r < nextPostion.x && nextPostion.x < w)) {
            const eneryAtImpact = this.GetKineticEnergy(this.velocity.x);
            this.velocity.x *= -elasticity //this.GetVelocity(eneryAtImpact);
            this.postion.x = this.postion.x < this.size ? r : w;
        }
        if (!(r < nextPostion.y && nextPostion.y < h)) {
            const eneryAtImpact = this.GetKineticEnergy(this.velocity.y);
            this.velocity.y *= -elasticity //this.GetVelocity(eneryAtImpact);
            this.postion.y = this.postion.y < this.size ? r : h;
            if (this.debug) {
                this.debug_hist.push(eneryAtImpact)
                if (this.debug_hist[this.debug_hist.length - 2] < this.debug_hist[this.debug_hist.length - 1]) {
                    this.p.frameRate()
                }
            }

        }
    }
}