


function init(){

    // Les joueurs entrent leurs prenoms
  var N1 = prompt("Veuillez Entrer le Nom du Joueur 1: ");
  document.getElementById("Nom1").textContent = N1;

  var N2 = prompt("Veuillez Entrer le Nom du Joueur 2: ");
  document.getElementById("Nom2").textContent = N2;


  var stats = initStats();
      // creation de rendu et de la taille
  let rendu = new THREE.WebGLRenderer({ antialias: true });
  rendu.shadowMap.enabled = true;
  let scene = new THREE.Scene();   
  let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  rendu.shadowMap.enabled = true;
  rendu.setClearColor(new THREE.Color(0xFFFFFF));
  rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
  cameraLumiere(scene,camera);
  AnimeCam(camera,1); /// Animation d'introduction
  lumiere(scene);
  //repere(scene);

 //********************************************************
 //
 //  P A R T I E     G E O M E T R I Q U E
 //
 //********************************************************


 
 //********************************************************
 // D E B U T     B O U L E
 //********************************************************

 let R=0.5;
 let nbeParallel = 100;
 let nbeMeridien = 60 ;
  
  function BouBoule_Magique(Coul_Courbe, Coul_Boule){
    

    let sphereGeom = new THREE.SphereGeometry (R, nbeParallel, nbeMeridien);

    let MaterialPhong1= new THREE.MeshPhongMaterial({
      color: Coul_Boule, // couleur de l'objet
      specular:"#FFFFFF", //couleur speculair
      flatShading: true,
      shininess:30,//brillance
    });

    let spherePhong1 = new THREE.Mesh(sphereGeom,MaterialPhong1);
    spherePhong1.position.set(0,0,0);
    spherePhong1.castShadow = true;
    spherePhong1.receiveShadow = true;

    // creation de la courbe de tennis

    let TabNadal = Nadal(100);
    let PtsTab=new THREE.BufferGeometry().setFromPoints(TabNadal);
    let ProprieteCbe = new THREE.LineBasicMaterial( {
      color: Coul_Courbe,
      //color: "#0D21A1", 
      linewidth:2
    });
    let courbePara = new THREE.Line( PtsTab, ProprieteCbe );

    // On insert la courbe (Tennis) et la boule dans un 'Group' pour qu'ils forments un seul unique et même objet
    let spherePhong = new THREE.Group();
    spherePhong.add(spherePhong1,courbePara);
    return spherePhong
  }
  let spherePhong = BouBoule_Magique("#FFFFFF","rgb(0,0,0)");
  scene.add(spherePhong);

 //********************************************************
 // F I N     B O U L E
 //********************************************************





 







 //********************************************************
 // D E B U T     P I S T E
 //********************************************************
  let hauteur = 40;
  let cube = new THREE.BoxGeometry(100,10,hauteur+0.1);
  let MatPhong = new THREE.MeshPhongMaterial({
    color: "rgb(239,188,69)",
    flatShading: true,
    shininess:30,//brillance
    side: THREE.DoubleSide,//2
  });
  let CubePhong = new THREE.Mesh(cube, MatPhong);
  CubePhong.position.set(-15,0,-0.55-hauteur/2);
  scene.add(CubePhong);

 //********************************************************
 // F I N     P I S T E
 //********************************************************












 //********************************************************
 // D E B U T     E N V I R O N N E M E N T
 //********************************************************

 /* Cette partie du code concerne uniquement le décor étant donné que cela n'a pas était demandé
 dans l'énoncé du projet, elle peut donc être sauté */

  //Creation d'une grotte. Notre piste se situera a l'interieur de celle ci

  let sphereGeom2 = new THREE.SphereGeometry (60, nbeParallel, nbeMeridien);
  let cubor = new THREE.BoxGeometry(125,125,125);

  
  const MaterialPhong2= new THREE.MeshPhongMaterial({
    color: "rgb(0,0,0)", // couleur de l'objet
    specular:"#FFFFF0", //couleur speculair
    flatShading: true,
    shininess:1,//brillance
    side: THREE.DoubleSide,//2
  });
  let Kubor = new THREE.Mesh(cubor,MaterialPhong2);
  let spherePhong2 = new THREE.Mesh(sphereGeom2,MaterialPhong2);
  spherePhong2.position.set(0,0,0);
  Kubor.position.set(0,0,0);
  Kubor.castShadow = true;
  Kubor.receiveShadow = true;
  spherePhong2.castShadow = true;
  spherePhong2.receiveShadow = true;
  
  scene.add(spherePhong2);
  scene.add(Kubor);

    //Creation de la Lave 

    /*definition de la taille de la texture : ATTENTION La taille ne doit pas 
    etre inferieur a 20. Cela peut faire ralentir le jeu*/

  let taille_text = 20; 

    /* Pour creer une texture de Lave j'ai utilise les fonctions de "Lave.js" 
    ces dernieres me donne la matrice de la texture et sa palette de couleurs associees*/
  
  let LF = LaveFinale(50,-30,taille_text);
  scene.add(LF);

    //Piliers et bougie

  
  for(let i=-50; i<36; i+=20){
    for(j=-5; j<6; j+=10){
      let p = Pilier();
      let B = Bougie(j);
      let y;
      if(j<0){
        y = 1;
      }
      else{
        y=-1;
      }
      B.position.set(i, y*3.1,5);
      p.position.set(i,j,-7.5);
      scene.add(B);
      scene.add(p);
    }
  }


    // Entree
  
  let Entree = new THREE.BoxGeometry(6,10,15);
  let matentre = new THREE.MeshPhongMaterial({
    color:"#FFFFFF",
    flatShading: true,
    shininess:1,//brillance
    side: THREE.DoubleSide,//2
  })
  let Porte = new THREE.Mesh(Entree, matentre);
  Porte.position.set(-61,0,7);
  scene.add(Porte);
  

 //********************************************************
 // F I N     E N V I R O N N E M E N T
 //********************************************************











 //********************************************************
 // D E B U T     C O U R B E S
 //********************************************************


 /* Creation est insertions de mes courbes présentent sur la piste */

  // definition des points de controles des courbes
  let P0 = new THREE.Vector3(0,0,0);
  let P1 = new THREE.Vector3(6.25,0,0);
  let P2 = new THREE.Vector3(12.5,0,0);
  let P3 = new THREE.Vector3(18.75,0,0);
  let P4 = new THREE.Vector3(25,0,0);
  let nb=50;//nombre de pts par courbe
  let epai=2;//epaisseur de la courbe

  // definition de la courbe de Bezier de degre 2
  let Pt1;
  let Pt2;
  let TabCbe = TraceBezierQuadratique(P0, P1, P2, P3, P4, nb, "#FF0000",epai);
  let cbeBez2 = TabCbe[0];
  let cbeBez1 = TabCbe[1];
  scene.add(cbeBez1);
  scene.add(cbeBez2);

 //********************************************************
 // F I N     C O U R B E S
 //********************************************************












 //********************************************************
 // D E B U T     Q U I L L E
 //********************************************************

  // Creation et Insertion des Quilles dans la scene

  let ToucherBQ = []; // Tableau stockant les noms des quilles qui ont ete touchees par la boule
  let ToucherQQ = []; // Tableau stockant les noms des quilles qui ont ete touchees par une autre quille
  let Alphabet = ['a','b','c','d','e','f','g','h','i','j'];
  let SQ =[]; // Tableau stockant les segments qui representent la trajectoire que suit les quilles touchees
  let name = 1; // Variable qui permettra de donner des noms differents pour chaque quille
  let place = 1.25;
  for(let i=0;i<place*4;i+=place){
    let x = 20+i;
    for(let j=-i;j<=i;j+=place*2){
      let y = j;
      let Q = Quille();
      Q.name = name;
      name++;
      Q.position.set(x,y,-0.5);
      scene.add(Q);
    }
  }

 //********************************************************
 // F I N     Q U I L L E
 //********************************************************












 //********************************************************
 // D E B U T     C O N T R O L E     C A M E R A
 //********************************************************

 // Permet a l'utilisateur de manipuler la camera a l'aide de sa souris

  var controls = new THREE.OrbitControls (camera, rendu.domElement);
  animate();

 //********************************************************
 // F I N     C O N T R O L E     C A M E R A
 //********************************************************









 
 //********************************************************
 //
 // F I N      P A R T I E     G E O M E T R I Q U E
 //
 //********************************************************
 
 //********************************************************
 //
 //  D E B U T     M E N U     G U I
 //
 //********************************************************
 let tour = 1; // compte le nombre de tour dans une partie, soit 1 tour = 2 mènes
 var gui = new dat.GUI();//interface graphique utilisateur
 // ajout du menu dans le GUI
  let menuGUI = new function () {
    this.cameraxPos = camera.position.x;
    this.camerayPos = camera.position.y;
    this.camerazPos = camera.position.z;
    this.cameraxDir = 0;
    this.camerayDir = 0;
    this.camerazDir = 0;
    this.Point_controle = 0;
    this.Point_depart = 0;
    this.Point_arrive = 0;
    this.Jointure = 0;
    this.Segment_Quilles = false;
    
    

    
    //Lance la simulation du lancement de la boule et celle de la partie entre les équipes
    this.Lancement = function () {
      if(tour<3){
        Lance(0);
        setTimeout(traitement,8000);
      }
    }

    

    //pour actualiser dans la scene   
    this.actualisation = function () {
    reAffichage();
    }; // fin this.actualisation

  }; // fin de la fonction menuGUI

  // ajout de la courbe dans le menu
  CourbeGui(gui,menuGUI,scene,P0,P1,P2,P3,P4,cbeBez2,cbeBez1,spherePhong);
  gui.add(menuGUI, "Lancement");
  menuGUI.actualisation();

 //********************************************************
 //
 //  F I N     M E N U     G U I
 //
 //********************************************************

 /* Les variables ci-dessous serviront au bon déroulement de la partie */

let score1=0;
let score1Total1=0;
let score2Total2=0;
let score2=0;
let numTir=0;
let numEquipe=1;
let tabTombees=[false,false,false,false,false,false,false,false,false,false];

 function traitement(){

  /* Cette fonction traite les informations recuperees apres un lance 
  puis elle agis en consequences */

  numTir++;
    if(numEquipe==1){
      
      if(VerifSiToutesTombees()&&numTir==1){

        // l'equipe 1 a fait un Strike

        score1=30;
        score1Total1+=score1;
      }
      else{
        if(VerifSiToutesTombees()&&numTir==2){

          // l'equipe 1 a fait un Spare

          score1=15;
          score1Total1+=score1;
        }
        else{
          if(numTir==2){

            // l'equipe 1 a fait un trou

            for(let i=0;i<tabTombees.length;i++){
              if(tabTombees[i])
                score1++;
            }
            score1Total1+=score1;
          }
        }
      }
      if((VerifSiToutesTombees()||numTir==2)&&tour==1){
        document.getElementById("T1E1").textContent = score1;
        numEquipe=2;
        numTir=0;
        score1=0;
        tabTombees=[false,false,false,false,false,false,false,false,false,false];
        setTimeout(resetPiste,1000);
        scene.remove(spherePhong);
        spherePhong = BouBoule_Magique("rgb(0,0,0)","#FFFFFF");
        scene.add(spherePhong);
        Modification_Tab("#FFFFFF", "#000000");
      }
      else{
        if((VerifSiToutesTombees()||numTir==2)&&tour==2){
          document.getElementById("T2E1").textContent = score1;
          document.getElementById("TTE1").textContent = score1Total1;
          numEquipe=2;
          numTir=0;
          tabTombees=[false,false,false,false,false,false,false,false,false,false];
          setTimeout(resetPiste,1000);
          scene.remove(spherePhong);
          spherePhong = BouBoule_Magique("rgb(0,0,0)","#FFFFFF");
          scene.add(spherePhong);
          Modification_Tab("#FFFFFF", "#000000");
        }
      }
    }
    else{
      
      if(VerifSiToutesTombees()&&numTir==1){

        // l'equipe 2 a fait un Strike

        score2=30;
        score2Total2+=score2;
      }
      else{
        if(VerifSiToutesTombees()&&numTir==2){

          // l'equipe 2 a fait un Spare
  
          score2=15;
          score2Total2+=score2;
        }
        else{
          if(numTir==2){

            // l'equipe 2 a fait un trou
    
            for(let i=0;i<tabTombees.length;i++){
              if(tabTombees[i])
                score2++;
            }
            score2Total2+=score2;
          }
        }
      }
      if((VerifSiToutesTombees()||numTir==2)&&tour==1){
        document.getElementById("T1E2").textContent = score2;
        numEquipe=1;
        numTir=0;
        score2=0;
        tour++;
        setTimeout(resetPiste,1000);
        scene.remove(spherePhong);
      spherePhong = BouBoule_Magique("#FFFFFF","rgb(0,0,0)");
      scene.add(spherePhong);
        tabTombees=[false,false,false,false,false,false,false,false,false,false];
        Modification_Tab("#000000", "#FFFFFF");
      }
      else{
        if((VerifSiToutesTombees()||numTir==2)&&tour==2){
          document.getElementById("T2E2").textContent = score2;
          document.getElementById("TTE2").textContent = score2Total2;
          tour++;  
        setTimeout(resetPiste,1000);
        scene.remove(spherePhong);
        spherePhong = BouBoule_Magique("#FFFFFF","rgb(0,0,0)");
        scene.add(spherePhong);
        tabTombees=[false,false,false,false,false,false,false,false,false,false];
        document.body.style.color="#000000";
        Modification_Tab("#000000", "#FFFFFF");
          setTimeout(Affiche_Gagnant,2000);
        }
      }
    }
 }

 function Modification_Tab(CL1, CL2){
  document.body.style.color=CL1;
  const TD = document.getElementsByTagName("td");
  const TH = document.getElementsByTagName("th");

  for(const T of TD){
    T.style.borderColor = CL2;
  }

  for(const T of TH){
    T.style.borderColor = CL2;
  }
 }

 function Affiche_Gagnant(){

  /*Affiche les resultats de la partie et relance une nouvelle */

  if(score1Total1 > score2Total2)
    alert(N1+" a gagné la partie !! ");
  if(score1Total1 < score2Total2)
    alert(N2+" a gagné la partie !! ");
  if(score1Total1 == score2Total2)
    alert(" Match nul !! ");
  
  Restart();
 }


  function Restart(){

    /*Cette fonction permet de relancer une partie avec de nouveaux joueurs */

        // Les joueurs entrent leurs prenoms
    N1 = prompt("Veuillez Entrer le Nom du Joueur 1: ");
    document.getElementById("Nom1").textContent = N1;

    N2 = prompt("Veuillez Entrer le Nom du Joueur 2: ");
    document.getElementById("Nom2").textContent = N2;

    /*Reinitialisation de toutes les variable */
    score1=0;
    score1Total1=0;
    score2Total2=0;
    score2=0;
    numTir=0;
    numEquipe=1;
    tabTombees=[false,false,false,false,false,false,false,false,false,false];
    tour = 1;

    // reinitialisation du tableau de score

    document.getElementById("T2E2").textContent = "";
    document.getElementById("T1E2").textContent = "";
    document.getElementById("T2E1").textContent = "";
    document.getElementById("T1E1").textContent = "";
    document.getElementById("TTE2").textContent = "";
    document.getElementById("TTE1").textContent = "";
  }


 function VerifSiToutesTombees(){

  /* Cette fonction verifie si les quilles sont toutes tombées
  elle est utilise dans dans les conditions qui vérifie s'il y a
  eu un Strike ou un Spare */

  let ok=true;
  for(let i=0;i<tabTombees.length;i++){
    if(tabTombees[i]==false)
      ok=false;
  }
  return ok;
 }

  renduAnim();
  // ajoute le rendu dans l'element HTML
  document.getElementById("webgl").appendChild(rendu.domElement);
  // affichage de la scene
  rendu.render(scene, camera);

 //********************************************************
 //
 //  F O N C T I O N S     I D O I N E S
 //
 //********************************************************

 function resetPiste(){

  /* Cette fonction est utilisées au moment de changer de tour 
  elle reinitialise la piste pour le prochain tour */

  let ToucherBQ = []; // Tableau stockant les noms des quilles qui ont ete touchees par la boule
  let ToucherQQ = []; // Tableau stockant les noms des quilles qui ont ete touchees par une autre quille
  let Alphabet = ['a','b','c','d','e','f','g','h','i','j'];
  let SQ =[]; // Tableau stockant les segments qui representent la trajectoire que suit les quilles touchees
  let name = 1; // Variable qui permettra de donner des noms differents pour chaque quille
  let place = 1.25;
  for(let i=0;i<place*4;i+=place){
    let x = 20+i;
    for(let j=-i;j<=i;j+=place*2){
      let y = j;
      let Q = Quille();
      Q.name = name;
      name++;
      Q.position.set(x,y,-0.5);
      scene.add(Q);
    }
  }
 }

 function animate(){

    // Anime le controle de la camera via la souris

    controls.update();
    requestAnimationFrame ( animate );  
    rendu.render (scene, camera);
  }

  function Nadal(t){

    // Renvoie les points de la Courbe (Tennis) de la boules. Ces points sont stockes dans un tableau

    let points = new Array(t+1);
    let ep = 0.005;
    for (let k=0;k<= t;k++){
      let a = (3/4)*(R+ep);
      let b = (R+ep)-a;
      let t2= (k*2*Math.PI)/t;
      let x0=a*Math.cos(t2)+ b*Math.cos(3*t2);
      let y0=a*Math.sin(t2)- b*Math.sin(3*t2);
      let z0= 2*Math.sqrt(a*b)*Math.sin(2*t2);
      points[k]= new THREE.Vector3(x0,y0,z0);
    }
    return points
  }

  

  function Collision(Obj1,Obj2){

    // Simule la collision entre deux objets, puis supprime le deuxieme objet de la scene
    // Ici Obj1 designe la boule et Obj2 une des quilles

    let firstBB = new THREE.Box3().setFromObject(Obj1);
    
    let secondBB = new THREE.Box3().setFromObject(Obj2);
    
    if (firstBB.intersectsBox(secondBB)){
      return true;
    }
    return false;
  }

  function Lance(k){

    // Simule le deplacement de la boule en fonctions des courbes de Beziers

    if(k<=100){


      Avance(k);
      for(let i=1;i<11;i++){
        // Parcours les quille dans la scene
        // Verifie si une collision a lieu
        let q = scene.getObjectByName(i);
        if(q!=null){

          


          if(Collision(spherePhong,q)){
            tabTombees[i-1]=true;
            q.name = Alphabet[i];
            ToucherBQ.push(q);
            let Dist = SegQuille(spherePhong,q,1);
            Avance_Quille(Dist[0],Dist[1],q,1);
            
              // On retire du tableau de quille la quille touchee
            //scene.remove(q);
          }
        }
      }
      setTimeout(Lance,20,k+1);
    }
    else{
      spherePhong.position.set(0,0,0);
    }
  }

  function Avance_Quille(X,Y,QT,n){

    // Simule le deplacement des quilles en fonctions de segments generes par SegQuille()

    let Ok = true;
    if (n<=20){
      QT.position.set( QT.position.x + X, QT.position.y + Y,-0.5);
      for(let i=0;i<11;i++){
        // Parcours le tableau de quilles
        // Verifie si une collision a lieu

        for(let j=0;j<ToucherQQ.length;j++){
          
          // Verifie si la quille 'i' a deja ete touche par la boule

          if(i == ToucherQQ[j]){
            Ok = false;
          }
          else{
            Ok = true;
          }
        }

        let q = scene.getObjectByName(i);
        if(q!= null && q.name != QT.name){
          if(Collision(QT,q) && Ok){
            tabTombees[i-1]=true;
            q.name = Alphabet[i];
            ToucherQQ.push(q);
            let Dist = SegQuille(QT,q,2);
            Avance_Quille(Dist[0],Dist[1],q,1);
          }
        }
      }
      setTimeout(Avance_Quille,20,X,Y,QT,n+1);
      
    }
    else{
      scene.remove(QT);
    }
  }

  function SegQuille(Obj1,Obj2,d){

    // Obj1 represente l'objet en mouvement
    // Obj2 represente celui subissant la collision

    let X1 = Obj1.position.x;
    let Y1 = Obj1.position.y;
    let X2 = Obj2.position.x;
    let Y2 = Obj2.position.y;

    let X3 = (X2-X1)/d+X2;
    let Y3 = (Y2-Y1)/d+Y2;

    let pt0 = new THREE.Vector3(X2,Y2,0);
    let pt1 = new THREE.Vector3( X3, Y3, 0);
    let DistX = (X3-X2)/20;
    let DistY = (Y3-Y2)/20;
    segment(scene, pt0, pt1, "#00FF00", 2);
    return [DistX,DistY];

  }



  function segment(MaScene,A,B,CoulHexa,epai){

    // Trace un segment [AB]

    var geometry = new THREE.Geometry();
    geometry.vertices.push(A,B);
    let segAB = new THREE.Line(geometry, new THREE.LineDashedMaterial({
    color: CoulHexa,
    linewidth: epai,
    })); // fin variable segAB
    SQ.push(segAB);
  } // fin fonction segment [AB]


  function Avance(n){

    // Deplace le centre de la boule au niveau des points de la courbe
    // Simule une rotation de la Boule

    if(n<50){
      spherePhong.position.set(Pt1[n].x,Pt1[n].y,0);
      spherePhong.rotation.y += 0.4;
    }
    else{
      spherePhong.position.set(Pt2[n-50].x,Pt2[n-50].y,0);
      spherePhong.rotation.y += 0.4;
    }
 }
 
 

  
 
  function reAffichage() {

    // Reaffiche le rendu de la scene

    setTimeout(function () { 
  
    }, 200);// fin setTimeout(function ()
      // render avec requestAnimationFrame
    rendu.render(scene, camera);

  }// fin fonction reAffichage()

 
  function renduAnim() {
    stats.update();
    // render avec requestAnimationFrame
    requestAnimationFrame(renduAnim);
    // ajoute le rendu dans l'element HTML
    rendu.render(scene, camera);
  }


  function TraceBezierQuadratique(P0, P1, P2, P3, P4, nbPts,coul,epaiCbe){

    // Creation et Renvoie des deux courbes de Beziers dans la scene

    let cbeBe2 = new THREE.QuadraticBezierCurve3 (P0, P1, P2 );
    let cbeBe1 = new THREE.QuadraticBezierCurve3 (P2, P3, P4 );

    //Propriete geometrique de la courbe
    let cbeGeometry2 = new THREE.Geometry();
    let cbeGeometry1 = new THREE.Geometry();

    // Points de la courbe de Bezier
    cbeGeometry2.vertices = cbeBe2.getPoints(nbPts);
    cbeGeometry1.vertices = cbeBe1.getPoints(nbPts);
    Pt1 = cbeGeometry2.vertices;
    Pt2 = cbeGeometry1.vertices;

    //Aspect de la courbe
    let material = new THREE.LineBasicMaterial({
      color : coul ,
      linewidth: epaiCbe
    } );

    // Courbe de Bezier avec les proprietes geometriques et l aspect
    let CB2 = new THREE.Line( cbeGeometry2, material );
    let CB1 = new THREE.Line( cbeGeometry1, material );

    //Renvoi de la courbe pour une utilisation ulterieure
    return [CB2,CB1];

  } //fin de la fonction TraceBezierQuadratique


  function CourbeGui(gui,menuGUI,scene,P0,P1,P2,P3,P4,cbeBez2,cbeBez1,spherePhong){

    // Ajout des courbes dans le menu  GUI
    
    let TabCbeb;
    let marge = 4.5;
    let guiCourbe = gui.addFolder("Courbes de Bezier");

    guiCourbe.add(menuGUI,"Point_controle",-marge,marge).onChange(function () {
      if (cbeBez1) scene.remove(cbeBez1);
      if (cbeBez2) scene.remove(cbeBez2);
        P1.setComponent(1,menuGUI.Point_controle); // on modifie la coordonnee y du point
        P3.setComponent(1,menuGUI.Point_controle*(-1));
        TabCbeb = TraceBezierQuadratique(P0, P1, P2, P3, P4, nb, "#FF0000",epai);
        cbeBez2 = TabCbeb[0];
        cbeBez1 = TabCbeb[1];
        scene.add(cbeBez1);
        scene.add(cbeBez2);
    });

    guiCourbe.add(menuGUI,"Point_depart",-marge,marge).onChange(function () {
      if (cbeBez1) scene.remove(cbeBez1);
      if (cbeBez2) scene.remove(cbeBez2);
        P0.setComponent(1,menuGUI.Point_depart);
        TabCbeb = TraceBezierQuadratique(P0, P1, P2, P3, P4, nb, "#FF0000",epai);
        cbeBez2 = TabCbeb[0];
        cbeBez1 = TabCbeb[1];
        scene.add(cbeBez1);
        scene.add(cbeBez2);
    });

    guiCourbe.add(menuGUI,"Point_arrive",-marge,marge).onChange(function () {
      if (cbeBez1) scene.remove(cbeBez1);
      if (cbeBez2) scene.remove(cbeBez2);
        P4.setComponent(1,menuGUI.Point_arrive);
        TabCbeb = TraceBezierQuadratique(P0, P1, P2, P3, P4, nb, "#FF0000",epai);
        cbeBez2 = TabCbeb[0];
        cbeBez1 = TabCbeb[1];
        scene.add(cbeBez1);
        scene.add(cbeBez2);
    });

    gui.add(menuGUI,'Segment_Quilles').onChange(function (e) {
      if (!e){
        if(SQ != []){
          for(let i=0;i<SQ.length;i++){
            scene.remove(SQ[i]);
          }
        }
      }
      else {
        if(SQ != []){
          for(let i=0;i<SQ.length;i++){
            scene.add(SQ[i]);
          }
        }
      }
    });//fin cochage 
  }//fin de la fonction CourbeGui

} 

//********************************************************
//
//  F I N     D E     L A     F O N C T I O N      I N I T
//
//*******************************************************




function latheBez3(nbePtCbe,nbePtRot,P0,P1,P2,P3,coul){

  // Fonction qui cree une lathe en fonction des points de controle de sa courbe

  let MatPhong = new THREE.MeshPhongMaterial({
    color: coul,
    flatShading: true,
    shininess:30,//brillance
    side: THREE.DoubleSide,//2
  })
  let p0= new THREE.Vector2(P0.x,P0.y);
  let p1= new THREE.Vector2(P1.x,P1.y);
  let p2= new THREE.Vector2(P2.x,P2.y);
  let p3= new THREE.Vector2(P3.x,P3.y);
  let Cbe3 = new THREE.CubicBezierCurve(p0,p1,p2,p3);
  let points = Cbe3.getPoints(nbePtCbe);
  let latheGeometry = new THREE.LatheGeometry(points,nbePtRot,0,2*Math.PI);
  let lathe = new THREE.Mesh(latheGeometry, MatPhong);
  return lathe;
}// fin latheBez3


function Quille(){

  // Creation d'un objet Quille

  let nbPtCB=50;//nombre de points sur la courbe de Bezier
  let nbePtRot=150;// nbe de points sur les cercles

    //lathe1 : Haut de la Quille
  let a0 = new THREE.Vector3(1/3,5/3,0);
  let a1 = new THREE.Vector3(-0.5/3,6/3,0);
  let a2 = new THREE.Vector3(1.5/3,7/3,0);
  let a3 = new THREE.Vector3(0,7.3/3,0);
  let lathe1 = latheBez3(nbPtCB,nbePtRot,a0,a1,a2,a3,"#EB1919");

    //lathe2 : Milieu de la Quille
  let b0 = new THREE.Vector3(1/3,1/3,0);
  let b1 = new THREE.Vector3(1.5/3,2.5/3,0);
  let b2 = new THREE.Vector3(2.5/3,4/3,0);
  let b3 = new THREE.Vector3(1/3,5/3,0);
  let lathe2 = latheBez3(nbPtCB,nbePtRot,b0,b1,b2,b3,"#FFFFFF");

    //lathe3 : Bas de la Quille
  let c0 = new THREE.Vector3(0,0,0);
  let c1 = new THREE.Vector3(1/3,-0.5/3,0);
  let c2 = new THREE.Vector3(0.95/3,0.85/3,0);
  let c3 = new THREE.Vector3(1/3,1/3,0);
  let lathe3 = latheBez3(nbPtCB,nbePtRot,c0,c1,c2,c3,"#FFFFFF");

  let Grouplathe = new THREE.Group();
  Grouplathe.add(lathe1);
  Grouplathe.add(lathe2);
  Grouplathe.add(lathe3);
  Grouplathe.rotateX(Math.PI/2);
  return Grouplathe;
}

function Lave(taille){

  // Creation de bloc de lave

  let Matrice = MatLave();
  let pixel = taille/10;
  let Palette = CoulLave();
  let Lava = []; // Liste de cubes
  let Text = new THREE.Group();

  for(let i=0; i<10;i++){
    //Parcours les lignes de la matrice 
    for(let j=0; j<10;j++){
      //Parcours les colonnes de la matrice
      let c = Matrice[i][j];

      for(let u=0; u<10; u++){
        //Parcours les differentes couleurs de la Palette
        if(c == u+1){
          let cube = new THREE.BoxGeometry(pixel, pixel,0.1);
          let MatPhong = new THREE.MeshPhongMaterial({
            color: Palette[c],
            side: THREE.DoubleSide,//2
          })
          let CubeLave = new THREE.Mesh(cube, MatPhong);
          CubeLave.position.set(pixel*i, pixel*j, 0);
          Lava.push(CubeLave);
        }
      }
    }
  }

  for(let x=0; x<Lava.length; x++){
    Text.add(Lava[x]);
  }
  
  return Text;
}

function LaveFinale(rayon, pos, taille){

  /* Creation et repartition des blocs de lave en fonction de la taille
  du cercle que l'on souhaite recouvrir */

  let Fin = new THREE.Group();

  for(let x= -rayon+1; x<rayon; x+=taille){
    for(let y= -rayon+1; y<rayon; y+=taille){
      let CarreLave = Lave(taille);
      CarreLave.position.set(x,y,pos);
      Fin.add(CarreLave);
    }
  }

  return Fin;
}

function Pilier(){

  const geometry = new THREE.CylinderGeometry( 1.5, 1.5, 55, 32 );
  let MatPhong = new THREE.MeshPhongMaterial({
    color: "rgb(239,188,69)",
    flatShading: true,
    shininess:20,//brillance
  });
  const cylinder = new THREE.Mesh( geometry, MatPhong );
  cylinder.position.set(0,0,0);
  cylinder.rotateX(Math.PI/2);

  let cube = new THREE.BoxGeometry(3,3,1);
  let C = new THREE.Mesh(cube,MatPhong);
  C.position.set(0,0,27.5);

  let G = new THREE.Group();
  G.add(cylinder, C);

  return G;
}

function Bougie(c){

  let matpiece = new THREE.MeshPhongMaterial({
    color: "#606060"
  });
  let matboug = new THREE.MeshPhongMaterial({
    color: "#FFFFFF"
  });

  let piece1 = new THREE.BoxGeometry(0.1,0.5,0.1);
  let pi1 = new THREE.Mesh(piece1,matpiece);

  if(c<0){
    // bougie pour les piliers de gauche
    pi1.position.set(0,0.2,0);
  }
  else{
    // bougie pour les piliers de droite
    pi1.position.set(0,-0.2,0);
  }

  let piece2 = new THREE.BoxGeometry(0.1,0.1,0.2);
  let pi2 = new THREE.Mesh(piece2,matpiece);
  pi2.position.set(0,0,0.05);

  let piece3 = new THREE.BoxGeometry(0.4,0.4,0.2);
  let pi3 = new THREE.Mesh(piece3,matpiece);
  pi3.position.set(0,0,0.25);

  let boug = new THREE.CylinderGeometry(0.1, 0.1, 1, 20);
  let B = new THREE.Mesh(boug, matboug);
  B.rotateX(Math.PI/2);
  B.position.set(0,0,0.8);

  let flame = new THREE.SphereGeometry(0.1,20,10);
  let matflame = new THREE.MeshPhongMaterial({
    color:"#FFFF00"
  })
  let bouboule = new THREE.Mesh(flame,matflame);
  bouboule.position.set(0,0,1.4);

  let L = new THREE.Group();
  L.add(pi1, pi2, pi3, B, bouboule);

  return L;

}
