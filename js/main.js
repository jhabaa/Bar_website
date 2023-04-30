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


//Si sur mobile, on charge la scene verticale
if (window.innerWidth < window.innerHeight) {
    var scn_file = '/js/back3m.glb';
}
else {
    var scn_file = '/js/back3.glb';
}


var loader = new THREE.GLTFLoader();
loader.load(scn_file, function (gltf) {
    var o = gltf.scene;
    const camera = gltf.cameras[0];
    //get first object in my 3d scene
    const sun = gltf.scene.children[2];
    sun.position.set(0, 0, 0);
    
    var currentLookAt = new THREE.Vector3(0, 0, 0);

    const light = gltf.scene.children[5];
    const light_init_pos = light.position;
    console.log(light);

    const heanlab = gltf.scene.children[6];
    const heanlab_init_pos = heanlab.position;
    console.log(heanlab);
    currentLookAt = heanlab_init_pos;

    const dessert = gltf.scene.children[4];
    const dessert_init_pos = dessert.position;
    console.log(dessert);

    const salad = gltf.scene.children[3];
    const salad_init_pos = salad.position;
    console.log(salad);

    const burger = gltf.scene.children[9];
    const burger_init_pos = burger.position;
    console.log(burger);

    const cameraCenter = new THREE.Vector3(0, 0, 0);
    const cameraHorzLimit = 2;
    const cameraVertLimit = 2;

    o.remove(burger);

    //move camera on z axis
    camera.position.z += 0.5;
    const clip = gltf.animations[0];
    const mixer = new THREE.AnimationMixer(o);
    const action = mixer.clipAction(clip);
    scene.add(o);

    action.setLoop(THREE.LoopRepeat, Infinity);
    action.timeScale = 0.05;



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
        

        camera.position.x = cameraCenter.x + (cameraHorzLimit * mouse.x);

        //get an object in my 3d scene
       camera.position.y = cameraCenter.y + (cameraVertLimit * mouse.y);
       camera.lookAt(currentLookAt); // Assurez-vous que la caméra regarde toujours l'object en focus
    }
    animate()


});

const light = new THREE.AmbientLight(0xffffff, 1)


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


