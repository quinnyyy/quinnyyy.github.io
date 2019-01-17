var canvas = document.getElementById("Fractal");
var width = canvas.width = window.innerWidth/2;
var height = canvas.height = window.innerHeight /2;
var ctx = canvas.getContext('2d');

function point(x_coord,y_coord) {
    this.x = x_coord;
    this.y = y_coord;
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function drawBranch(p1,p2) {
    ctx.moveTo(p1.x,p1.y);
    ctx.lineTo(p2.x,p2.y);
    ctx.stroke();
}

function distance(p1,p2) {
   return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y));
}

var bd_values = [4, 10, 20, 20, 30, 30, 30];

function drawTree(numSplit) {
    ctx.strokeStyle = "#ff66ff";
    var angle = (180/(numSplit + 1));
    ctx.beginPath();
    var p1 = new point(width/2,height);
    var p2 = new point(width/2,7.3*height/10);
    var bd = distance(p1,p2);
    drawBranch(p1,p2);
    grow(p2, bd, 90, 0, numSplit, angle);
}

function grow(root, bd, angle_prev, count, numSplit, angle) {
    if (bd < bd_values[numSplit - 2]) return;
    var pts = [];
    for (let i = 1; i <= numSplit; i++) {
        let new_pt = new point(root.x + bd * Math.cos(degToRad(angle_prev - 90 + angle * i)),root.y - bd*Math.sin(degToRad(angle_prev - 90 + angle * i)));
        pts.push(new_pt);
    }

    for (let i = 0; i < numSplit; i++) {
        drawBranch(root, pts[i]);
    }

    for (let i = 0; i < numSplit; i++) {
        grow(pts[i],bd * 2 / 3, angle_prev - 90 + angle * (i + 1), count + 1, numSplit, angle);
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

ctx.fillStyle = "#f2f2f2";
ctx.fillRect(0,0,width,height);
drawTree(2);

//var angle = degToRad(180 / (numSplit + 1)); // if it is 2 branches then 60 degrees. 3 branches it is 45 degrees. 4 branches then its 180/5. etc...
/*
var angle = degToRad(60);

ctx.beginPath();
var xb1 = width/2;
var yb1 = height;
var xb2 = width/2;
var yb2 = 7.2*height/10;
var bd = distance(xb1,yb1,xb2,yb2);
drawBranch(xb1,yb1,xb2,yb2);

bd = bd * 2 / 3;
xb1 = xb2;
yb1 = yb2;
xb2 = xb1 + bd * Math.cos(angle);
yb2 = yb1 - bd * Math.sin(angle);
drawBranch(xb1,yb1,xb2,yb2);

xb2 = xb1 - bd * Math.cos(angle);
yb2 = yb1 - bd * Math.sin(angle);
drawBranch(xb1,yb1,xb2,yb2);
*/

/*
ctx.beginPath();
ctx.moveTo(50,50);
ctx.lineTo(150,50);
var triHeight = 50 * Math.tan(degToRad(60));
ctx.lineTo(100,50+triHeight);
ctx.lineTo(50,50);
ctx.stroke();
*/
/*
ctx.beginPath();
ctx.moveTo(width/2, height);
ctx.lineTo(width/2,height/2);
ctx.lineTo(width,height/2);
ctx.stroke();
*/

/*
function grow2(root, bd, angle_prev) {
   if (bd < 4) return;
   var next_pt1 = new point(root.x + bd * Math.cos(degToRad(angle_prev - 30)),root.y - bd*Math.sin(degToRad(angle_prev - 30)));
   var next_pt2 = new point(root.x + bd * Math.cos(degToRad(angle_prev + 30)),root.y - bd*Math.sin(degToRad(angle_prev + 30)));
   drawBranch(root, next_pt1);
   drawBranch(root, next_pt2);
   grow2(next_pt1, bd * 2 / 3, angle_prev - 30);
   grow2(next_pt2, bd * 2 / 3, angle_prev + 30);
}

function grow3(root, bd, angle_prev) {
    console.log(bd);
    if (bd < 15) return;
    var next_pt1 = new point(root.x + bd * Math.cos(degToRad(angle_prev - 45)),root.y - bd*Math.sin(degToRad(angle_prev - 45)));
    var next_pt2 = new point(root.x + bd * Math.cos(degToRad(angle_prev)),root.y - bd*Math.sin(degToRad(angle_prev)));
    var next_pt3 = new point(root.x + bd * Math.cos(degToRad(angle_prev + 45)),root.y - bd*Math.sin(degToRad(angle_prev + 45)));
    drawBranch(root, next_pt1);
    drawBranch(root, next_pt2);
    drawBranch(root, next_pt3);
    grow3(next_pt1, bd * 2 / 3, angle_prev - 45);
    grow3(next_pt2, bd * 2 / 3, angle_prev);
    grow3(next_pt3, bd * 2 / 3, angle_prev + 45);
}
*/