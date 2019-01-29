var canvas = document.getElementById("maze");
var width = canvas.width = window.innerHeight*.7;
var height = canvas.height = window.innerHeight*.7;
var ctx = canvas.getContext('2d');

function paintSquare(x,y,color) {
    //Top is 0 y. Left is 0 x
    let between = width / 25;
    ctx.fillStyle = color;
    ctx.fillRect(x * between, y * between, between, between);
}

function point(x_coord, y_coord) {

    this.x = x_coord;
    this.y = y_coord;
}

function apoint(x_coord, y_coord, goal_x, goal_y, last_node) {
    //g cost is distance from starting node
    //h cost is distance from end node
    //f cost = g + h
    this.x = x_coord;
    this.y = y_coord;
    this.h = Math.abs(x_coord - goal_x) + Math.abs(y_coord - goal_y);
    this.g = Math.abs(x_coord - 12) + Math.abs(y_coord - 24);
    this.f = Math.abs(x_coord - goal_x) + Math.abs(y_coord - goal_y) +  Math.abs(x_coord - 12) + Math.abs(y_coord - 24);
    this.parent = last_node;
}

function prims(x,y,grid) {
    grid[x][y] = 0;
    paintSquare(x,y,"#ffffff");
    var walls = [];
    walls.push(new point(x,y-1));

    while (walls.length != 0) {
        let index = Math.floor(Math.random()*walls.length);
        let pt = walls[index];
        let count = 0;
        
        if (grid[pt.x+1][pt.y] == 0){
            count++;
        }
        if (grid[pt.x-1][pt.y] == 0){
            count++;
        }
        if (grid[pt.x][pt.y+1] == 0){
            count++;
        }
        if (grid[pt.x][pt.y-1] == 0){
            count++;
        }


        if (count > 1 || pt.x == 24 || pt.x == 0 || pt.y == 0 || pt.y == 24);
        else {
            grid[pt.x][pt.y] = 0;
            paintSquare(pt.x,pt.y,"#ffffff");
            if (grid[pt.x-1][pt.y] == 1 && pt.x-1 != 0) {
                walls.push(new point(pt.x-1,pt.y));
            }
            if (grid[pt.x][pt.y+1] == 1 && pt.y+1 != 24) {
                walls.push(new point(pt.x,pt.y+1));
            }
            if (grid[pt.x][pt.y-1] == 1 && pt.y-1 != 0) {
                walls.push(new point(pt.x,pt.y-1));
            }
            if (grid[pt.x+1][pt.y] == 1 && pt.x+1 != 24) {
                walls.push(new point(pt.x+1,pt.y));
            }
        }
        walls.splice(index,1);
    }
    var top = [];
    var bottom = [];
    for (let i = 0; i < size; i++) {
        if(grid[i][1] == 0) {
            top.push(i);
        }
        if(grid[i][23] == 0) {
            bottom.push(i);
        }
    }
    let topIndex = Math.floor(Math.random()*top.length);
    let bottomIndex = Math.floor(Math.random()*bottom.length);
    grid[top[topIndex]][0] = 0;
    grid[bottom[bottomIndex]][24] = 0;
    paintSquare(top[topIndex],0,"#ffffff");
    paintSquare(bottom[bottomIndex],24,"#ffffff");
    startx = bottom[bottomIndex];

    return grid;
}

function DFS(s) {
    if (DFSgrid[s.x][s.y] == 3) {
        return [];
    }
    else {
    paintSquare(s.x,s.y,"#33cc33");
    var stack = [];
    var order = [];
    stack.push(s);
    while (stack.length != 0) {
        let u = stack.pop();
        order.push(u);
        if (DFSgrid[u.x][u.y] == 0) {
            DFSgrid[u.x][u.y] = 2;
            if (u.y-1 == 0 && DFSgrid[u.x][u.y-1] == 0) {
                order.push(new point(u.x,u.y-1));
                break;
            }

            if (DFSgrid[u.x][u.y+1] == 0 && u.y+1 != 0) {
                stack.push(new point(u.x,u.y+1));
            }
            
            if (DFSgrid[u.x+1][u.y] == 0 && u.x+1 != 0) {
                stack.push(new point(u.x+1,u.y));
            }
            
            if (DFSgrid[u.x-1][u.y] == 0 && u.x-1 != 0) {
                stack.push(new point(u.x-1,u.y));
            }

            if (DFSgrid[u.x][u.y-1] == 0 && u.y-1 != 0) {
                //up
                stack.push(new point(u.x,u.y-1));
            }
            
            
        }
    }
    return order;
    }
}

function BFS(s) {
    if (BFSgrid[s.x][s.y] == 3) {
        return [];
    }
    else {
    paintSquare(s.x,s.y,"#33cc33");
    var queue = [];
    var order = [];
    queue.push(s);
    while (queue.length != 0) {
        let u = queue.shift();
        order.push(u);
        if (BFSgrid[u.x][u.y] == 0) {
            BFSgrid[u.x][u.y] = 2;
            if (u.y-1 == 0 && BFSgrid[u.x][u.y-1] == 0) {
                order.push(new point(u.x,u.y-1));
                break;
            }

            if (BFSgrid[u.x][u.y+1] == 0 && u.y+1 != 0) {
                queue.push(new point(u.x,u.y+1));
            }
            
            if (BFSgrid[u.x+1][u.y] == 0 && u.x+1 != 0) {
                queue.push(new point(u.x+1,u.y));
            }
            
            if (BFSgrid[u.x-1][u.y] == 0 && u.x-1 != 0) {
                queue.push(new point(u.x-1,u.y));
            }

            if (BFSgrid[u.x][u.y-1] == 0 && u.y-1 != 0) {
                //up
                queue.push(new point(u.x,u.y-1));
            }
        }
    }
    return order;
    }
}

function best_first(s) {
    if (grid[s.x][s.y] == 3 || grid[s.x][s.y] == 2) {
        return [];
    }
    else {
    paintSquare(s.x,s.y,"#33cc33");
    var x;
    for (var i = 0; i < 25; i++) {
        if (grid[i][0] == 0) {
            x = i;
        }
    }
    var goal = new apoint(x,0);

    var source = new apoint(s.x,s.y,goal.x,goal.y);
    open = [source];
    var order = [];

    while (true) { //loop condition subject to change
        let current = open[0];
        let index = 0;
        for (let i = 0; i < open.length; i++) {
            if (open[i].h < current.h) {
                current = open[i];
                index = i;
            }
        }


        open.splice(index,1);
        grid[current.x][current.y] = 3; // Marking it as visited

        order.push(current);

        if (current.x == goal.x && current.y - 1== goal.y) {
            order.push(new apoint(goal.x,goal.y,undefined,undefined,current));
            break;
        }

        if (grid[current.x][current.y+1] == 0 && current.y+1 != 0) {
            let next = new apoint(current.x,current.y+1,goal.x,goal.y,current);
            open.push(next);
        }

        if (grid[current.x+1][current.y] == 0 && current.x+1 != 0) {
            let next = new apoint(current.x+1,current.y,goal.x,goal.y,current);
            open.push(next);
        }

        if (grid[current.x-1][current.y] == 0 && current.x-1 != 0) {
            let next = new apoint(current.x-1,current.y,goal.x,goal.y,current);
            open.push(next);
        }

        if (grid[current.x][current.y-1] == 0 && current.y-1 != 0) {
            let next = new apoint(current.x,current.y-1,goal.x,goal.y,current);
            open.push(next);
        }

    }
    return order;
    }   
}

function aStar(s) {
    if (grid[s.x][s.y] == 3 || grid[s.x][s.y] == 2) {
        return [];
    }
    else {
    paintSquare(s.x,s.y,"#33cc33");
    var x;
    for (var i = 0; i < 25; i++) {
        if (grid[i][0] == 0) {
            x = i;
        }
    }
    var goal = new apoint(x,0);

    var source = new apoint(s.x,s.y,goal.x,goal.y);
    open = [source];
    var order = [];

    while (true) { //loop condition subject to change
        let current = open[0];
        let index = 0;
        for (let i = 0; i < open.length; i++) {
            if (open[i].f < current.f) {
                current = open[i];
                index = i;
            }
        }


        open.splice(index,1);
        grid[current.x][current.y] = 3; // Marking it as visited

        order.push(current);

        if (current.x == goal.x && current.y - 1== goal.y) {
            order.push(new apoint(goal.x,goal.y,undefined,undefined,current));
            break;
        }

        if (grid[current.x][current.y+1] == 0 && current.y+1 != 0) {
            let next = new apoint(current.x,current.y+1,goal.x,goal.y,current);
            open.push(next);
        }

        if (grid[current.x+1][current.y] == 0 && current.x+1 != 0) {
            let next = new apoint(current.x+1,current.y,goal.x,goal.y,current);
            open.push(next);
        }

        if (grid[current.x-1][current.y] == 0 && current.x-1 != 0) {
            let next = new apoint(current.x-1,current.y,goal.x,goal.y,current);
            open.push(next);
        }

        if (grid[current.x][current.y-1] == 0 && current.y-1 != 0) {
            let next = new apoint(current.x,current.y-1,goal.x,goal.y,current);
            open.push(next);
        }

    }
    return order;
    }   
}

function makeGrid(size) {
    grid = [];
    for (var i=0; i<size;i++) {
        let test=[];
        test.length = size;
        test.fill(1);
        grid.push(test);
    }
    return grid;
}

var done = true;
function paintOrder(order,index) {
    if(index != order.length) {
        paintSquare(order[index].x,order[index].y,"#33cc33");
        setTimeout(paintOrder,100,order,index+1);
    } else {
        done = true;
    }
}

function paintOrderA(order,index) {
    if(index != order.length) {
        paintSquare(order[index].x,order[index].y,"#33cc33");
        setTimeout(paintOrderA,100,order,index+1);
    } else {
        if (order.length != 0) {
        paintPath(order[order.length - 1]);
        }
        done = true;
    }
}

function paintPath(current_node) {
    paintSquare(current_node.x,current_node.y,"#d442f4");
    if (current_node.parent != undefined) {
        paintPath(current_node.parent);
    }
}

var feedback = document.getElementById('feedback');

var options = document.getElementsByClassName('option');
for (let i=0; i < options.length; i++) {
    options[i].style.cursor = 'pointer';
    options[i].onclick = function() {
        ctx.fillStyle = "#f2f2f2";
        ctx.fillRect(0,0,width,height);
        for (let j=0; j < options.length; j++) {
            options[j].style.borderColor ="#b3ccff";
        }
        options[i].style.borderColor = "#ff66ff";
        drawTree(Number(options[i].innerHTML));
        feedback.innerHTML = "Currently " + options[i].innerHTML + " branches";
    }
};


var size = 25;
var DFSgrid = makeGrid(size);
var oldGrid = [];
ctx.fillStyle = "#808080";
ctx.fillRect(0,0,width,height);
var midpt = Math.ceil(size/2) - 1;
var start = new point(midpt,size - 1);
var startx;

DFSgrid = prims(Math.floor(Math.random() * 20) + 2,Math.floor(Math.random() * 20) + 2,DFSgrid);
for (let i=0; i<size;i++) {
    let test = [];
    for (let j=0; j<size; j++) {
        test.push(DFSgrid[i][j]);
    }
    oldGrid.push(test);
}
start.x = startx;
//DFSgrid = prims(midpt,size-1,DFSgrid);
var BFSgrid = DFSgrid;
var bestGrid = DFSgrid;
/*
var DFSorder = DFS(start);
paintOrder(DFSorder,0);
*/
/*
BFSgrid = prims(midpt,size-1,DFSgrid);
var BFSorder = BFS(start);
paintOrder(BFSorder,0);
*/



var dfs_button = document.getElementById('DFS');
var bfs_button = document.getElementById('BFS');
var reset_button = document.getElementById('Reset');
var astar_button = document.getElementById('Astar');
var best_button = document.getElementById('best');
var clear_button = document.getElementById('clear');

reset_button.onclick = function () {
    if (done == false) {
        alert("Wait for the search to finish");
    }
    if (done == true) {
    DFSgrid = makeGrid(size);
    ctx.fillStyle = "#808080";
    ctx.fillRect(0,0,width,height);
    DFSgrid = prims(Math.floor(Math.random() * 22) + 1,Math.floor(Math.random() * 22) + 1,DFSgrid);
    copy(DFSgrid,oldGrid);
    start.x = startx;
    //DFSgrid = prims(midpt,size-1,DFSgrid);
    BFSgrid = DFSgrid;
    bestGrid = DFSgrid;
    }
}

function copy(x,y) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j<size; j++) {
            y[i][j] = x[i][j];
        }
    }
}

clear_button.onclick = function() {
    if (done == false) {
        alert("Wait for the search to finish");
    }
    if (done == true) {
        copy(oldGrid,DFSgrid);
        copy(oldGrid,BFSgrid);
        copy(oldGrid,bestGrid);
        copy(oldGrid,grid);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0,0,width,height);
        for (let i=0; i<size;i++) {
            for (let j=0; j<size;j++) {
                if(DFSgrid[i][j] == 1) {
                    paintSquare(i,j,"#808080");
                }
            }
        }
    }
}

dfs_button.onclick = function() {
    if (done == true) {
    done = false;
    DFSorder = [];
    DFSorder = DFS(start);
    paintOrder(DFSorder,0);
    }
}

bfs_button.onclick = function() {
    if (done == true) {
    done = false;
    BFSorder = [];
    BFSorder = BFS(start);
    paintOrder(BFSorder,0);
    }
}

astar_button.onclick = function() {
    if (done == true) {
    done = false;
    aStarOrder = [];
    aStarOrder = aStar(start);
    paintOrderA(aStarOrder,0);
    //if (aStarOrder.length > 0) {
    //setTimeout(paintPath,(aStarOrder.length+5)* 100,aStarOrder[aStarOrder.length - 1]);
    //}
    //paintPath(aStarOrder[aStarOrder.length - 1]);
    }
}

best_button.onclick = function() {
    if (done == true) {
        done = false;
        bestOrder = [];
        bestOrder = best_first(start);
        paintOrderA(bestOrder,0);
    }
}