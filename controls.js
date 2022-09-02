class Controls{
    constructor(type)
    {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        switch(type)
        {
            case "KEYS":
                // Private method
                this.#addKeyboardListeners();
                break;
            case "DUMMY":
                this.forward=true;
                break;
        }
    }
    #addKeyboardListeners()
    {
        // function(event) == (event)=> 
        // ()=> has reference
        // otherwise copies values
        document.onkeydown=(event)=>
        {
            switch(event.key)
            {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
            // Print values in the console
            // console.table(this);
        }

        document.onkeyup=(event)=>
        {
            switch(event.key)
            {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
            // console.table(this);
        }
        
    }
}