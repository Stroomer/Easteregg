class Game
{
    constructor() {
        // Verbinden met de ponggame-canvas (moet iedere frame opnieuw getekend worden)
        this.canvas  = document.getElementById('animation');
        this.context = this.canvas.getContext('2d');

        // Heads-up display aanmaken
        this.hud = new Hud(this);

        // Paaseitjes aanmaken
        this.eggs = [];
        for(let i=0; i<8; i++) {
            this.eggs.push(new Easteregg(100, 200, (i%8)+1));
        }
        
        // Keyboard input opvangen voor speler1 (human)
        this.keys = [];
        window.addEventListener('KEY_DOWN', event => {
            switch(event.detail) {
                case 'ArrowUp':   /* OR */ case 38:   this.keys[38] = true; break;    
                case 'ArrowDown': /* OR */ case 40:   this.keys[40] = true; break;
            }
        });

        window.addEventListener('KEY_UP', event => {
            switch(event.detail) {
                case 'ArrowUp':   /* OR */ case 38:   this.keys[38] = false; break;    
                case 'ArrowDown': /* OR */ case 40:   this.keys[40] = false; break;
            }
        });

        // Gameloop aanmaken
        let lastTime;
        const callback = (milliseconds) => {
            if(lastTime) {
                this.update((milliseconds - lastTime) / 1000);
                this.draw();
            }
            lastTime = milliseconds;
            window.requestAnimFrame(callback);
        }
        callback();
    }

    update(deltatime) {
        // Ei-positie updaten
        const eggCount = this.eggs.length;
        for(let i=0; i<eggCount; i++) {
            this.eggs[i].position.x += this.eggs[i].velocity.x * deltatime;
            this.eggs[i].position.y += this.eggs[i].velocity.y * deltatime;
        }     
    }
    
    checkCollisions(ball, edges, deltatime) {
         
    }    

    drawRectangle(ctx, rect, color='white') {
        ctx.fillStyle = color;
        ctx.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const eggCount = this.eggs.length;
        for(let i=0; i<eggCount; i++) {
            let egg = this.eggs[i];
            if(egg.image) {
                const startX = egg.position.x-(egg.size.x/2);
                const startY = egg.position.y-(egg.size.y/2);
                //const centrifugalPosition = egg.convertToCentrifugalPosition(startX, startY, egg.degrees+Easteregg.degrees , Easteregg.distance);
                this.context.drawImage(egg.image, startX, startY);   // centrifugalPosition.x, centrifugalPosition.y
            }
        }

        // Easteregg.distance = 100 + (Easteregg.sinus*2);
        // Easteregg.degrees++;
        // console.log( Easteregg.sinus );
        // Easteregg.sinus += (Math.PI*2) / 90;


        

    }

    collide(rect1, rect2, dt) {
        if (rect1.left   + rect1.velocity.x * dt < rect2.right  + rect2.velocity.x * dt &&
            rect1.right  + rect1.velocity.x * dt > rect2.left   + rect2.velocity.x * dt &&
            rect1.top    + rect1.velocity.y * dt < rect2.bottom + rect2.velocity.y * dt &&
            rect1.bottom + rect1.velocity.y * dt > rect2.top    + rect2.velocity.y * dt) {
            return true;
        }else{
            return false;
        }
    }
}