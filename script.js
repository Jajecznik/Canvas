window.onload = function() {
    document.ontouchmove = function(e) { 
        e.preventDefault() 
    }

    let canvas  = document.getElementById('canv');
    let canvastop = canvas.offsetTop
    let context = canvas.getContext("2d");

    // Set display size (vw/vh).
    const margin_border = 22
    let sizeWidth = window.innerWidth - margin_border,
        sizeHeight = 50 * window.innerHeight / 100

    //Setting the canvas site and width to be responsive 
    canvas.width = sizeWidth
    canvas.height = sizeHeight
    canvas.style.width = sizeWidth
    canvas.style.height = sizeHeight

    let lastX
    let lastY

    context.strokeStyle = "#000000";
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 1;

    // Selecting all the div that has a class of clr
    let clrs = document.querySelectorAll(".color")
    // Converting NodeList to Array
    clrs = Array.from(clrs)

    clrs.forEach(clr => {
        clr.addEventListener("click", () => {
            context.strokeStyle = clr.dataset.clr
        })
    })

    canvas.ontouchmove = function(event){                   
        event.preventDefault();                 
    
        let newX = event.touches[0].pageX;
        let newY = event.touches[0].pageY - canvastop;
    
        line(lastX, lastY, newX, newY);
        
        lastX = newX;
        lastY = newY;
    }

    canvas.ontouchstart = function(event){                   
        event.preventDefault();                 
        
        lastX = event.touches[0].pageX;
        lastY = event.touches[0].pageY - canvastop;
    
        dot(lastX, lastY);
    }

    const selectElement = document.querySelector('#thickness')
    selectElement.addEventListener('change', (event) => {
        context.lineWidth = event.target.value
    })

    function dot(x, y) {
        context.beginPath();
        context.fillStyle = "#000000";
        context.arc(x, y, 1, 0, Math.PI * 2, true);
        context.fill();
        context.stroke();
        context.closePath();
    }

    function line(fromX, fromY, toX, toY) {
        context.beginPath();
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
        context.closePath();
    }

    let clearButton = document.getElementById('clear')
    clearButton.onclick = function() {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    //clear()
}
