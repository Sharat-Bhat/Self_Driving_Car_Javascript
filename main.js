const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=700;

const laneCount=3;
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const road = new Road(carCanvas.width/2, carCanvas.width*0.9, laneCount);
// const car = new Car(road.getLaneCenter(1),100,30,50, "AI");
const N=100;
const cars=generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain"))
{
    for(let i=0; i<cars.length; i++)
    {
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain")
        );
        if(i!=0)
        {
            NeuralNetwork.mutate(cars[i].brain, 0.1);
        }
    }
    
}

const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -600, 30, 50, "DUMMY", 2),
    // new Car(road.getLaneCenter(2), -600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), 50, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -50, 30, 50, "DUMMY", 2)
];
animate();

function save()
{
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain)
    );
}

function discard()
{
    localStorage.removeItem("bestBrain");
}

function generateCars(N)
{
    const cars=[];
    for(let i=1; i<=N; i++)
    {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
    return cars;
}

function animate(time)
{
    for(let i=0; i<traffic.length; i++)
    {
        traffic[i].update(road.borders, []);
    }
    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;
    for(let i=0; i<cars.length; i++)
    {
        cars[i].update(road.borders, traffic);
    }

    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        )
    );

    // Save, translate, restore is used 
    // to keep car fixed and road moving
    carCtx.save();
    // for(let i=0; i<cars.length; i++)
        carCtx.translate(0, -bestCar.y + carCanvas.height*0.8);

    road.draw(carCtx);
    carCtx.globalAlpha=0.2;
    for(let i=0; i<cars.length; i++)
        cars[i].draw(carCtx, "blue");

    carCtx.globalAlpha=1;
    bestCar.draw(carCtx, "blue", true);
    for(let i=0; i<traffic.length; i++)
    {
        traffic[i].draw(carCtx, "red");
    }
    carCtx.restore();

    networkCtx.lineDashOffset= -time/50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);

    // Calls animate method again and
    requestAnimationFrame(animate);

}

// car.draw(carCtx);