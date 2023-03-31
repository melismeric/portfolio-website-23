import Head from 'next/head'
import styles from '../styles/Project.module.css';
import Header from '../components/Header'
import * as THREE from "three";
import { useRef, useEffect } from "react";
import Footer from '../components/Footer'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Home() {

  // Define the vertex shader code
const vertexShader = `
  uniform highp float time;

  void main() {
      gl_Position = vec4(position,1.0) ;
  }
`;

// Define the fragment shader code
const fragmentShader = `
  precision highp float;
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 mouse;
  #define M_PI 3.14159265358979323846
  #define TWO_PI 6.28318530718
  
  vec3 hsb2rgb( in vec3 c ){
  vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                           6.0)-3.0)-1.0,
                   0.0,
                   1.0 );
  rgb = rgb*rgb*(3.0-2.0*rgb);
  return c.z * mix( vec3(1.0), rgb, c.y);
  }
  
  void main(void) {
  vec2 st = gl_FragCoord.xy/resolution;
  vec3 color = vec3(0.0);
  vec3 color2 = vec3(0.0);
  vec3 color3 = vec3(0.0);
  
  // Use polar coordinates instead of cartesian
  vec2 toCenter = vec2(mouse.y)-st;
  float angle = atan(toCenter.y,toCenter.x)*time;
  float radius = length(toCenter)*5.0;
  
  color = hsb2rgb(vec3((angle/TWO_PI)+0.5,radius,1.0));
  
  vec2 toCenter2 = vec2(mouse.x)-st;
  float angle2 = atan(toCenter2.y,toCenter2.x)*time;
  float radius2 = length(toCenter2)*5.0;
  
  color2 = hsb2rgb(vec3((angle2/TWO_PI)+0.5,radius2,1.0));
   
  vec2 toCenter3 = vec2(mouse)-st;
  float angle3 = atan(toCenter3.y,toCenter3.x)*time;
  float radius3 = length(toCenter3)*5.0;
  
  color3 = hsb2rgb(vec3((angle3/M_PI)*1.5,radius3,1.0));
  
  gl_FragColor = vec4(color + color2 + color3,1.0);
      
        }
`;

  const canvasRef = useRef(null);

  useEffect(() => {

var canvas = document.querySelector("canvas");
                  var width = window.innerWidth;
                  var height = window.innerHeight;
                  var context = canvas.getContext("2d");
                  
                  var background = new Image();
                  background.src = "download.jpeg";
                  
                  canvas.setAttribute("width", width);
                  canvas.setAttribute("height", height);
                  canvas.addEventListener('mousemove',getMouse,false);
                  var mouseX=508;
                  var mouseY=102;
                  var mouseX1=1.6;
                  var mouseY1=0.535;
                  
                  var fov = 500;
                  
                  var point = [];
                  var point3d = [];
                  var angleX = 0;
                  var angleY = 0;
                  var HALF_WIDTH = width / 2;
                  var HALF_HEIGHT = height / 2;
                  
                  var x3d = 0;
                  var y3d = 0;
                  var z3d = 0;
                  
                  var firstx2d=0;
                  var firsty2d=0;
                  var firstScale=0;
                  var lastScale = 0;
                  var lastx2d = 0;
                  var lasty2d = 0;
                  
                  var elements = 300;
                  var x, y = 0;
                  var lastX, lastY = 0;
                  var firstX, firstY = 0;
                  var r1, r2 = 10;
                  
                  var m = 0;
                  var m1 = 23;
                  var m2 = 7;
                  var n1 = 0;
                  var n2 = 10;
                  var n3 = 0;
                  var b = 1;
                  var a = 1;
                  
                  // The below code creates a sphere of points
                  var dim = 150; // This is the number of rings
                  // Each ring has as many points as there are rings
                  // This is the spacing for each ring
                  var spacing = ((Math.PI * 2) / dim);
                  // This is the total number of points
                  var numPoints = dim * dim;
                  
                  // This is the size.
                  var size = 11;
                  
                  var counter=0;
                  
                  function draw() {
                      
                  mouseX1=mouseX/200;
                  mouseY1=mouseY/200;
                  
                  m1 = Math.floor((mouseX / height) * 100);
                    
                    m=10; 
                    n1=1;
                    n2=1;
                    n3=4;
                    
                  
                  var points = [];
                      // Now we build the geom
                      
                      // This is a sphere just like before
                  for (var i = 0; i < dim; i++) {
                      
                    
                    var z = size * Math.cos(spacing / 2 * i * m) * Math.sin(spacing / 2 * i * m1)+size * Math.cos(spacing / 2 * i) * (dim/4);
                    var s = size * Math.sin(spacing / 2 * i) * Math.sin(spacing / 2 * i * m)+size * Math.sin(spacing / 2 * i);
                  
                  // For each ring    
                      
                      for (var j = 0; j < dim; j++ ) {
                  r1 = size * Math.pow(Math.pow(Math.abs(Math.cos((m * spacing * j) / 4) / a), n2) + Math.pow(Math.abs(Math.sin((m * spacing * j) / 4)) / b, n3), -(1 / n1));    
                  
                  // Create a circle at the current size, at the current depth    
                  
                  var point = [r1 * Math.cos(spacing * j) * s,r1 * Math.sin(spacing * j)*s,z];
                  // Add the points        
                          points.push(point);
                      
                      }
                  }
                  
                      context.fillStyle = "rgb(0,0,0)";
                      context.fillRect(0, 0, width, height); 
                      
                  
                      angleX+=0.01;
                      angleY+=0.01;
                  
                  // Here we run through each ring and work out where it should be drawn
                  
                      for (let i = 0; i < numPoints; i+=dim) {
                  
                          for (let j = 0; j <dim; j++ ) {
                          point3d = points[Math.floor(i+j)];
                          z3d = point3d[2];
                  
                          if (z3d < -fov) z3d += 0;
                          
                          point3d[2] = z3d;
                    
                    // Calculate the rotation
                    
                      rotateX(point3d,angleX);
                      rotateY(point3d,angleY);
                    
                    // Get the point in position 
                    
                          x3d = point3d[0];
                          y3d = point3d[1];
                          z3d = point3d[2];
                  // Convert the Z value to a scale factor
                  // This will give the appearance of depth
                          var scale = (fov / (fov + z3d));
                  
                  // Store the X value with the scaling
                  // FOV is taken into account
                  // (just pushing it over to the left a bit too)
                          var x2d = (x3d * scale) + HALF_WIDTH ;
                  
                  // Store the Y value with the scaling
                  // FOV is taken into account
                  
                          var y2d = (y3d * scale) + HALF_HEIGHT;
                  
                  // // If our main loop is going to join all the points together in a line, we need to store the first points and use them at the end.       
                  
                          if (j===0){
                              
                              firstx2d=x2d;
                              firsty2d=y2d;
                              firstScale=scale;           
                              
                              lastx2d=x2d;
                              lasty2d=y2d;
                              lastScale=scale;           
                      
                          }
                  
                          
                  // Draw the point
                  
                  // Set the size based on scaling
                  //context.drawImage(background,0,0); 
                          context.lineWidth = scale * 0.8;
                  
                          context.strokeStyle= "rgba(" + mouseX/2 +"," + mouseY/4 +"," + mouseX/4 + ",255)";
                          context.beginPath(); 
                          context.moveTo(lastx2d + lastScale, lasty2d);
                          context.lineTo(x2d + scale, y2d);
                          
                          context.stroke();
                  
                  // Store the last point so we can join it to the next one.
                  
                          lastx2d=x2d;
                          lasty2d=y2d;
                          lastScale=scale;
                  
                  // if it's the end of the current ring, join it to the first
                          
                          if (j==dim-1) {
                              
                          context.lineWidth = scale;
                  
                          //context.strokeStyle = "rgb(255,255,255)";
                          context.beginPath();
                          context.moveTo(lastx2d + lastScale, lasty2d);
                          context.lineTo(firstx2d + firstScale, firsty2d);
                          context.stroke();                           
                          }
                  
                        }
                      }
                  }
                  
                  setInterval(draw, 50);
                  
                  function rotateX(point3d,angleX) {
                          var x = point3d[0]; 
                          var z = point3d[2]; 
                      
                          var cosRY = Math.cos(angleX);
                          var sinRY = Math.sin(angleX);
                          
                          var tempz = z; 
                          var tempx = x;
                  
                          x= (tempx*cosRY)+(tempz*sinRY);
                          z= (tempx*-sinRY)+(tempz*cosRY);
                  
                          point3d[0] = x;
                          point3d[2] = z;
                            
                  }
                  
                  function rotateY(point3d,angleY) {
                          var y = point3d[1];
                          var z = point3d[2]; 
                      
                          var cosRX = Math.cos(angleY);
                          var sinRX = Math.sin(angleY);
                          
                          var tempz = z; 
                          var tempy = y;
                  
                          y= (tempy*cosRX)+(tempz*sinRX);
                          z= (tempy*-sinRX)+(tempz*cosRX);
                  
                          point3d[1] = y;
                          point3d[2] = z;
                            
                  } 
                  
                      //here's our function 'getMouse'.
                  function getMouse (mousePosition) {
                  //for other browsers..
                      mouseX = mousePosition.layerX;
                      mouseY = mousePosition.layerY;
                  }
                  
  }, []);
  return (
  <div style={{backgroundColor: "#000000"}}>
      <Header/>
       <canvas style={{display: "flex", margin: "auto", flexDirection: "row", justifyContent: "center"}} ref={canvasRef} />

      <div className={styles.container} style={{marginBottom:"40px"}}> 
        <h2 className={styles.title} >Connection</h2>
        <h6 className={styles.text}>2D Graphics for the course project of CCI - Coding One: Advanced Creative Coding. Move your cursor to change the colors.</h6>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://github.com/melismeric/UAL-CodingOne/tree/main/2D%20Computer%20Graphics">Github Source Code</a></h6>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://mimicproject.com/code/d07e557a-a1e6-da65-8b55-5fa113ca26e2">MIMIC</a></h6>



      </div>
      <Footer/>
    </div>
  )
}