var demo = (function(){
    var scene=new THREE.Scene(),
        light= new THREE.AmbientLight(0xffffff),        
        camera,
        renderer = new THREE.WebGLRenderer(),
        objectsElement,
        scalingSpeed = 0.03,
        scalingStep = 0;

        function initScene(){
            objectsElement = new Array();
            renderer.setSize( 150, 100 );
        
            document.getElementById("webgl-container").appendChild(renderer.domElement);

            scene.add(light);
                      
            camera = new THREE.PerspectiveCamera(
                    35,
                    window.innerWidth / window.innerHeight,
                    1,
                    1000
                );
                object = new THREE.Object3D();
				scene.add( object );
                var geometry = new THREE.SphereGeometry( 1, 4, 4 );
                for ( var i = 0; i < 100; i ++ ) {
					var material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), flatShading: true } );
					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
					mesh.position.multiplyScalar( Math.random() * 400 );
					mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
					mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
                    object.add( mesh );
                    objectsElement.push(mesh);
				}
            
            camera.position.set( 0, 30, 150 );
            
            scene.add(camera);             
            //loadModel();
            document.addEventListener('mousedown', onDocumentMouseDown, false);
            requestAnimationFrame(render);
            
        };
        function onDocumentMouseDown(event) {
            event.preventDefault();
            var projector = new THREE.Projector();
            var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
            projector.unprojectVector(vector, camera);
            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
            var intersects = raycaster.intersectObjects(objectsElement);
            if (intersects.length > 0) {
                resizeCubeAnimation(intersects[0].object);
               // intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
    }
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

        function resizeObjectAnimation(cube){
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
