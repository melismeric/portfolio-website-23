import Head from 'next/head'
import styles from '../styles/Project.module.css';
import Header from '../components/Header'
import * as THREE from "three";
import { useRef, useEffect } from "react";
import Footer from '../components/Footer'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Tween } from "tween.js";


export default function Home() {

  // Define the vertex shader code
const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPositionNormal;
  void main() 
  {
  vNormal = normalize( normalMatrix * normal );
  vPositionNormal = normalize(( modelViewMatrix * vec4(position, 1.0) ).xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

// Define the fragment shader code
const fragmentShader = `
  uniform vec3 glowColor;
  uniform float glow;

  uniform vec2 u_mouse;

  varying vec3 vNormal;
  varying vec3 vPositionNormal;
  void main() 
  {
  float b = 1.2;
  float p = 1.0;
  float a = pow( b + glow * abs(dot(vNormal, vPositionNormal)), p );
  gl_FragColor = vec4( glowColor, a );
  }
`;

const vertexShader2 = `
  void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

// Define the fragment shader code
const fragmentShader2 = `
  uniform vec2 resolution;
  uniform vec2 mouse;
  uniform float time;

  float random (in vec2 _st) {
      return fract(sin(dot(_st.xy,
                          vec2(12.9898,78.233)))*
          43758.5453123);
  }

  // Based on Morgan McGuire @morgan3d
  // https://www.shadertoy.com/view/4dS3Wd
  float noise (in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(a, b, u.x) +
              (c - a)* u.y * (1.0 - u.x) +
              (d - b) * u.x * u.y;
  }

  #define NUM_OCTAVES 5

  float fbm ( in vec2 _st) {
      float v = 0.0;
      float a = 0.5;
      vec2 shift = vec2(100.0);
      // Rotate to reduce axial bias
      mat2 rot = mat2(cos(0.5), sin(0.5),
                      -sin(0.5), cos(0.50));
      for (int i = 0; i < NUM_OCTAVES; ++i) {
          v += a * noise(_st);
          _st = rot * _st * 2.0 + shift;
          a *= 0.5;
      }
      return v;
  }

  void main() {
      vec2 st = gl_FragCoord.xy/resolution.xy*3.;
      vec3 color = vec3(0.0);
      vec2 q = vec2(0.);
      vec2 r = vec2(0.);
      r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*time*mouse.x );
      r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*time*mouse.y);

      float f = fbm(st+r);

      color = mix(vec3(0.101961,0.619608,0.666667),
                  vec3(0.666667,0.666667,0.498039),
                  clamp((f*f)*4.0,0.0,1.0));

      color = mix(color,
                  vec3(0,0,0.164706),
                  clamp(length(q),0.0,1.0));

      color = mix(color,
                  vec3(0.666667,1,1),
                  clamp(length(r.x),0.0,1.0));

      gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.);
  }
`;
  const canvasRef = useRef(null);

  useEffect(() => {
    let scene,camera, renderer, flash, room, rain, rainGeo, rainCount = 15000, uniforms, spaceShip;
    var pixel_resolution = 2;
    const clock = new THREE.Clock();
    const mouse = new THREE.Vector2();
    const cloudParticles = new THREE.Group();
    const lights = new THREE.Group();
    const raycaster = new THREE.Raycaster();
    let INTERSECTED, INTERSECTEDMAT;
    let pointLight3, pointLight4, pointLight5;
    let uniforms2={time: { type: 'f', value: 1.0 }, resolution: { type: 'v2', value: new THREE.Vector2() }, mouse: {type: "v2", value: new THREE.Vector2()}};
    let seeClouds = false;
    var uniformsScreen;
    var screen;

    function tweenCamera(camera, position, duration) {        
        new TWEEN.Tween(camera.position).to({
        x: position[0],
        y: position[1],
        z: position[2]
        }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
    }


        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.z = 400;
        camera.position.y = 10;

        var ambient = new THREE.AmbientLight(0x555555, 0.5);
        scene.add(ambient);

        var directionalLight = new THREE.DirectionalLight(0xffeedd);
        directionalLight.position.set(0,1,1);
        scene.add(directionalLight);

        flash = new THREE.PointLight(0x062d89, 70, 700 ,1.7);
        flash.position.set(200,300,100);
        scene.add(flash);

        uniformsScreen = {time: { type: 'f', value: 1.0 }, resolution: { type: 'v2', value: new THREE.Vector2() }, mouse: {type: "v2", value: new THREE.Vector2()}};
        var material11 = new THREE.ShaderMaterial({ uniformsScreen, vertexShader2, fragmentShader2});
        
        const geometry1 = new THREE.BoxGeometry(1200, 500, 500 );
        screen = new THREE.Mesh( geometry1, material11 );
        screen.position.set(0,-280,-600)
        screen.visible = false;
        scene.add( screen );

        // Ground
        const planeGeo = new THREE.PlaneGeometry(2000, 2000);
        let xfloorMat = new THREE.MeshStandardMaterial( {
            roughness: 0.8,
            color: 0x7a7a7a,
            metalness:1.2,
            bumpScale: 0.0005
        } );
        const textureLoader = new THREE.TextureLoader();
        let floorMat = new THREE.MeshStandardMaterial({});
        textureLoader.load( "/textures/ground2.jpeg", function ( map ) {

            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set( 5, 5 );
            map.encoding = THREE.sRGBEncoding;
            floorMat.map = map;
            floorMat.needsUpdate = true;

        } );
        const plane = new THREE.Mesh( planeGeo, xfloorMat );
        plane.receiveShadow = true;
        plane.rotation.x = Math.PI / -2.0;
        scene.add( plane );
    
        // Room
        room = createRoom(0,30,170);
        //scene.add(room);

        // ROOM1
        
        const positions = [
            [50, 50,-250],[-200, 50,-250], [-350, 90, -150], [250, 60,-200],[-250, 60, 200], [350, 90,-50],
            [40, 70, 200],[150, 50,100],[150, 50,100],[150, 50,100]
        ]

        const colors = [
            0x0088ff, 0xB601FF, 0x0127FF, 0xFFFF13, 0x4CFF13, 0xFF1313, 0xFFA200, 0x6800FF, 0x93FFB4, 0xCE93FF
        ]

        const lines = [ 8, 3.5, 8, 4, 6, 3.4, 7, 10, 20, 15]

        for (let s=0; s<10; s++) {
            let pointLight = createLight( 10, lines[s], colors[s]); 
            pointLight.position.set(positions[s][0],positions[s][1],positions[s][2]);

            lights.add(pointLight);
        }

        scene.add(lights);
        spaceShip = createSpaceship( 10, 20.5, 0x0088ff);
        spaceShip.position.set(0, 20,-30)
        scene.add(spaceShip)
        //

        renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        scene.fog = new THREE.FogExp2(0x11111f, 0.002);

        renderer.setClearColor(scene.fog.color);
        renderer.setSize(window.innerWidth/1.2, window.innerHeight/1.2);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.BasicShadowMap;
        //document.body.appendChild(renderer.domElement);
        window.addEventListener('mousemove', onMouseMove, false);


        const controls = new OrbitControls( camera, renderer.domElement );
        controls.target.set(0, 50, 0 );
        controls.update();

        // Create a rain texture
        const loader = new THREE.TextureLoader();
         rainGeo = new THREE.BufferGeometry();
         rainGeo.vertices = [];
          for(let i=0;i<rainCount;i++) {
              let rainDrop = new THREE.Vector3(
                  Math.random() * 800 - 500,
                  Math.random() * 800 + 200, //- 850,
                  Math.random() * 800 - 500
              );
              rainDrop.velocity = {};
              rainDrop.velocity = 0;
              rainGeo.vertices.push(rainDrop);
          }
          let rainMaterial = new THREE.PointsMaterial({
              color: 0xaaaaaa,
              size: 15,
              transparent: true
          });
          rain = new THREE.Points(rainGeo,rainMaterial);
          scene.add(rain);

        
        loader.load("/textures/cloud.png", function(texture){
        let cloudGeo = new THREE.SphereBufferGeometry(200,500);
        let cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });

        for(let p=0; p<50; p++) {
            let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
            cloud.position.set(
            Math.random()*800 -400,
            500,
            Math.random()*800 - 450
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random()*360;
            cloud.material.opacity = 0.6;
            cloudParticles.add(cloud);
            
        }
        scene.add(cloudParticles);

        // GUI
        var props = {
            seeClouds:false,
        };

        

  
        });
    


    function animate() {
        //TWEEN.update();
        uniformsScreen.resolution.value.x = window.innerWidth;
        uniformsScreen.resolution.value.y = window.innerHeight;
        uniformsScreen.time.value += 0.01;
        uniformsScreen.time.value += 0.01;

        raycaster.setFromCamera( mouse, camera );

        const intersects = raycaster.intersectObjects( cloudParticles.children, false );

        if ( intersects.length > 0 ) {
        let color =  Math.random() * 0xffffff ;

            if(Math.random() > 0.93 || flash.power > 100) {
                if(flash.power < 100) 
                    flash.position.set(
                    Math.random()*400,
                    300 + Math.random() *200,
                    100
                    );
                flash.power = 50 + Math.random() * 600;
                flash.color.setHex(color);
            }
            if ( INTERSECTED != intersects[ 0 ].object ) {
            
                INTERSECTED = intersects[ 0 ].object;
                INTERSECTED.material.color.setHex( color );
            }
                
        } 


        for (var i = 0; i < cloudParticles.children.length; i++) {
            cloudParticles.children[i].rotation.z -=0.002;
        }

                     rainGeo.vertices.forEach(p => {
                            p.velocity -= 0.1 + Math.random() * 0.1;
                            p.y += p.velocity;
                            if (p.y < -200) {
                                p.y = 200;
                                p.velocity = 0;
                            }
                        });
                        rainGeo.verticesNeedUpdate = true;
                        rain.rotation.y +=0.002;

        var time = Date.now() * 0.0005;

        for (var i = 0; i < lights.children.length; i++) {
            lights.children[i].rotation.y = time * Math.PI;
            if (i == 0 ) lights.children[i].position.y = Math.cos( time * 2 ) * 40 + 60;
            else lights.children[i].position.y = Math.cos( time * 2*i ) * 40 + 60;
        }

        spaceShip.position.y = mouse.y* 80 + 100; //Math.cos( time * 6 ) * -9;
        spaceShip.position.x = mouse.x* 80 + 30;

        lights.children[1].position.x = Math.cos( time * 6 ) * 60 - 100;
        lights.children[1].position.y = Math.cos( time * 7 ) * 50 + 100;
        lights.children[1].position.z = Math.cos( time * 8 ) * 9;
        lights.children[1].rotation.x = time;

        lights.children[2].position.x = Math.cos( time * 6 ) * -60 + 100;
        lights.children[2].position.y = Math.cos( time * 10 ) * -30 + 200;
        lights.children[2].position.z = Math.cos( time * 8 ) * 20;
        lights.children[2].rotation.x = time;

        lights.children[0].position.x = Math.cos( time * 6 ) * -50 + 500;
        lights.children[0].position.y = Math.cos( time * 7 ) * 50 + 100;
        lights.children[0].position.z = Math.cos( time * 8 ) * 20;
        lights.children[0].rotation.x = time;

        lights.children[8].position.x = Math.cos( time * 10 ) * 80 - 500;
        lights.children[8].position.y = Math.cos( time * 10 ) * 20 + 100;
        lights.children[8].position.z = Math.cos( time * 8 ) * 80 + 100;
        lights.children[8].rotation.x = time;

        lights.children[9].position.x = Math.cos( time * 10 ) * -80 + 500;
        lights.children[9].position.y = Math.cos( time * 10 ) * 20 + 100;
        lights.children[9].position.z = Math.cos( time * 8 ) * 80 + 100;
        lights.children[9].rotation.x = time;

        if ( seeClouds && screen.position.y <= 100)
        screen.position.y +=1;
        
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    function createRoom(posX, posY, posZ){
        let room;
        const geometry= new THREE.BoxGeometry( 50, 50, 70 );

        const material = new THREE.MeshPhongMaterial( {
            color: 0xa0adaf,
            shininess: 10,
            specular: 0x111111,
            side: THREE.BackSide
        } );

        room = new THREE.Mesh( geometry, material );
        room.position.x = posX;
        room.position.y = posY;
        room.position.z = posZ;
        room.receiveShadow = true;

        return(room);
    }


    function generateTexture() {

        const canvas = document.createElement( 'canvas' );
        canvas.width = 2;
        canvas.height = 2;

        const context = canvas.getContext( '2d' );
        context.fillStyle = 'white';
        context.fillRect( 0, 1, 2, 1 );

        return canvas;

    }

    function createLight( size, lines, color ) {

        const intensity = 20.5;

        const light = new THREE.PointLight( color, intensity, 200 );
        light.castShadow = true;
        light.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects

        let geometry = new THREE.SphereGeometry( 0.3*size, 12, 6 );
        let material = new THREE.MeshBasicMaterial( { color: color } );
        material.color.multiplyScalar( intensity );
        let sphere = new THREE.Mesh( geometry, material );
        light.add( sphere );

        const texture = new THREE.CanvasTexture( generateTexture() );
        texture.magFilter = THREE.NearestFilter;
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set( 1, lines );

        geometry = new THREE.SphereGeometry( 2*size, 32, 8 );
        material = new THREE.MeshPhongMaterial( {
            side: THREE.DoubleSide,
            alphaMap: texture,
            alphaTest: 0.5,
            color: 0xB6B7BF
        } );

        sphere = new THREE.Mesh( geometry, material );
        sphere.castShadow = true;
        sphere.receiveShadow = true;

        light.add( sphere );

        // custom distance material
        const distanceMaterial = new THREE.MeshDistanceMaterial( {
            alphaMap: material.alphaMap,
            alphaTest: material.alphaTest
        } );
        sphere.customDistanceMaterial = distanceMaterial;

        return light;

    }

    function createSpaceship( size, lines, color) {

        const intensity = 0.5;

        const light = new THREE.DirectionalLight( color, intensity, 20 );
        light.castShadow = true;
        light.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects

        let geometry = new THREE.SphereGeometry( 0.3*size, 12, 6 );
        let material = new THREE.MeshBasicMaterial( { color: color } );
        material.color.multiplyScalar( intensity );
        let sphere = new THREE.Mesh( geometry, material );
        //light.add( sphere );

        const texture = new THREE.CanvasTexture( generateTexture() );
        texture.magFilter = THREE.NearestFilter;
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set( 1, lines );

        geometry = new THREE.ConeGeometry( 13, 20, 32 );
        var box = new THREE.ConeGeometry( 50, 20, 32 );
        var sphere2 = new THREE.SphereGeometry(42, 32, 32, 0, Math.PI * 2, 5);
        //var singleGeometry = new THREE.BufferGeometryUtils();
        var boxMesh = new THREE.Mesh(box);
        var sphereMesh = new THREE.Mesh(sphere2);

        const singleGeometry = new BufferGeometryUtils.mergeBufferGeometries([
          box,
          sphere2,
        ]);

        uniforms=
            { 
                "glow":   { type: "f", value: -3.0},
                glowColor: { type: "c", value: new THREE.Color(color) },
                u_mouse: {type: 'v2', value: new THREE.Vector2()}
            };

        var customMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader:   vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
        })

        sphere = new THREE.Mesh( singleGeometry, customMaterial );
        sphere.castShadow = true;
        sphere.receiveShadow = true;

        light.add( sphere );

        // custom distance material
        const distanceMaterial = new THREE.MeshDistanceMaterial( {
            alphaMap: customMaterial.alphaMap,
            alphaTest: customMaterial.alphaTest
        } );
        sphere.customDistanceMaterial = distanceMaterial;

        return light;
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function onMouseMove( event ) {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        uniforms.u_mouse.value.x = ( event.clientX / window.innerWidth );
        uniforms.u_mouse.value.y = ( 1-(event.clientY) / window.innerHeight);
        uniformsScreen.mouse.value.x = ( event.clientX / window.innerWidth );
        uniformsScreen.mouse.value.y = ( 1-(event.clientY) / window.innerHeight);
    }
    animate();
  }, []);
  return (
  <div style={{backgroundColor: "#000000"}}>
      <Header/>
      <div className={styles.container}> 
        <h2 className={styles.title} >Spaceship</h2>
        <h6 className={styles.text}>Shader created with GLSL & 3js for the course project of CCI - Coding One: Advanced Creative Coding.</h6>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://github.com/melismeric/UAL-CodingOne/tree/main/3js/Spaceship">Github</a></h6>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://mimicproject.com/code/ab67b347-7553-7767-15a1-e8d9415684ed">MIMIC</a></h6>

      </div>
      <canvas style={{display: "flex", margin: "auto", flexDirection: "row", justifyContent: "center"}} ref={canvasRef} />
      <Footer/>
    </div>
  )
}