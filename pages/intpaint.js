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
  
  uniform vec2 resolution;
  uniform vec2 mouse;
  uniform float time;
  
  void main() {
      
      vec2 coord = 6.0 * gl_FragCoord.xy / resolution;
      for (int n = 1; n < 8; n++){
         float i = float(n);
          coord += vec2(0.7 / i * sin(i * coord.y ) + mouse.x, 0.4 / i * sin(coord.x * 5.8) + mouse.y + 1.6);
          
       }
      
      coord *= vec2(0.07 / sin(coord.y + time*0.05 + 0.3) + 0.8, 0.04 / sin(coord.x + time + 0.3) + 1.6);
       vec3 color = vec3(3.196 * sin(coord.x) + 0.5, 0.5 * sin(coord.y) + 0.5, sin(coord.x + coord.y ));
  
      gl_FragColor = vec4(color,1.0);
  }
`;

  const canvasRef = useRef(null);

  useEffect(() => {
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
        uniforms.mouse.value.y = ( 1-(event.clientY) / window.innerHeight );
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

      <div className={styles.container}> 
        <h2 className={styles.title} >Interactive Paintings</h2>
        <h6 className={styles.text}>Interactive paintings are implemented using GLSL shaders and OpenFrameworks. I also used a sound sample and visualized it. Users can interact with the paintings and the sound with their touch. The pressure of their touch changes the color of the painting. Piezo disc sensor, connected to an Arduino Leonardo, detects touch input. Shaders take sound, sensor values, and input from GUI as uniforms. When the user touches the sensor it disturbs the shader and sound. As the sensor value is added to the sin wave of the shader it speeds up the forms on the shaders and creates different visual effects. If the touch sensor value is bigger than a certain threshold it also speeds up the sound by multiplying its value.</h6>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://github.com/melismeric/UAL-CODINGTWO/tree/main/Interactive%20Paintings">Github Source Code</a></h6>
     
      <Carousel className={styles.videoContainer }>
        <div>
          <iframe width="100%" height="400px" src="https://www.youtube.com/embed/3lNxoQRVv9Y" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div>
          <iframe width="100%" height="400px" src="https://www.youtube.com/embed/io_zu4sApUc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div>
          <iframe width="100%" height="400px" src="https://www.youtube.com/embed/j5H8rU4BUKE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </Carousel>

      </div>
      <Footer/>
    </div>
  )
}