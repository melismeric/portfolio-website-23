import Head from 'next/head'
import styles from '../styles/Project.module.css';
import Header from '../components/Header'
import * as THREE from "three";
import { useRef, useEffect } from "react";
import Footer from '../components/Footer'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import TWEEN from 'tween.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Water } from 'three/examples/jsm/objects/Water.js';


export default function Home() {

  // Define the vertex shader code
const vertexShader = `
    varying vec3 vPos;
    varying vec3 vNormal;
    void main() {
      vPos = (modelMatrix * vec4(position, 1.0 )).xyz;
      vNormal = normalMatrix * normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
`;

// Define the fragment shader code
const fragmentShader = `
    uniform vec3 diffuse;
    varying vec3 vPos;
    varying vec3 vNormal;

    struct PointLight {
    vec3 position;
    vec3 color;
    };
    uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

    void main() {
    vec4 addedLights = vec4(0.1, 0.1, 0.1, 1.0);
    for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
        vec3 adjustedLight = pointLights[l].position + cameraPosition;
        vec3 lightDirection = normalize(vPos - adjustedLight);
        addedLights.rgb += clamp(dot(-lightDirection, vNormal), 0.0, 1.0) * pointLights[l].color;
    }
    gl_FragColor = addedLights;//mix(vec4(diffuse.x, diffuse.y, diffuse.z, 1.0), addedLights, addedLights);
    }
`;

const fragmentShader2 = `
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;

    uniform vec3 diffuse;
    varying vec3 vPos;
    varying vec3 vNormal;

    struct PointLight {
    vec3 position;
    vec3 color;
    };
    uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

    float random (in vec2 st) {
        return fract(sin(dot(st.xy,
                            vec2(12.9898,78.233)))
                    * 43758.5453123);
    }

    float noise(vec2 st) {
        vec2 i = floor(u_mouse.x*st);
        vec2 f = fract(u_mouse.x*110.5*st);
        vec2 u = f*f*(3.0-2.0*f);
        return mix( mix( random( i + vec2(0.0,0.0) ),
                        random( i + vec2(1.0,0.0) ), u.x),
                    mix( random( i + vec2(0.0,1.0) ),
                        random( i + vec2(1.0,1.0) ), u.x), u.y);
    }

    mat2 rotate2d(float angle){
        return mat2(cos(angle),-sin(angle),
                    sin(angle),cos(angle));
    }

    float lines(in vec2 pos, float b){
        float scale = 10.0;
        pos *= scale;
        return smoothstep(0.0,
                        .5+b*.5,
                        abs((sin(pos.x*3.1415)+b*2.0))*.5);
    }

    void main() {
        vec4 addedLights = vec4(0.1, 0.1, 0.1, 1.0);
        for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
            vec3 adjustedLight = pointLights[l].position + cameraPosition;
            vec3 lightDirection = normalize(vPos - adjustedLight);
            addedLights.rgb += clamp(dot(-lightDirection, vNormal), 0.0, 1.0) * pointLights[l].color;
        }

        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        st.y *= u_resolution.y/u_resolution.x;

        vec2 pos = st.yx*vec2(10.,3.);

        float pattern = pos.x;

        // Add noise
        pos = rotate2d( noise(pos) ) * pos;

        // Draw lines
        pattern = lines(pos,.5);

        gl_FragColor = vec4(vec3(addedLights * pattern),1.0);
    }
`;

const vertexShader3 = `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

// Define the fragment shader code
const fragmentShader3 = `
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;


    #define PI 3.1415926535897932384626433832795

    //this is a basic Pseudo Random Number Generator
    float hash(in float n)
    {
        return fract(sin(n)*43758.5453123);
    }

    void main() {

        //"squarified" coordinates 
        vec2 xy = ( 2.0* gl_FragCoord.xy - u_resolution.xy ) / u_resolution.y ;

        //rotating light 
        vec3 center = vec3(0.0, 1.0, cos(u_mouse.x*0.02) );
        
        //temporary vector
        vec3 pp = vec3(0.000,0.000,0.000);

        //maximum distance of the surface to the center (try a value of 0.1 for example)
        float length = 2.0;
        
        //this is the number of cells
        const float count = 329.0;
        
        for( float i = 0.; i < count; i+=1. )
        {
            //random cell: create a point around the center
            
            //gets a 'random' angle around the center 
            float an = sin( u_mouse.x * PI * 0.736 ) + hash( i ) * PI * 1.880;
            
            //gets a 'random' radius ( the 'spacing' between cells )
            float ra = sqrt(hash( an )) * -0.5;

            //creates a temporary 2d vector
            vec2 p = vec2( center.x + sin( an ) * 5.368, center.z + cos( an ) * ra );

            //finds the closest cell from the fragment's XY coords
            
            //compute the distance from this cell to the fragment's coordinates
            float di = distance( xy, p );
            
            //and check if this length is inferior to the minimum length
            length = min( length, di );
            
            //if this cell was the closest
            if( length == di )
            {
                //stores the XY values of the cell and compute a 'Z' according to them
                pp.xy = p;
                pp.z = i / count * xy.x * xy.y;
            }
        }


        gl_FragColor = vec4( pp , 1. );

    }

`;

  const canvasRef = useRef(null);

  useEffect(() => {
    const positions = [
    [10, 15, 20],
    [-30, 30, -15]
    ];
    let currPosition = 0;

    let camera, scene, renderer, water;
    let room, room2, room3, room4;
    let pointLight, pointLight2;
    const radius = 0.08;   
    let INTERSECTED, INTERSECTEDMAT;
    //const clock = new THREE.Clock();
    let normal = new THREE.Vector3();
    const relativeVelocity = new THREE.Vector3(); 
    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    var uniforms;
    var pixel_resolution = 2;
    const groupLights = new THREE.Group();
    const spheres = [];

    const params = {
        color: '#ffffff',
        scale: 6,
        flowX: 100,
        flowY: 100
    };

    function createLight( size, lines, color ) {

            const intensity = 1.5;

            const light = new THREE.PointLight( color, intensity, 20 );
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

        let uniforms3 = { 
            u_time: {type: 'f', value: 0.2},
            u_resolution: {type: 'v2', value: new THREE.Vector2()},
            u_mouse: {type: 'v2', value: new THREE.Vector2()}
        };
        let pointLight3 = createLight( 1, 10.5, 0xEBF348);

        const canvas = canvasRef.current;
        camera = new THREE.PerspectiveCamera( 45, canvas.clientWidth / canvas.clientHeight, 1, 1000 );
        camera.position.set( 0, 10, 60 );

        scene = new THREE.Scene();
        scene.add( new THREE.AmbientLight( 0x111122 ) );

        room = createRoom(0,10);
        scene.add(room);
        room2 = createRoom(50,10);
        scene.add(room2);
        room3 = createRoom(0,60);
        scene.add(room3);
        room4 = createRoom(50,60);
        scene.add(room4);


        // lights


        // ROOM1
        pointLight = createLight( 2, 3.5, 0x0088ff);
        pointLight.position.set(0,10,0)

        pointLight2 = createLight( 1, 20.5, 0xD148F3);
        let pointLight4 = createLight( 1, 5.5, 0xC6FFC5);           
        let pointLight5 = createLight( 1, 5.5, 0xFF07E1);
         
        pointLight.add(pointLight2);
        pointLight.add(pointLight3);  
        pointLight.add(pointLight4);
        pointLight.add(pointLight5);

        scene.add(pointLight)
        
        var uniforms = THREE.UniformsUtils.merge([
            THREE.UniformsLib['lights'],
            { diffuse: { type: 'c', value: new THREE.Color(0xff00ff) } }
        ]);
        var vertexShader = vertexShader;
        var fragmentShader = fragmentShader;
        let material2 = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            lights: true
        });

        var geometry2 = new THREE.SphereGeometry( 6, 12, 60 );
        let mesh = new THREE.Mesh(geometry2, material2);
        mesh.rotation.x = - Math.PI / 2;
        room.position.y = 10;
        //scene.add(mesh);

        // water
        
        const waterGeometry = new THREE.PlaneGeometry( 20, 20 );

        water = new Water( waterGeometry, {
            color: params.color,
            scale: params.scale,
            flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
            textureWidth: 1024,
            textureHeight: 1024
        } );

        water.position.y = 1;
        water.rotation.x = Math.PI * - 0.5;
        //scene.add( water );

        // ROOM2

        let uniforms2 = THREE.UniformsUtils.merge([
            THREE.UniformsLib['lights'],
            { diffuse: { type: 'c', value: new THREE.Color(0xff00ff) },
            u_time: {type: 'f', value: 0.2},
            u_resolution: {type: 'v2', value: new THREE.Vector2()},
            u_mouse: {type: 'v2', value: new THREE.Vector2()}
         }
        ]);
        
        var fragmentShader2 = fragmentShader2;
        let material3 = new THREE.ShaderMaterial({
            uniforms: uniforms2,
            fragmentShader: fragmentShader2,
            vertexShader: vertexShader,
            lights: true
        });

        var geometry5 = new THREE.PlaneGeometry( 30, 30, 30 );
        let mesh2 = new THREE.Mesh(geometry5, material3);
        mesh2.position.y = 10;
        mesh2.position.x = 50;
        scene.add(mesh2);

        // ROOM3

        const spotLight = new THREE.SpotLight( 0xffffff, 0.09 );
        spotLight.position.set( 0, 100, 0 );

        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 100;
        spotLight.shadow.mapSize.height = 100;

        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 400;
        spotLight.shadow.camera.fov = 30;

        scene.add( spotLight );

        var geometry3= new THREE.PlaneGeometry( 30, 30, 30 );

        var material4 = new THREE.ShaderMaterial({ uniforms3, vertexShader3, fragmentShader3, side: THREE.DoubleSide });
        
        let screen = new THREE.Mesh( geometry3, material4 );
        screen.position.set(0, 60 , 0);

        scene.add( screen );

        // Room4

        for (let i=0; i<10; i++) {
            for (let j=0; j<8; j++) {
                const lightRoom4 = new THREE.PointLight( 0x0088ff, 0.09, 15 );
                lightRoom4.position.set( 32 + i*4, 46 + j*4, -18 );
                lightRoom4.target = room4;
        
                let geometryL = new THREE.SphereGeometry( 1, 12, 6 );
                let materialL = new THREE.MeshBasicMaterial( { color: 0x0088ff } );
                materialL.color.multiplyScalar( 1.5 );
                let sphere = new THREE.Mesh( geometryL, materialL );
                lightRoom4.add( sphere );
                groupLights.add( lightRoom4 );
            }
        }

        for ( let i = 0; i < 60; i ++ ) {

            const lightRoom4 = new THREE.PointLight( 0x0088ff, 0.9, 15 );
            lightRoom4.target = room4;
    
            let geometryL = new THREE.SphereGeometry( 1, 12, 6 );
            let materialL = new THREE.MeshBasicMaterial( { color: 0x0088ff } );
            materialL.color.multiplyScalar( 1.5 );
            let sphere = new THREE.Mesh( geometryL, materialL );
            lightRoom4.position.x = getRandomArbitrary(40,70) - 5;
            lightRoom4.position.y = getRandomArbitrary(50,80) - 5;
            lightRoom4.position.z = getRandomArbitrary(-10,30) - 5;
            lightRoom4.scale.x = lightRoom4.scale.y = lightRoom4.scale.z = Math.random() + 1;
            lightRoom4.add( sphere );
            groupLights.add( lightRoom4 );
        }
        scene.add(groupLights);

        document.onkeydown=keyPressed;
  
        function keyPressed(input) {
            if (input.keyCode == 39) {
                tweenCamera(camera, [50, camera.position.y, 60], 3000);
      
            }
            else if (input.keyCode == 37) {
                tweenCamera(camera, [0, camera.position.y, 60], 3000);
        
            }
            else if (input.keyCode == 38) {
                tweenCamera(camera, [camera.position.x, 60, 60], 3000);
            
            }
            else if (input.keyCode == 40) {
                tweenCamera(camera, [camera.position.x, 10, 60], 3000);
               
            }
        }

       
        renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current });

        renderer.setSize( window.innerWidth/1.5, window.innerHeight/1.5 );
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.BasicShadowMap;

        renderer.setPixelRatio(window.devicePixelRatio/1.5 / pixel_resolution);
        onWindowResize();
        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener('mousemove', onMouseMove, false);

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.target.set(0, 10, 0 );
        controls.update();


        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            uniforms2.u_resolution.value.x = renderer.domElement.width;
            uniforms2.u_resolution.value.y = renderer.domElement.height;
            renderer.setSize( window.innerWidth/1.5, window.innerHeight/1.5 );

        }

        function onMouseMove( event ) {

            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            /*uniforms2.u_mouse.value.x = ( event.clientX / window.innerWidth );
            uniforms2.u_mouse.value.y = ( 1-(event.clientY) / window.innerHeight);
            uniforms3.u_mouse.value.x = ( event.clientX / window.innerWidth );
            uniforms3.u_mouse.value.y = ( 1-(event.clientY) / window.innerHeight);*/

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

        function animate() {

            requestAnimationFrame( animate );
            TWEEN.update();
            render();

        }

        function render() {
            uniforms2.u_resolution.value.x = window.innerWidth;
            uniforms2.u_resolution.value.y = window.innerHeight;
            uniforms3.u_resolution.value.x = window.innerWidth;
            uniforms3.u_resolution.value.y = window.innerHeight;
            uniforms2.u_time.value += 0.01;
            uniforms3.u_time.value += 0.01;

            var time = Date.now() * 0.0005;

            pointLight.position.x = mouse.x*18;
            pointLight.position.y = mouse.y*18;
            pointLight.position.z = Math.cos( time * 8 ) * 10;

            pointLight2.position.x = Math.cos( time * 5 ) * 10;
            pointLight2.position.y = Math.cos( time * 7 ) * 10;
            pointLight2.position.z = Math.cos( time * 8 ) * 10;

            pointLight3.position.x = Math.cos( time * 6 ) * -9;
            pointLight3.position.y = Math.cos( time * 7 ) * -9;
            pointLight3.position.z = Math.cos( time * 8 ) * 9;

            pointLight4.position.x = Math.sin( time * 6 ) * 13;
            pointLight4.position.y = Math.sin( time * 7 ) * 9 + 10;
            pointLight4.position.z = Math.sin( time * 8 ) * 9;
            
            pointLight5.position.x = Math.sin( time * 2 ) * 9;
            pointLight5.position.y = Math.cos( mouse.x ) * 9;
            pointLight5.position.z = Math.sin( time * 3 ) * 9;

            pointLight2.rotation.x = time;
            pointLight2.rotation.z = time;
            pointLight3.rotation.x = time;
            pointLight3.rotation.z = time;
            pointLight4.rotation.x = time;
            pointLight4.rotation.z = time;
            pointLight5.rotation.x = time;
            pointLight5.rotation.z = time;

            pointLight.rotation.x = time;
            pointLight.rotation.z = time;



            // Raycaster for room4

            raycaster.setFromCamera( mouse, camera );

            for (var i = 0; i < groupLights.children.length; i++) {
                const intersects = raycaster.intersectObjects( groupLights.children[i].children, false );

                if ( intersects.length > 0 ) {
                    
                    let color =  Math.random() * 0xffffff ;

                    if ( INTERSECTED != intersects[ 0 ].object.parent ) {
                        INTERSECTED = intersects[ 0 ].object.parent;
                        INTERSECTED.color.setHex( color );
                        INTERSECTED.intensity = 0.5

                    }


                    if ( INTERSECTEDMAT != intersects[ 0 ].object ) {

                        INTERSECTEDMAT = intersects[ 0 ].object;
                        INTERSECTEDMAT.material.color.setHex( color );
                    }


                }
            }


            var timestampNow = new Date().getTime()/1000.0;
            var lightIntensity = 0.75 + 0.25 * Math.cos(timestampNow * Math.PI);
            //mesh.material.uniforms.diffuse.value = lightIntensity;
            pointLight2.color.setHSL(lightIntensity, 1.0, 0.5);

            // Room4 render

                for (var i2 = 0; i2 < groupLights.children.length; i2++) 
            {
                //console.log(groupLights.children[i].children)
                //groupLights.children[i2].position.y =Math.sin( time*0.00006 ) + getRandomArbitrary(50,80);
                //groupLights.children[i].position.x = Math.cos( time*0.6 )*0.05;

                /*groupLights.children[i2].position.x = getRandomArbitrary(40,70) - 5;
                groupLights.children[i2].position.y = getRandomArbitrary(50,80) - 5;
                groupLights.children[i2].position.z = getRandomArbitrary(-10,30) - 5;*/
            }

            renderer.render( scene, camera );

        }

      function interval(){
        currPosition = currPosition === 0 ? 1 : 0;
        tweenCamera(camera, positions[currPosition], 3000);
      }
      /*interval();
      setInterval(interval, 4000);*/

      function tweenCamera(camera, position, duration) {
        new TWEEN.Tween(camera.position).to({
          x: position[0],
          y: position[1],
          z: position[2]
        }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
      }

      function createRoom(posX, posY){
        let room;
        const geometry= new THREE.BoxGeometry( 40, 40, 40 );

        const material = new THREE.MeshPhongMaterial( {
            color: 0xa0adaf,
            shininess: 10,
            specular: 0x111111,
            side: THREE.BackSide
        } );

        room = new THREE.Mesh( geometry, material );
        room.position.x = posX;
        room.position.y = posY;
        room.receiveShadow = true;

        return(room);
      }

      function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
      }
                  animate();
  }, []);
  return (
  <div style={{backgroundColor: "#000000"}}>
      <Header/>
      <div className={styles.container}> 
        <h2 className={styles.title} >3js Rooms</h2>
        <p className={styles.text} >Three.js and GLSL Shader project for the course of CCI - Coding One: Advanced Creative Coding. Use dat.gui to visit the rooms and interact with the objects in them.</p>
        <p className={styles.text} >Use arrow keys to navigate between</p>

        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://github.com/melismeric/UAL-CodingOne/tree/main/3js/Rooms">Github</a></h6>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://mimicproject.com/code/35ba7369-cd2b-a6c9-1908-a5428e14f325">MIMIC</a></h6>

      </div>
      <canvas style={{display: "flex", margin: "auto", flexDirection: "row", justifyContent: "center"}} ref={canvasRef} />
      <Footer/>
    </div>
  )
}