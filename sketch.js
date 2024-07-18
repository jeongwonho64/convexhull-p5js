var editbutton,mode,resetbutton,convexhullbutton;
var points = [],hull = [], hulllines = [];
var startframe = 0, endframe = 0;
var i_loop = 0, percentage = 0;
var line_start, line_end, undraw, indexed, hulled;

function preload(){
    simul_info = loadStrings("simulation_info.txt");
    usage_info = loadStrings("usage_info.txt");
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255);
    frameRate(60);
    createButtons();
    simul_info = simul_info[0];
    usage_info = usage_info[0];
    simul_info = simul_info.replace(/\\n/g,"\n");
    usage_info = usage_info.replace(/\\n/g,"\n");
}


function draw(){
    editbutton.draw();
    resetbutton.draw();
    convexhullbutton.draw();
    createBlocks();
    if(mode == "guide"){
        guide();
    }
    if(mode == "index"){
        BlockList[0].blockColor = "#c1a61d";
        BlockList[0].textColor = "white";
        index();
    }
    if(mode == "hull" && i_loop < hulllines.length){
        drawhull();
    }
    if(mode == "view" && hulled == true){
        for(var i = 0; i < hull.length-1; i++){
            push();
            stroke("#c1a61d");
            strokeCap(SQUARE);
            strokeWeight(3);
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
            strokeWeight(3);
            circle(points[hull[i]].x,points[hull[i]].y,60);
            noStroke();
            fill("black");
            textSize(32);
            textAlign(CENTER,CENTER);
            text(hull[i],points[hull[i]].x,points[hull[i]].y);
            pop();
        }
    }
    if(mode != "guide"){
        drawBlocks();
    }
}

function mousePressed(){
    if(mode == "edit" && bounded()){
        points.push(createVector(mouseX,mouseY));
    }
}
function bounded(){
    if((mouseX > 330 || mouseY > 130) && (mouseX < width - 30 && mouseX > 30) && (mouseY < height - 30 && mouseY > 30) && (mouseX < 930 || mouseY < 630)){
        return true;
    }
    return false;
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