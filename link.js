class Link{
    constructor(bodyA,bodyB){
        var lastlink = bodyA.body.bodies.length-2
        this.link = Constraint.create({
          bodyA : bodyA.body.bodies[lastlink], 
          bodyB : bodyB,
          length : -10,
          stiffness : 0.01

        })
        World.add(world,this.link)
    }
   detatch(){
     World.remove(world,this.link)
     

   }
      
    }

