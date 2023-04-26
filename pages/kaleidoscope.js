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

      //change the resolution here. 1 is highest
      var pixel_resolution = 2;
      var stats;
      var camera, scene, renderer;
      var uniforms;
  
      init();
      animate();
      function init() {
  
          camera = new THREE.Camera();
          camera.position.z = 1;
          scene = new THREE.Scene();
          var geometry = new THREE.PlaneBufferGeometry(2,2);
          uniforms = { time: { type: 'f', value: 1.0 }, resolution: { type: 'v2', value: new THREE.Vector2() }, mouse: {type: "v2", value: new THREE.Vector2()}};
          var material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
          var mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
          renderer = new THREE.WebGLRenderer();
          //Hack here to change resolution 


          renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
          //Hack here to change resolution 

          renderer.setSize(window.innerWidth/1.2, window.innerHeight/1.2);
          onWindowResize();
          window.addEventListener('resize', onWindowResize, false);
          window.addEventListener('mousemove', onMouseMove, false);

      }
      function onWindowResize(event) {
          renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.5);
          uniforms.resolution.value.x = renderer.domElement.width;
          uniforms.resolution.value.y = renderer.domElement.height;
  
      }
      function animate() {
          requestAnimationFrame(animate);
          render();
      }
      function onMouseMove( event ) {
          uniforms.mouse.value.x = ( event.clientX / window.innerWidth );
           uniforms.mouse.value.y = ( 1-(event.clientY) / window.innerHeight
           );
      }
      function render() {
          uniforms.time.value += 0.01;
          renderer.render(scene, camera);
      }
  }, []);
  return (
  <div style={{backgroundColor: "#000000"}}>
      <Header/>
       <canvas style={{display: "flex", margin: "auto", flexDirection: "row", justifyContent: "center"}} ref={canvasRef} />

      <div className={styles.container} style={{marginBottom:"40px"}}> 
        <h2 className={styles.title} >Kaleidoscope</h2>
        <h6 className={styles.text}>Shader created with GLSL & 3js for the course project of CCI - Coding One: Advanced Creative Coding. Move your cursor to interact with the colors.</h6>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://github.com/melismeric/UAL-CodingOne/tree/main/3js/GLSL">Github Source Code</a></h6>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://mimicproject.com/code/e1a6eab9-ce73-841f-be61-e19c5daf5b33">MIMIC</a></h6>



      </div>
      <Footer/>
    </div>
  )
}