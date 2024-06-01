
  
 function cameraLumiere(scene,camera){   // creation de la camera 
  camera.up = new THREE.Vector3( 0, 0, 1 );
  var xPos=-10;
  //modification de la jauge si document.forms["controle"].PosX.value;
  var yPos=0;//document.forms["controle"].PosY.value;//*document.forms["controle"].zoom.value;
  var zPos=5;//document.forms["controle"].PosZ.value;//*document.forms["controle"].zoom.value;
  var xDir=20;//document.forms["controle"].DirX.value;
  var yDir=0;//document.forms["controle"].DirY.value;
  var zDir=0;//testZero(document.forms["controle"].DirZ.value);
  camera.position.set(xPos, yPos, zPos);
  camera.lookAt(xDir, yDir, zDir);
    //camera.lookAt(scene.position);
    //camera.lookAt(new THREE.Vector3(0,0,0));
} // fin fonction cameraLumiere
 
function AnimeCam(camera,i){
  if(i<101){
    camera.position.set(-60-1.4*i,0, 250-2.4*i);
    //setTimeout(AnimeCam,-200,camera,i+1);
  }
  if(i<201 && i>100){
    let j = i-100;
    camera.position.set(-200+1.9*j,0, 10);
    //setTimeout(AnimeCam,-400+0.05*j,camera,i+1);
  }
  setTimeout(AnimeCam,40,camera,i+1);
}

 
//*************************************************************
//* 
//        F I N     C A M E R A
//
//*************************************************************

 function lumiere(scene){
    let lumPt = new THREE.PointLight("#241704");
    lumPt.position.set(3,3,-3);
    lumPt.intensity = 1;
    lumPt.shadow.camera.far=2000;
    lumPt.shadow.camera.near=0;
    scene.add(lumPt);

      //lumière de la lave à droite de la piste
    let lumPt1 = new THREE.PointLight("#FF9D09");
    lumPt1.castShadow = true;
    lumPt1.shadow.camera.far=2000;
    lumPt1.shadow.camera.near=0;
    lumPt1.position.set(5,-15,-15);
    lumPt1.intensity = 1;
    scene.add(lumPt1);

    

      //lumière de la lave à gauche de la piste
    let lumPt2 = new THREE.PointLight("#FF9D09");
    lumPt2.castShadow = true;
    lumPt2.shadow.camera.far=2000;
    lumPt2.shadow.camera.near=0;
    lumPt2.position.set(5,15,-15);
    lumPt2.intensity = 1;
    scene.add(lumPt2);

    let lumPt4 = new THREE.PointLight("#FF9D09");
    lumPt4.castShadow = true;
    lumPt4.shadow.camera.far=2000;
    lumPt4.shadow.camera.near=0;
    lumPt4.position.set(0,0,59);
    lumPt4.intensity = 0.2;
    scene.add(lumPt4);

    let lumPt5 = new THREE.PointLight("#FFFFFF");
    lumPt5.castShadow = true;
    lumPt5.shadow.camera.far=2000;
    lumPt5.shadow.camera.near=0;
    lumPt5.position.set(-70,0,15);
    lumPt5.intensity = 0.5;
    scene.add(lumPt5);

}// fin fonction lumiere
