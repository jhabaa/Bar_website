//import * as THREE from  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
//import { GLTFLoader } from "https://cdnjs.cloudflare.com/ajax/libs/three@0.152.0/examples/jsm/loaders/GLTFLoader.js";

var scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', onWindowResize, false);

// Ajoutez une variable pour stocker la position de la souris
const mouse = new THREE.Vector2();

// Ajoutez un gestionnaire d'événements pour détecter le mouvement de la souris
document.addEventListener('mousemove', onDocumentMouseMove, false);

// Charger toutes les catégories
var burgers = document.getElementById("burgers");
var salades = document.getElementById("salades");
var desserts = document.getElementById("desserts");
var boissons = document.getElementById("boissons");
var apropos = document.getElementById("home");
var contact = document.getElementById("contact");

var items = document.querySelectorAll(".item");



// Chargez la texture
const textureLoader = new THREE.TextureLoader();

var loader = new THREE.GLTFLoader();
loader.load("/js/back3.glb", function (gltf) {
    var o = gltf.scene;
    const camera = gltf.cameras[0];

   
    //move camera on z axis
    camera.position.z += 0.5;
    const clip = gltf.animations[0];
    const mixer = new THREE.AnimationMixer(o);
    const action = mixer.clipAction(clip);
    scene.add(o);

    action.setLoop(THREE.LoopRepeat, Infinity);
    action.timeScale = 0.05;


    action.play();

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        mixer.update(delta);
        updateCamera()
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.render(scene, camera)
       
    }
    // Mettez à jour la fonction updateCamera pour déplacer la caméra en fonction de la position de la souris
    function updateCamera() {
        const cameraCenter = new THREE.Vector3(0, 0, 0);
        const cameraHorzLimit = 5;
        const cameraVertLimit = 5;

        camera.position.x = cameraCenter.x + (cameraHorzLimit * mouse.x);
       camera.position.y = cameraCenter.y + (cameraVertLimit * mouse.y);
       camera.lookAt(cameraCenter); // Assurez-vous que la caméra regarde toujours le centre de la scène
    }
    animate()


});

const light = new THREE.AmbientLight(0xffffff, 1)

//scene.add(light);


//set up mouse stuff
//document.addEventListener('mousemove', onDocumentMouseMove, false);


// Mettez à jour la fonction onDocumentMouseMove pour normaliser les coordonnées de la souris
function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


//buttons actions
var btn = document.getElementById("back_btn");
btn.addEventListener("click", () => {
    items.forEach(item => {
        if(item.classList.contains("current")) {
            console.log("current");
            item.classList.toggle("current");
        }
        //item.classList.add("hide");
    })
});


//Action des divers elements
items.forEach(item => {
    item.addEventListener("click", () => {
        items.forEach(item => {
            item.classList.toggle("hide");
        });
        item.classList.remove("hide");
        item.classList.toggle("current");

        
    })
});


