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
            
            renderer.setSize( 150, 100 );
        
            document.getElementById("webgl-container").appendChild(renderer.domElement);

            scene.add(light);
                      
            camera = new THREE.PerspectiveCamera(
                    35,
                    window.innerWidth / window.innerHeight,
                    1,
                    1000
                );
            
            camera.position.set( 0, 0, 100 );
            
            scene.add(camera);  

            box = new THREE.Mesh(
              new THREE.CubeGeometry(
                20,
                20,
                20),
              new THREE.MeshBasicMaterial({color: 0xFF0000}));
            
            box.position.set(0,0,0);

            var childBox = new THREE.Mesh(
                new THREE.CubeGeometry(19, 19, 19),
                new THREE.MeshBasicMaterial({color: 0x00FF00}));
            
            childBox.position.set(0,0,0);
            childBox.rotation.x = 0.785398;

            camera.lookAt(new THREE.Vector3(0,0,0));

            box.add(childBox)
            scene.add(box);          

            composer = new THREE.EffectComposer( renderer );
            composer.addPass( new THREE.RenderPass( scene, camera ) );

            glitchPass = new THREE.GlitchPass();
            glitchPass.renderToScreen = true;
            composer.addPass( glitchPass );

            requestAnimationFrame(render);
            
        };

        function render() {
               // renderer.render(scene, camera); 
                //animateCamera();
                rotateCube(box);
                resizeCubeAnimation(box);                
                requestAnimationFrame(render);
                var time = Date.now();
                composer.render();
                
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
