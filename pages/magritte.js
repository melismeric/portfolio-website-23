import Head from 'next/head'
import styles from '../styles/Project.module.css';
import Header from '../components/Header'
import * as THREE from "three";
import { useRef, useEffect } from "react";
import Footer from '../components/Footer'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Tween } from "tween.js";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
export default function Home() {

  const canvasRef = useRef(null);

  useEffect(() => {
var camera, scene, renderer, controls;
var mesh;
var planeMesh;
var menGroup,menGroup2 ;

var dim = 10;
var spacing = (Math.PI * 2) / dim;
var numPoints = dim * dim;
var size = 100;
    let bulbLight = new THREE.PointLight( 0xffee88, 1, 1000, 2 );

    
    init();
    animate();
function init() {
    camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.2, 100 );
    camera.position.x = 0;
    camera.position.z = -12;
    camera.position.y = 4;
    scene = new THREE.Scene();

    var loader = new THREE.TextureLoader();

    // Ground Plane
    const planeSize = 20;

    const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    let floorMat = new THREE.MeshStandardMaterial( {
        roughness: 0.8,
        color: 0xffffff,
        metalness: 0.2,
        bumpScale: 0.0005
    } );
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load( "/src/wood.jpeg", function ( map ) {

        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set( 10, 24 );
        map.encoding = THREE.sRGBEncoding;
        floorMat.map = map;
        floorMat.needsUpdate = true;

    } );
    planeMesh = new THREE.Mesh(planeGeo, floorMat);
    planeMesh.receiveShadow = true;
    planeMesh.rotation.x = Math.PI / -2.0;

    scene.add(planeMesh);

    // Light
    const bulbGeometry = new THREE.SphereGeometry( 0.02, 16, 8 );


    let bulbMat = new THREE.MeshStandardMaterial( {
        emissive: 0xffffee,
        emissiveIntensity: 10,
        color: 0x000000
    } );
    bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
    bulbLight.position.set( 0, 6, 0 );
    bulbLight.castShadow = true;
    bulbLight.power = 50;
    scene.add( bulbLight );

    let hemiLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 0.2 );
    scene.add( hemiLight );


    // Skybox
    const txloader = new THREE.CubeTextureLoader();
    const texture2 = txloader.load([
        '/src/bluecloud_ft.jpg',
        '/src/bluecloud_bk.jpg',
        '/src/bluecloud_up.jpg', 
        '/src/bluecloud_dn.jpg',
        '/src/bluecloud_rt.jpg', 
        '/src/bluecloud_lf.jpg', 
    ]);
    scene.background = texture2;

    // Pipe
    const objLoader = new OBJLoader();

    // load a resource
    objLoader.load(
        // resource URL
        '/src/PIPO.obj',
        // called when resource is loaded
        function ( object ) {
            object.scale.set(0.3,0.3,0.3);
            object.rotation.x = Math.PI * 0.5;
            object.position.set(0,2,0);
            object.castShadow = true;
            object.traverse(function(child){child.castShadow = true;});
            object.receiveShadow = true;
            scene.add( object );

        }
        
    );


    objLoader.load(
        // resource URL
        '/src/window.obj',
        // called when resource is loaded
        function ( object ) {
            for(let x = 0; x < 3; x++) {
                for(let y = 0; y < 3; y++) {
                    let newCell = object.clone();
                    newCell.scale.set(0.002,0.002,0.002); // normalize to roughly 1x1 packing
                    newCell.position.set(5 - x*5,2 + y*5,10);
                    newCell.castShadow = true;
                    newCell.traverse(function(child){child.castShadow = true;});
                    newCell.receiveShadow = true;
                    scene.add(newCell);
                }
            }

            for(let x = 0; x < 3; x++) {
                for(let y = 0; y < 3; y++) {
                    let newCell = object.clone();
                    newCell.scale.set(0.002,0.002,0.002); // normalize to roughly 1x1 packing
                    newCell.position.set(10,2 + x*5,5 - y*5);
                    newCell.rotation.y = Math.PI * 0.5;
                    newCell.castShadow = true;
                    newCell.traverse(function(child){child.castShadow = true;});
                    newCell.receiveShadow = true;
                    scene.add(newCell);
                }
            }

            for(let x = 0; x < 3; x++) {
                for(let y = 0; y < 3; y++) {
                    let newCell = object.clone();
                    newCell.scale.set(0.002,0.002,0.002); // normalize to roughly 1x1 packing
                    newCell.position.set(-10,2 + x*5,5 - y*5);
                    newCell.rotation.y = Math.PI * -0.5;
                    newCell.castShadow = true;
                    newCell.traverse(function(child){child.castShadow = true;});
                    newCell.receiveShadow = true;
                    scene.add(newCell);
                }
            }

        }
    );

    // Men
    menGroup = new THREE.Group();
    menGroup2 = new THREE.Group();

    var ballGeo = new THREE.SphereGeometry(0.5,10,35);
    var material = new THREE.MeshPhongMaterial({color: 0xF7FE2E}); 
    var ball = new THREE.Mesh(ballGeo, material);
    ball.position.set(0,2.5,0);
    
    var pendulumGeo = new THREE.CylinderGeometry(0.5,0.5, 4, 10);
    ball.updateMatrix();
    pendulumGeo.merge(ball.geometry, ball.matrix);
    
    var pendulum = new THREE.Mesh(pendulumGeo, material);

    pendulum.position.set(0,10,0);

    var hatGeo = new THREE.TorusGeometry( 10, 0.9, 16, 100 );
    var hat = new THREE.Mesh(hatGeo, material);
    hat.scale.set(0.05,0.05,0.05);
    hat.rotation.x = Math.PI * -0.5;
    hat.position.y = -0.2
    
    var hatpendulumGeo = new THREE.CylinderGeometry(0.5, 0.4, 0.5, 100);
    hat.updateMatrix();
    hatpendulumGeo.merge(hat.geometry, hat.matrix);
    
    var hatpendulum = new THREE.Mesh(hatpendulumGeo, material);

    hatpendulum.position.set(0,13,0);

    for ( let i = 0; i < 3; i ++ ) {
        for ( let j = 0; j < 3; j ++ ) {
            
            let manClone = pendulum.clone();
            manClone.position.set(5 - i*5,5 + j*5,12);
            manClone.scale.setScalar( 0.7 );
            manClone.castShadow = true;
            manClone.receiveShadow = true;

            let hatClone = hatpendulum.clone();
            hatClone.position.set(5 - i*5,manClone.position.y + 2,12);
            hatClone.scale.setScalar( 0.7 );
            hatClone.castShadow = true;
            hatClone.receiveShadow = true;

            menGroup.add( hatClone );
            menGroup.add( manClone );
        }
    } 

    for ( let i = 0; i < 3; i ++ ) {
        for ( let j = 0; j < 3; j ++ ) {
            
            let manClone = pendulum.clone();
            manClone.position.set(3 - i*5,3 + j*5,13);
            manClone.scale.setScalar( 0.7 );
            manClone.castShadow = true;
            manClone.receiveShadow = true;

            let hatClone = hatpendulum.clone();
            hatClone.position.set(3 - i*5,manClone.position.y + 2,13);
            hatClone.scale.setScalar( 0.7 );
            hatClone.castShadow = true;
            hatClone.receiveShadow = true;

            menGroup2.add( hatClone );
            menGroup2.add( manClone );
        }
    } 

    for ( let i = 0; i < 3; i ++ ) {
        for ( let j = 0; j < 3; j ++ ) {
            
            let manClone = pendulum.clone();
            manClone.position.set(12,2 + i*5,5 - j*5);
            manClone.scale.setScalar( 0.7 );
            manClone.castShadow = true;
            manClone.receiveShadow = true;

            let hatClone = hatpendulum.clone();
            hatClone.position.set(12,manClone.position.y + 2,5 - j*5);
            hatClone.scale.setScalar( 0.7 );
            hatClone.castShadow = true;
            hatClone.receiveShadow = true;

            menGroup.add( hatClone );
            menGroup.add( manClone );
        }
    } 

    for ( let i = 0; i < 3; i ++ ) {
        for ( let j = 0; j < 3; j ++ ) {
            
            let manClone = pendulum.clone();
            manClone.position.set(13,3 + i*5,3 - j*5);
            manClone.scale.setScalar( 0.7 );
            manClone.castShadow = true;
            manClone.receiveShadow = true;

            let hatClone = hatpendulum.clone();
            hatClone.position.set(13,manClone.position.y + 2,3 - j*5);
            hatClone.scale.setScalar( 0.7 );
            hatClone.castShadow = true;
            hatClone.receiveShadow = true;

            menGroup2.add( hatClone );
            menGroup2.add( manClone );
        }
    } 

    for ( let i = 0; i < 3; i ++ ) {
        for ( let j = 0; j < 3; j ++ ) {
            
            let manClone = pendulum.clone();
            manClone.position.set(-12,2 + i*5,5 - j*5);
            manClone.scale.setScalar( 0.7 );
            manClone.castShadow = true;
            manClone.receiveShadow = true;

            let hatClone = hatpendulum.clone();
            hatClone.position.set(-12,manClone.position.y + 2,5 - j*5);
            hatClone.scale.setScalar( 0.7 );
            hatClone.castShadow = true;
            hatClone.receiveShadow = true;

            menGroup.add( hatClone );
            menGroup.add( manClone );
        }
    } 

    for ( let i = 0; i < 3; i ++ ) {
        for ( let j = 0; j < 3; j ++ ) {
            
            let manClone = pendulum.clone();
            manClone.position.set(-13,3 + i*5,3 - j*5);
            manClone.scale.setScalar( 0.7 );
            manClone.castShadow = true;
            manClone.receiveShadow = true;

            let hatClone = hatpendulum.clone();
            hatClone.position.set(-13,manClone.position.y + 2,3 - j*5);
            hatClone.scale.setScalar( 0.7 );
            hatClone.castShadow = true;
            hatClone.receiveShadow = true;

            menGroup2.add( hatClone );
            menGroup2.add( manClone );
        }
    } 

    scene.add(menGroup);
    scene.add(menGroup2);


    // text
    objLoader.load(
        // resource URL
        'text.obj',
        // called when resource is loaded
        function ( object ) {
            object.scale.set(-0.01,0.01,0.01);
            object.position.set(0,0,-8);
            object.castShadow = true;
            object.traverse(function(child){child.castShadow = true;});
            object.receiveShadow = true;
            scene.add( object );

        }
    );


    
    renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth/1.5, window.innerHeight/1.5 );
    
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ReinhardToneMapping;

    window.addEventListener( 'resize', onWindowResize, false );
    
    controls = new OrbitControls (camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 50;
    }
      
    function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    }
      
    function animate() {
    requestAnimationFrame( animate );
    const time = Date.now() * 0.0008;
    const time2 = Date.now() * 0.003;

    bulbLight.position.z = Math.cos( time ) * 1.75;
    menGroup.position.y = Math.cos( time2 ) * 2.75;
    menGroup2.position.y = Math.cos( time2 ) * -2.75;
    //bulbMat.emissiveIntensity = bulbLight.intensity / Math.pow( 0.2, 2.0 );
    controls.update();
    renderer.render( scene, camera );
    }
  }, []);
  return (
  <div style={{backgroundColor: "#000000"}}>
      <Header/>
      <div className={styles.container}> 
        <h2 className={styles.title} >Recreated Treachery of Images</h2>
        <p className={styles.text} >3js project for the course of CCI - Coding One: Advanced Creative Coding.</p>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://github.com/melismeric/UAL-CodingOne/tree/main/3js/Treachery%20of%20Images">Github</a></h6>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://mimicproject.com/code/5a212e94-e851-13a7-f91e-6e68d2063263">MIMIC</a></h6>

      </div>
      <canvas style={{display: "flex", margin: "auto", flexDirection: "row", justifyContent: "center"}} ref={canvasRef} />
      <Footer/>
    </div>
  )
}