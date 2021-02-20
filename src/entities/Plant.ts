import { Vector } from "p5";
import Walker from "./Walker";

export default class Plant extends Walker {
    public EffectedBy: Walker[] = [];

    PastEdge(){

    }

    GetGravAcc() {
        for (const walker of this.EffectedBy) {
            const force = Vector.sub(walker.postion, this.postion);
            let dist = force.mag();
            const strength = (1 * this.mass * walker.mass) / (dist * dist);
            force.normalize();
            force.mult(strength);
            this.ApplyForce(force)
        }
    }
}