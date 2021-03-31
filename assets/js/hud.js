class Hud
{
    constructor(game) {
        // Parent object
        this.parent = game;

        // Verbinden met de hud-canvas (moet slechts 1x in het begin getekend worden)
        this.canvas  = document.getElementById('hud');
        this.context = this.canvas.getContext('2d');

        // Balken aanmaken (boven en onder)
        this.edges = [
            new Edge(this.canvas.width/2, 5, this.canvas.width, 10, 'pink'),
            new Edge(this.canvas.width/2, this.canvas.height-5, this.canvas.width, 10, 'pink'),
            new Edge(5, this.canvas.height/2, 10, this.canvas.height, 'pink'),
            new Edge(this.canvas.width-5, this.canvas.height/2, 10, this.canvas.height, 'pink'),
        ];

        this.mylabel = new Label(this.canvas.width/2, this.canvas.height/2, 10, 'purple', 'easter egg', 'center');


        // Tekenen van de Headsup-display
        this.draw();
    }

    draw() {
        // Scherm van de Headsup-display leeg maken
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Balken tekenen
        const edgeCount = this.edges.length;
        for(let i=0; i<edgeCount; i++) {
            const edge = this.edges[i];
            this.parent.drawRectangle(this.context, edge, edge.color);          
        }

        // Rectangles tekenen die onderdeel zijn van het Label
        this.mylabel.rectangles.forEach(rectangle => {
            this.parent.drawRectangle(this.context, rectangle, this.mylabel.color);    
        });
       
    }
}

