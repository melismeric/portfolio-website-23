import Head from 'next/head'
import styles from '../styles/Project.module.css';
import Header from '../components/Header'
import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import Footer from '../components/Footer'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// Source code:https://www.javascript.christmas/2020/10
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

export default function Home() {

let gui;
const params = {
  X: 7.7,
  Y: 1.0,
  Z: 6.9 ,
  wireframe: false,
  loadFile : function() {
    document.getElementById('myInput').click();
  }

};

const initGui = async () => {
   const dat = await import('dat.gui')
   gui = new dat.GUI();
}


  // Define the vertex shader code
const vertexShader = `

  uniform float blobX;
  uniform float blobY;
  uniform float blobZ;
  
  uniform float[64] u_data_arr;
  varying float x;
  varying float y;
  varying float z;
  varying vec3 vUv;


  varying vec3 normalWorldSpace;

  vec3 modifyPosition(vec3 startPosition, float x, float y, float z) {


      float bump = 
          sin(startPosition.x * z * blobX) *
          sin(startPosition.y * z * blobY) *
          sin(startPosition.z * z * blobZ) 
          ;

      vec3 offset = normalWorldSpace * bump;

      return startPosition + offset;
  }

  void main() {

    vUv = position;
    x = abs(position.x);
    y = abs(position.y);
    float floor_x = round(x);
    float floor_y = round(y);
    float x_multiplier = (32.0 - x) / 8.0;
    float y_multiplier = (32.0 - y) / 8.0;

    z = sin(u_data_arr[int(floor_x)] / 30.0 + u_data_arr[int(floor_y)] / 30.0) * 3.0;
    //z = (u_data_arr[int(floor_x)] / 50.0 + u_data_arr[int(floor_y)] / 50.0) * 4.0;

    vec4 normalHomogeneousWorldSpace = modelMatrix * vec4(normal, 1.0);
    normalWorldSpace = normalHomogeneousWorldSpace.xyz/normalHomogeneousWorldSpace.w;

    vec3 modifiedPosition = modifyPosition(position, x, y, z);

    vec4 modelSpaceCoordinates = vec4(modifiedPosition, 1.0);
    vec4 worldSpaceCoordinates = modelMatrix * modelSpaceCoordinates;
    vec4 viewSpaceCoordinates = modelViewMatrix * modelSpaceCoordinates;
    vec4 screenSpaceCoordinates = projectionMatrix * viewSpaceCoordinates;

    gl_Position = screenSpaceCoordinates;

  }
`;

// Define the fragment shader code
const fragmentShader = `
  varying vec3 normalWorldSpace;


  void main() { 
      vec3 color = vec3(normalWorldSpace) + 0.5;
      float alpha = 1.0;

      gl_FragColor = vec4( color, 1.0 );
  }
`;

  const canvasRef = useRef(null);

  const [showButton, setShowButton] = useState(true);
  const [showCustomButton, setCustomButton] = useState(true);

  const toggleButton = () => {
    setShowButton(false);
  };

  const toggleButtonCustom = () => {
    setCustomButton(false);
  };
  useEffect(() => {
    
      let chooseClicked = false;
      //change the resolution here. 1 is highest
      var pixel_resolution = 2;
      var stats;
      let source;
      let defSource;
      let buffer;

      let camera;
      let renderer;
      let scene;
      let mesh;
      let analyser;
      let uniforms;

      let animationTime = 1.0;

      let audioContext = new AudioContext();

      const analyserNodeDef = audioContext.createAnalyser();

      let dataArray;
      let audioEle;

      let defAudioIsPlaying = false;
      let audioIsPlaying = false;



      const startButton = document.getElementById( 'startButton' );
      const startCustomButton = document.getElementById( 'startCustomButton' );

      startButton.addEventListener( 'click', playDefaultAudio );
      startCustomButton.addEventListener( 'click', loadAudio );


      function loadAudio(file) {
        //audioContext = new AudioContext();
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'audio/*';

        fileInput.onchange = (event) => {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = async (event) => {
            buffer = await audioContext.decodeAudioData(event.target.result);
            playAudio();

          };
          reader.readAsArrayBuffer(file);
        };
        fileInput.click();
      }

      function startCustom(){
        playAudio();
        initCustom();
      }

      function playAudio() {
       
        source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
        audioIsPlaying = true;
        initCustom();
        toggleButton();
        toggleButtonCustom();
      }

      function pauseAudio() {
        source.stop();
        audioIsPlaying = false;
      }

      async function playDefaultAudio() {
        const audioBuffer = await fetch("src/buyukev.mp3")
              .then(res => res.arrayBuffer())
              .then(ArrayBuffer => audioContext.decodeAudioData(ArrayBuffer));
        defSource = audioContext.createBufferSource();

        defSource.buffer = audioBuffer;

        defSource.connect(audioContext.destination);
        defSource.start();

        defAudioIsPlaying = true;
        initDef();
        toggleButton();
        toggleButtonCustom();
      }

      function pauseDefAudio() {
        defSource.stop();
        defAudioIsPlaying = false;
      }

      //init();
      function init(){
        renderer = new THREE.WebGLRenderer();

        renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

        renderer.setSize(window.innerWidth, window.innerHeight);
        onWindowResize();
        window.addEventListener('resize', onWindowResize, false);

        const aspect =
          renderer.getContext().drawingBufferWidth /
          renderer.getContext().drawingBufferHeight;

        camera = new THREE.PerspectiveCamera(60, aspect);
        camera.position.set(4, 1, 2);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        camera.updateProjectionMatrix();
        scene = new THREE.Scene();

        const orbitControls = new OrbitControls(camera, renderer.domElement);

        uniforms = {
          blobX: {value: 7.0},
          blobY: {value: 1.0},
          blobZ: {value: 7.0},
          u_data_arr: { value: null },

        };
      }

      async function initDef() {
          init();
          analyserNodeDef.fftSize = 256;
          const bufferLength = analyserNodeDef.frequencyBinCount;
          dataArray = new Float32Array(bufferLength);

          defSource.connect(analyserNodeDef);
          analyserNodeDef.connect(audioContext.destination);

         if (gui === undefined) {
            await initGui();
            gui.add(params, 'X', 0, 10)
               .name("X value")
              .listen();
            gui.add(params, 'Y', 0, 10)
               .name("Y value")
              .listen();
            gui.add(params, 'Z', 0, 10)
               .name("Z value")
              .listen();

            gui.add({ pause: pauseDefAudio }, 'pause');
            gui.add({ play: playDefaultAudio }, 'play');
          }

          makeContents();
          animateDef();
      }

      const analyserNode = audioContext.createAnalyser();
      async function initCustom() {
          init();

          analyserNode.fftSize = 256;
          const bufferLength = analyserNode.frequencyBinCount;
          dataArray = new Float32Array(bufferLength);

          source.connect(analyserNode);
          analyserNode.connect(audioContext.destination);

         if (gui === undefined) {
            await initGui();
            gui.add(params, 'X', 0, 10)
               .name("X value")
              .listen();
            gui.add(params, 'Y', 0, 10)
               .name("Y value")
              .listen();
            gui.add(params, 'Z', 0, 10)
               .name("Z value")
              .listen();
            gui.add({ play: playAudio }, 'play');
            gui.add({ pause: pauseAudio }, 'pause');
          }

          makeContents();
          animateCustom();
      }

      function makeContents() {
        const geometry = new THREE.SphereGeometry(1, 128, 256);

        const material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader
        });

        mesh = new THREE.Mesh(geometry, material);
   
        scene.add(mesh);
      }

      function onWindowResize(event) {
        window.addEventListener("resize", function () {
            const height = window.innerHeight;
            renderer.setSize(window.innerWidth, height);
            camera.aspect = window.innerWidth / height;
            camera.updateProjectionMatrix();
          });
      }

      function animateDef(){
        requestAnimationFrame(animateDef);
        if(defAudioIsPlaying) analyserNodeDef.getFloatFrequencyData(dataArray);

        uniforms.u_data_arr.value = dataArray;

        uniforms.blobX.value = params.X;
        uniforms.blobY.value = params.Y;
        uniforms.blobZ.value = params.Z;

        renderer.render(scene, camera);
      }

      function animateCustom() {
        requestAnimationFrame(animateCustom);
        if(audioIsPlaying) analyserNode.getFloatFrequencyData(dataArray);

        uniforms.u_data_arr.value = dataArray;

        uniforms.blobX.value = params.X;
        uniforms.blobY.value = params.Y;
        uniforms.blobZ.value = params.Z;

        renderer.render(scene, camera);
      }


  }, []);

  return (

  <div className={styles.page} style={{backgroundColor: "#000000"}}>
  <Container>
  <Link className={styles.headerTitle} style={{color:  "#FFF8E6"}} href="/">Melis Meriç</Link>
  </Container>
    <div style={{marginTop: "auto"}} className="d-grid gap-2 justify-content-md-center">

       {showButton && <Button variant="info" size="lg" id="startButton"><div  className={styles.btnText} >Play Default Sound </div></Button>}

        {showCustomButton && <Button variant="info" size="lg" id="startCustomButton"><div className={styles.btnText} >Choose Your Sound</div></Button>}

    </div>
       <canvas style={{display: "flex", margin: "auto", flexDirection: "row", justifyContent: "center"}} ref={canvasRef} />

      <Footer/>
    </div>
  )
}