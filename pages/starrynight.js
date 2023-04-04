import Head from 'next/head'
import styles from '../styles/Project.module.css';
import Header from '../components/Header'
import * as THREE from "three";
import { useRef, useEffect } from "react";
import Footer from '../components/Footer'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {Helmet} from "react-helmet";


export default function Home() {

  const canvasRef = useRef(null);

  useEffect(() => {

                    var mouseX =3;
                    var mouseY =304;
                    var TWO_PI = Math.PI * 2;
                    var canvas = document.querySelector("canvas");
                    canvas.width = window.innerWidth/1.3;
                    canvas.height = window.innerHeight/1.3;
                    var context = canvas.getContext("2d");
                    canvas.addEventListener('mousemove', getMouse, false);
            
                    function getMouse(mousePosition) {
                            mouseX = mousePosition.layerX;
                            mouseY = mousePosition.layerY;
                      console.log(mouseX,mouseY)
                    }
                  
                    var changeThis = 2;
                    var maximJs = maximilian();
                    var maxiAudio = new maximJs.maxiAudio();
               
                      maxiAudio.init();
                      var osc = new maximJs.maxiOsc();
                      var osc2 = new maximJs.maxiOsc();
                      var osc3 = new maximJs.maxiOsc();
                      var drawOutput = new Array(1024);
                      var counter = 0;
            
                    var bufferFreq=44100/1024;
            
                    maxiAudio.play = function() {
                      var wave = osc.sinewave(bufferFreq+osc2.sinewave(bufferFreq*changeThis)*osc3.sinewave(0.001)*1000);
                      counter++;
                      drawOutput[counter % 1024] = wave;
                      return wave * 0.1//* 0.4;
                    };
            
                    function drawStar( context, segments,spacing,radiusStars, color, posX, posY) {
                      context.beginPath();
                      for (var m2 = 0; m2 < segments; m2++) {
            
                        context.strokeStyle = color; //set the line colour to black
                        var x5 = Math.sin(spacing * m2 * 0.92 * (mouseX/50) * drawOutput[m2]) * Math.cos(spacing * m2 * 2.34 * (mouseY/50)) * (radiusStars-10);
                        var y5 = Math.sin(spacing * m2 * 0.92 * (mouseX/50) * drawOutput[m2]) * Math.sin(spacing * m2 * 2.34 * (mouseY/50)) * (radiusStars-10);  
             
                        context.lineTo(x5 + posX,y5 + radiusStars + posY);
                        }
                        context.stroke(); //draw the outline      
                        context.closePath();
                     }
                    function draw() {
                        
                      var segments = 1024;
                      var spacing = TWO_PI / segments;
                      var radiusMoon = 150;
                      var radiusStars = 50;
                      var radius = 200;
                      var size =5;
                      //clear the screen
                      context.clearRect(0,0, canvas.width, canvas.height);
                      context.fillStyle = "#000036";
                      context.fillRect(0, 0, canvas.width, canvas.height);
            
                      //draw moon
                      context.beginPath();
                      for (var i = 0; i < segments; i++) {
            
                        context.strokeStyle = "#FFFF66"; //set the line colour to black
                        var x = Math.sin(spacing * i * 0.92 * (mouseX/1000)) * Math.cos(spacing * i * 2.34) * radiusMoon;
                        var y = Math.sin(spacing * i* 0.92 * (mouseX/1000)) * Math.sin(spacing * i * 2.34) * radiusMoon;  
             
                        var x2 = Math.sin(spacing * i * drawOutput[i]) * Math.cos(spacing * i  * drawOutput[i]) * radiusMoon;
                        var y2 = Math.sin(spacing * i * drawOutput[i]) * Math.sin(spacing * i * drawOutput[i] ) * radiusMoon;  
            
                        context.lineTo((x+canvas.width - radiusMoon),(y+radiusMoon));
                        context.lineTo((x2 + x +canvas.width - radiusMoon),(y + y2+radiusMoon));
              
                        }
                        context.stroke(); //draw the outline      
                        context.closePath();
                      
                      // spirals
                      context.beginPath();
                      for (var g = 0; g < segments; g++) {
            
                        context.strokeStyle = "#A9E2F3";
                        var xS = size * Math.sin(spacing * g  *  0.92 ) * Math.cos(spacing * g * 0.04) * radius;
                        var yS = size * Math.sin(spacing * g *  0.92) * Math.sin(spacing * g * 0.04) * radius;  
             
                        var xS2 = Math.sin(spacing * g * drawOutput[g] * (mouseX/500)) * Math.cos(spacing * g  * drawOutput[g]) * radius;
                        var yS2 = Math.sin(spacing * g * drawOutput[g] * (mouseX/500)) * Math.sin(spacing * g * drawOutput[g] ) * radius;  
            
                        context.lineTo(xS,yS+canvas.height);
                        context.lineTo((xS2 + xS + canvas.width/2),(yS + xS2+canvas.height/2));
              
                        }
                        context.stroke();     
                        context.closePath();
                      // spirals
                      
                      // spiral2
                      context.beginPath();
                      for (var z = 0; z < segments; z++) {
            
                        context.strokeStyle = "#0431B4";
                        var xS3 = 2 * Math.sin(spacing * z  *  0.92 ) * Math.cos(spacing * z * 0.04) * radius;
                        var yS3 = 2 * Math.sin(spacing * z *  0.92) * Math.sin(spacing * z * 0.04) * radius;  
             
                        var xS4 = Math.sin(spacing * z * drawOutput[z] * (mouseX/500)) * Math.cos(spacing * z  * drawOutput[z]) * radius;
                        var yS4 = Math.sin(spacing * z * drawOutput[z] * (mouseX/500)) * Math.sin(spacing * z * drawOutput[z] ) * radius;  
            
                        context.lineTo(xS3,yS3+canvas.height/2);
                        context.lineTo((xS4 + xS3 + canvas.width/2),(yS4 + xS3 + canvas.height/4));
              
                        }
                        context.stroke();     
                        context.closePath();
                      
                      // spiral3
                      context.beginPath();
                      for (var w = 0; w < segments; w++) {
            
                        context.strokeStyle = "#0B615E";
                        var xS5 = 2 * Math.sin(spacing * w  *  0.92 ) * Math.cos(spacing * w * 0.04) * radius;
                        var yS5 = 2 * Math.sin(spacing * w *  0.92) * Math.sin(spacing * w * 0.04) * radius;  
            
                        var xS6 = Math.sin(spacing * w * drawOutput[w] * (mouseX/500)) * Math.cos(spacing * w  * drawOutput[w]) * radius;
                        var yS6 = Math.sin(spacing * w * drawOutput[w] * (mouseX/500)) * Math.sin(spacing * w * drawOutput[w] ) * radius;  
            
                        context.lineTo(xS5 + canvas.width/2,yS5+canvas.height+100);
                        context.lineTo((xS5 + xS6 + canvas.width),(yS5 + xS6 + canvas.height/1.1));
              
                        }
                        context.stroke();     
                        context.closePath();
                      
                      
                      drawStar(context, segments, spacing,radiusStars, "#FFFF66", canvas.width/2, 10 );
                      drawStar(context, segments, spacing,radiusStars, "#FFFF66", 20, 20 );
                      drawStar(context, segments, spacing,radiusStars, "#F7FE2E", canvas.width/2 - 200, 25 );
                      drawStar(context, segments, spacing,radiusStars, "#F7FE2E", canvas.width/2 + 150, 80 );
                      drawStar(context, segments, spacing,radiusStars, "#FFFF66", canvas.width/2 + 300, 130 );
                      
                      for (let y=1; y < 7; y++) {
                       drawStar(context, segments, spacing,20, "#F5F6CE",  (Math.random() * canvas.width), (Math.random() * canvas.height/3));
                      }
                        
                       /* start of tree */
                      var gradient = context.createLinearGradient(10, 100, 170, 0);
                      gradient.addColorStop("0", "#0A2229");
                      gradient.addColorStop("0.5" ,"#3B240B");
                      gradient.addColorStop("1.0", "#151515");
                      context.beginPath();
                      for (var k = 0; k < segments; k++) {
            
                        //context.strokeStyle = "#333333"; //set the line colour to black
                        context.strokeStyle = gradient;
                        var x3 = Math.sin(spacing * k * (mouseX/100)) * Math.cos(spacing * k  * (mouseY/50)) * radius;
                        var y3 = Math.sin(spacing * k * (mouseX/100)) * Math.sin(spacing * k * (mouseY/50)) * radius;  
                        var x4 = Math.sin(spacing * k * drawOutput[k] ) * Math.cos(spacing * k * drawOutput[k]) * radius;
                        var y4 = Math.sin(spacing * k * drawOutput[k]  ) * Math.sin(spacing * k * drawOutput[k] ) * radius;  
            
                        context.lineTo(x3 + x4 +canvas.width/4.6, y3 + y4  +(radius) - 100);
                        context.lineTo(x3 + x4 +canvas.width/4.6,y3 + y4 +(canvas.height));
                      }
                      context.stroke(); //draw the outline        
                      context.closePath();
                      /* end of tree */
                     
                     
                      
                        requestAnimationFrame(draw);
                    }
            
                    //request the first animation frame
                    requestAnimationFrame(draw);
                  
  }, []);
  return (
  <div style={{backgroundColor: "#000000"}}>
      <Header/>

     <Head>
        <script src="https://mimicproject.com/libs/maximilian.js"></script>
      </Head>
       <canvas style={{display: "flex", margin: "auto", flexDirection: "row", justifyContent: "center"}} ref={canvasRef} />

      <div className={styles.container} style={{marginBottom:"40px"}}> 
        <h2 className={styles.title} >Recreated Starry Night</h2>
        <h6 className={styles.text}>Interactive 2D graphics created with javascript for the course project of CCI - Coding One: Advanced Creative Coding. Move your cursor on the x-axis to interact with the geometry.</h6>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://github.com/melismeric/UAL-CodingOne/tree/main/2D%20Computer%20Graphics">Github Source Code</a></h6>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://mimicproject.com/code/d07e557a-a1e6-da65-8b55-5fa113ca26e2">MIMIC</a></h6>



      </div>
      <Footer/>
    </div>
  )
}