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
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';

export default function Home() {

  // Define the vertex shader code
const vertexShader = /* glsl */`
    in vec3 position;
    uniform mat4 modelMatrix;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform vec3 cameraPos;
    out vec3 vOrigin;
    out vec3 vDirection;
    void main() {
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        vOrigin = vec3( inverse( modelMatrix ) * vec4( cameraPos, 1.0 ) ).xyz;
        vDirection = position - vOrigin;
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const fragmentShader = /* glsl */`
    precision highp float;
    precision highp sampler3D;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    in vec3 vOrigin;
    in vec3 vDirection;
    out vec4 color;
    uniform sampler3D map;
    uniform float threshold;
    uniform float steps;
    vec2 hitBox( vec3 orig, vec3 dir ) {
        const vec3 box_min = vec3( - 0.5 );
        const vec3 box_max = vec3( 0.5 );
        vec3 inv_dir = 1.0 / dir;
        vec3 tmin_tmp = ( box_min - orig ) * inv_dir;
        vec3 tmax_tmp = ( box_max - orig ) * inv_dir;
        vec3 tmin = min( tmin_tmp, tmax_tmp );
        vec3 tmax = max( tmin_tmp, tmax_tmp );
        float t0 = max( tmin.x, max( tmin.y, tmin.z ) );
        float t1 = min( tmax.x, min( tmax.y, tmax.z ) );
        return vec2( t0, t1 );
    }
    float sample1( vec3 p ) {
        return texture( map, p ).r;
    }
    #define epsilon .0001
    vec3 normal( vec3 coord ) {
        if ( coord.x < epsilon ) return vec3( 1.0, 0.0, 0.0 );
        if ( coord.y < epsilon ) return vec3( 0.0, 1.0, 0.0 );
        if ( coord.z < epsilon ) return vec3( 0.0, 0.0, 1.0 );
        if ( coord.x > 1.0 - epsilon ) return vec3( - 1.0, 0.0, 0.0 );
        if ( coord.y > 1.0 - epsilon ) return vec3( 0.0, - 1.0, 0.0 );
        if ( coord.z > 1.0 - epsilon ) return vec3( 0.0, 0.0, - 1.0 );
        float step = 0.01;
        float x = sample1( coord + vec3( - step, 0.0, 0.0 ) ) - sample1( coord + vec3( step, 0.0, 0.0 ) );
        float y = sample1( coord + vec3( 0.0, - step, 0.0 ) ) - sample1( coord + vec3( 0.0, step, 0.0 ) );
        float z = sample1( coord + vec3( 0.0, 0.0, - step ) ) - sample1( coord + vec3( 0.0, 0.0, step ) );
        return normalize( vec3( x, y, z ) );
    }
    void main(){
        vec3 rayDir = normalize( vDirection );
        vec2 bounds = hitBox( vOrigin, rayDir );
        if ( bounds.x > bounds.y ) discard;
        bounds.x = max( bounds.x, 0.0 );
        vec3 p = vOrigin + bounds.x * rayDir;
        vec3 inc = 1.0 / abs( rayDir );
        float delta = min( inc.x, min( inc.y, inc.z ) );
        delta /= steps;
        for ( float t = bounds.x; t < bounds.y; t += delta ) {
            float d = sample1( p + 0.5 );
            if ( d > threshold ) {
                color.rgb = normal( p + 0.5 ) * 0.5 + ( p * 1.5 + 0.25 );
                color.a = 1.;
                break;
            }
            p += rayDir * delta;
        }
        if ( color.a == 0.0 ) discard;
    }
`;


const vertexShader3 = `
    varying vec2 vUv;

    void main()
    {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
    }
`;

// Define the fragment shader code
const fragmentShader3 = `
   
            uniform float time;

            uniform sampler2D colorTexture;

            varying vec2 vUv;

            void main( void ) {

                vec2 position = - 1.0 + 2.0 * vUv;

                float a = atan( position.y, position.x );
                float r = sqrt( dot( position, position ) );

                vec2 uv;
                uv.x = cos( a ) / r;
                uv.y = sin( a ) / r;
                uv /= 10.0;
                uv += time * 0.05;

                vec3 color = texture2D( colorTexture, uv ).rgb;

                gl_FragColor = vec4( color * r * 1.5, 1.0 );

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

    let clock = new THREE.Clock();

    let room, room2, room3, room4;
    let pointLight, pointLight2;
    const radius = 0.08;   
    let INTERSECTED, INTERSECTEDMAT;
    //const clock = new THREE.Clock();
    let normal = new THREE.Vector3();
    const relativeVelocity = new THREE.Vector3(); 
    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    var pixel_resolution = 2;
    const groupLights = new THREE.Group();
    const spheres = [];

    let direction = 1;

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
        // Texture

        const size = 128;
        const data = new Uint8Array( size * size * size );

        let i = 0;
        const perlin = new ImprovedNoise();
        const vector = new THREE.Vector3();

        for ( let z = 0; z < size; z ++ ) {

            for ( let y = 0; y < size; y ++ ) {

                for ( let x = 0; x < size; x ++ ) {

                    vector.set( x, y, z ).divideScalar( size );

                    const d = perlin.noise( vector.x * 6.5, vector.y * 6.5, vector.z * 6.5 );

                    data[ i ++ ] = d * 128 + 128;

                }

            }

        }

        const texture = new THREE.Data3DTexture( data, size, size, size );
        texture.format = THREE.RedFormat;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.unpackAlignment = 1;
        texture.needsUpdate = true;



        var uniforms = {diffuse: { type: 'c', value: new THREE.Color(0xfffff) }, u_time: {type: 'f', value: 0.2}, u_resolution: { type: 'v2', value: new THREE.Vector2() }, u_mouse: {type: "v2", value: new THREE.Vector2()}};


        let materialww = new THREE.MeshBasicMaterial({
          color: 0xff0000, // red
        });

        const geometryp = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.RawShaderMaterial( {
            glslVersion: THREE.GLSL3,
            uniforms: {
                map: { value: texture },
                cameraPos: { value: new THREE.Vector3() },
                threshold: { value: 0.01 },
                steps: { value: 200 }
            },
            vertexShader,
            fragmentShader,
            side: THREE.BackSide,
        } );

        let mesh = new THREE.Mesh( geometryp, material );
        mesh.position.y = 10;
        mesh.position.x = 50;

        scene.add( mesh );

        mesh.scale.x = 40; // SCALE
        mesh.scale.y = 40; // SCALE
        mesh.scale.z = 40; // SCALE

 

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

        const geometryCube = new THREE.BoxGeometry( 1,1,1 );

        let uniformsCube = {
                    'time': { value: 1.0 },
                    'colorTexture': { value: new THREE.TextureLoader().load( 'src/flower3.gif' ) }
                };

        uniformsCube[ 'colorTexture' ].value.wrapS = uniformsCube[ 'colorTexture' ].value.wrapT = THREE.RepeatWrapping;


        const materialCube = new THREE.ShaderMaterial( {

            uniforms: uniformsCube,
            vertexShader: vertexShader3,
            fragmentShader: fragmentShader3

        } );

        const meshCube = new THREE.Mesh( geometryCube, materialCube );

        meshCube.position.y = 60;
        scene.add( meshCube );

        meshCube.scale.x = 20; // SCALE
        meshCube.scale.y = 20; // SCALE
        meshCube.scale.z = 20; // SCALE

    


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

       
        renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

        renderer.setSize(window.innerWidth/1.2, window.innerHeight/1.2);

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
            renderer.setSize( window.innerWidth/1.5, window.innerHeight/1.5 );

            uniforms.u_resolution.value.x = renderer.domElement.width;
            uniforms.u_resolution.value.y = renderer.domElement.height;
        }

        function onMouseMove( event ) {

            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            uniforms.u_mouse.value.x = ( event.clientX / window.innerWidth );
            uniforms.u_mouse.value.y = ( 1-(event.clientY) / window.innerHeight);
            uniforms3.u_mouse.value.x = ( event.clientX / window.innerWidth );
            uniforms3.u_mouse.value.y = ( 1-(event.clientY) / window.innerHeight);

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
            mesh.material.uniforms.cameraPos.value.copy( camera.position );
            render();

        }

        function render() {

            const delta = clock.getDelta();

            uniformsCube[ 'time' ].value = clock.elapsedTime*2;

    

                meshCube.rotation.y += delta * 0.5 * ( i % 2 ? 1 : - 1 );
                meshCube.rotation.x += delta * 0.5 * ( i % 2 ? - 1 : 1 );

            


            material.uniforms.threshold.value  += direction * 0.01; // increment or decrement by 0.01 based on direction
              if (material.uniforms.threshold.value  >= 0.8) {
                direction = -1; // switch direction to decreasing when value reaches 1
              } else if (material.uniforms.threshold.value  <= 0) {
                direction = 1; // switch direction to increasing when value reaches 0
              }


            uniforms.u_resolution.value.x = canvas.innerWidth;
            uniforms.u_resolution.value.y = canvas.innerHeight;
            uniforms3.u_resolution.value.x = canvas.innerWidth;
            uniforms3.u_resolution.value.y = canvas.innerHeight;
            uniforms.u_time.value += 0.01;
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
        <p className={styles.text} >Use arrow keys to navigate between rooms.</p>

        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://github.com/melismeric/UAL-CodingOne/tree/main/3js/Rooms">Github</a></h6>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://mimicproject.com/code/35ba7369-cd2b-a6c9-1908-a5428e14f325">MIMIC</a></h6>

      </div>
      <canvas style={{display: "flex", margin: "auto", flexDirection: "row", justifyContent: "center"}} ref={canvasRef} />
      <Footer/>
    </div>
  )
}