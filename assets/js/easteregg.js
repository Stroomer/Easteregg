class Easteregg extends ConvexShape
{
    constructor(x, y, id) {
        super(x, y, 52, 68);
        
        this.loadEggImage(id);
        
        this.id       = id;
        this.degrees  = id * (360 / 8);
        this.speed    = 0;
        this.angle    = 0;
        this.rotation = 0;
        this.startX = x;
        this.startY = y;

        this.centrifuge = 1;
        this.spacefloat = 2;
        this.broken     = 3;

        this.mode = this.centrifuge;

        this.reset(this.startX, this.startY);
    }

    loadEggImage(id) {
        let img = document.createElement('img');
        img.src = 'assets/img/eggs/small/paasei'+id+'.png';
        img.addEventListener('load', (data) => {
            this.image = data.target;
        });   
    }

    reset(x=this.startX, y=this.startY) {
        this.setPosition( x, y );
                
        //this.setSpeed( 150 );
        //this.setAngle( getRandomNumBetween(1,2)===1 ? getRandomNumBetween(150, 210) : getRandomNumBetween(330, 390) );  
    }

    convertToCentrifugalPosition(x, y, degrees, distance) {
        const radians = this.toRadians(degrees);
        const cx = x + (distance *  Math.cos(radians));
		const cy = y + (distance * -Math.sin(radians));
        return {x:cx, y:cy}
    }

    setDegrees(degrees) {
        this.degrees = (degrees >= 360) ? degrees-360 : degrees;
    }

    setPosition(x, y) {
        this.position.x = x;  
        this.position.y = y;
    }

    setSpeed(speed) {
        this.speed = Math.ceil(speed);
        console.log('set speed to '+this.speed);
    }

    setAngle(degrees) {
		const radians   = this.toRadians(degrees);
		this.velocity.x = this.speed *  Math.cos(radians);
		this.velocity.y = this.speed * -Math.sin(radians);
	}

    toRadians(degrees) { return degrees * (Math.PI / 180) }
	toDegrees(radians) { return (radians * 180) / Math.PI }
}

Easteregg.degrees  = 0;
Easteregg.distance = 100;
Easteregg.sinus    = 0.0;
