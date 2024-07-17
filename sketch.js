var editbutton,mode,cancelbutton,resetbutton,convexhullbutton;
var points = [],hull = [], hulllines = [];
var startframe = 0, endframe = 0;
var i_loop = 0, percentage = 0;
var line_start, line_end, undraw, indexed, hulled;
function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255);
    frameRate(60);
    createButtons();
}


function draw(){
    editbutton.draw();
    cancelbutton.draw();
    resetbutton.draw();
    convexhullbutton.draw();
    if(mode == "index"){
        if(percentage >= 1.05){
            if(undraw && i_loop == points.length - 1){
                mode = "hull";
                percentage = 0;
                indexed = true;
                i_loop = 0;
                return;
            }
            if(undraw == 1){
                undraw = 0;
                i_loop++;
            }
            else{
                undraw = 1;
            }
            percentage = 0;
        }
        else if(undraw){
            line_start = points[i_loop].copy();
            line_end = points[0].copy();
            drawLine(percentage, "white", 6);
        }
        else{
            line_start = points[0].copy();
            line_end = points[i_loop].copy();
            drawLine(percentage, "black");
        }
        percentage += 0.05;
        for(var i = 0; i < points.length; i++){
            circle(points[i].x,points[i].y,60);
            if(i < i_loop || (i == i_loop && undraw)){
                textSize(32);
                textAlign(CENTER,CENTER);
                text(i,points[i].x,points[i].y);
            }
        }
    }
    if(mode == "hull" && i_loop < hulllines.length){
        if(percentage >= 1.05){
            if(i_loop == hulllines.length - 1){
                i_loop = 0;
                percentage = 0;
                mode = "view";
                hulled = true;
                return;
            }
            i_loop++;
            percentage = 0;
        }
        for(var i = 0; i < i_loop; i++){
            push();
            stroke(hulllines[i].color);
            strokeCap(SQUARE);
            strokeWeight(hulllines[i].strokeSize);
            line(hulllines[i].x1,hulllines[i].y1,hulllines[i].x2,hulllines[i].y2);
            pop();
        }
        line_start = createVector(hulllines[i_loop].x1,hulllines[i_loop].y1);
        line_end = createVector(hulllines[i_loop].x2,hulllines[i_loop].y2);
        drawLine(percentage, hulllines[i_loop].color, hulllines[i_loop].strokeSize);
        percentage += 0.05;
        for(var i = 0; i < points.length; i++){
            circle(points[i].x,points[i].y,60);
            textSize(32);
            textAlign(CENTER,CENTER);
            text(i,points[i].x,points[i].y);
        }
    }
    if(mode == "view" && hulled == true){
        for(var i = 0; i < hull.length-1; i++){
            push();
            stroke("#c1a61d");
            strokeCap(SQUARE);
            strokeWeight(5);
            line(points[hull[i]].x,points[hull[i]].y,points[hull[i+1]].x,points[hull[i+1]].y);
            pop();
        }
    }
    if(mode == "edit" || mode == "view"){
        for(var i = 0; i < points.length; i++){
            circle(points[i].x,points[i].y,60);
            if(indexed){
                push();
                noStroke();
                textSize(32);
                textAlign(CENTER,CENTER);
                text(i,points[i].x,points[i].y);
                pop();
            }
        }
    }
    if(mode == "view" && hulled == true){
        for(var i = 0;i < hull.length; i++){
            push();
            stroke("#c1a61d");
            strokeWeight(5);
            circle(points[hull[i]].x,points[hull[i]].y,60);
            noStroke();
            fill("black");
            textSize(32);
            textAlign(CENTER,CENTER);
            text(hull[i],points[hull[i]].x,points[hull[i]].y);
            pop();
        }
    }
}

function mousePressed(){
    if(mode == "edit" && (mouseX > 400 || mouseY > 100) && (mouseX < width - 30 && mouseX > 30) && (mouseY < height - 30 && mouseY > 30)){
        points.push(createVector(mouseX,mouseY));
    }
}
function drawLine(percentage, color, strokeSize = 5){
    var start = line_start.copy();
    var anim_end = start.copy();
    var end = line_end.copy();
    anim_end.lerp(end, percentage);
    push();
    stroke(color);
    strokeCap(SQUARE);
    strokeWeight(strokeSize);
    line(start.x,start.y,anim_end.x,anim_end.y);
    pop();
}