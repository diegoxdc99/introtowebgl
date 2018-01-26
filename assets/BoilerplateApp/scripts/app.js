var demo = (function(){
    var scene=new THREE.Scene(),
        light= new THREE.AmbientLight(0xffffff),        
        camera,
        renderer = new THREE.WebGLRenderer(),
        box,
        ground,
        controls=null,
        scalingSpeed = 0.03,
        scalingStep = 0,
        clock,
        composer;

        function initScene(){
            
            renderer.setSize( 500, 500 );
        
            document.getElementById("webgl-container").appendChild(renderer.domElement);

            scene.add(light);
                      
            camera = new THREE.PerspectiveCamera(
                    35,
                    window.innerWidth / window.innerHeight,
                    1,
                    1000
                );
            
            camera.position.set( 0, 30, 150 );
            
            scene.add(camera);             
            loadModel();
            document.addEventListener('mousedown', onDocumentMouseDown, false);
            requestAnimationFrame(render);
            
        };
        function onDocumentMouseDown(event) {
            event.preventDefault();
            var projector = new THREE.Projector();
            var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
            projector.unprojectVector(vector, camera);
            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
            var intersects = raycaster.intersectObjects(objects);
    }

        function loadModel(){
            var loader = new THREE.JSONLoader(),
            mesh;
    
            loader.load('Models/gooseFull.js', function (geometry) {
                  var gooseMaterial = new THREE.MeshLambertMaterial({
                   map: THREE.ImageUtils.loadTexture('Texture/goose.jpg')
               });
    
               mesh = new THREE.Mesh(geometry, gooseMaterial);
               mesh.scale.set(50,50,50);
               scene.add(mesh);
            });
        }

        function render() {
                renderer.render(scene, camera); 
                //animateCamera();
               //rotateCube(box);
               // resizeCubeAnimation(box);                
                requestAnimationFrame(render);
        };

        function rotateCube(cube){
            cube.rotation.x += 0.04;
            //cube.rotation.y += 0.02;
            cube.rotation.z += 0.04;
        }

        function resizeCubeAnimation(cube){
            // let valueScale = cube.scale.x;
            // if (isDecrease){
            //     valueScale -= deltaScale;
            //     if (valueScale < limitLowerScale)
            //         isDecrease = false;
            // }
            // else{
            //     valueScale += deltaScale;                
            //     if (valueScale > limitUpperScale)
            //         isDecrease = true;
            // }     
            // cube.scale.set(valueScale,valueScale,valueScale);  
            scalingStep += scalingSpeed;                                    
            var scaleX = 0.5 + Math.abs(Math.sin(scalingStep));
            var scaley = 0.5 + Math.abs(Math.sin(scalingStep));
            var scalez = 0.5 + Math.abs(Math.sin(scalingStep));
            cube.scale.set(scaleX,scaley,scalez); 
        }

        // function convertDegreeToRadians(degree){
        //     return (degree * (Math.PI/180));
        // }

        function animateCamera(){
            if (camera.position.z > 50)
                camera.position.z -= 1;
        }
        
        window.onload = initScene;

})();
