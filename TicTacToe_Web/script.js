//page de chargement
window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none";
    }, 1500); // 1,5 secondes
});


// variables:
const combinaisonsGagnantes = [
        ["p1", "p2", "p3"], // _ 1
        ["p4", "p5", "p6"], // _ 2
        ["p7", "p8", "p9"], // _ 3
        ["p1", "p4", "p7"], // | 1
        ["p2", "p5", "p8"], // | 2
        ["p3", "p6", "p9"], // | 3
        ["p1", "p5", "p9"], // /
        ["p3", "p5", "p7"]  // \
];

let isPlayer1 =  true


// fonctions:
function majJoueur() {
    if(isPlayer1 ===  true){
        isPlayer1 = false
        console.log(isPlayer1 ? "Joueur 1 (X)" : "Joueur 2 (O)")
        document.getElementById("dialogue").innerText = "Au joueur O de jouer";
        document.getElementById("dialogue").style.color='blue';
        
    }else if(isPlayer1 ===  false){
        isPlayer1 = true
        console.log(isPlayer1 ? "Joueur 1 (X)" : "Joueur 2 (O)")
        document.getElementById("dialogue").innerText = "Au joueur X de jouer";
        document.getElementById("dialogue").style.color='red';
    }


    return(isPlayer1)
}


function verifierVictoire() {
    for (let combinaison of combinaisonsGagnantes) {
      const [a, b, c] = combinaison;
      const cellA = document.getElementById(a);
      const cellB = document.getElementById(b);
      const cellC = document.getElementById(c);
  
    if (cellA.classList.contains("x") && cellB.classList.contains("x") && cellC.classList.contains("x")) {
        afficherLigneVictoire(combinaison, "x");
        return "X";
    }
  
      if (cellA.classList.contains("o") && cellB.classList.contains("o") && cellC.classList.contains("o")) {
        afficherLigneVictoire(combinaison, "o");
        return "O";
    }
    }
    return null; // personne n’a gagné
}


function afficherLigneVictoire(combinaison, gagnant) {
    // Applique la couleur en fonction du gagnant
    const ligne = document.getElementById("ligneVictoire");

    if (gagnant === "x") {
        ligne.style.setProperty('--couleur-victoire', '#d91400');
        ligne.style.setProperty('--ombre-victoire', 'rgba(255, 0, 0, 0.6)');
    } else if (gagnant === "o") {
        ligne.style.setProperty('--couleur-victoire', '#176feb');
        ligne.style.setProperty('--ombre-victoire', 'rgba(23, 111, 235, 0.6)');
    }

    const grille = document.getElementById("grid-morpion");

    const rectGrille = grille.getBoundingClientRect();
    const cell1 = document.getElementById(combinaison[0]);
    const cell2 = document.getElementById(combinaison[2]);

    const rect1 = cell1.getBoundingClientRect();
    const rect2 = cell2.getBoundingClientRect();

    // Calcul centre de cell1 et cell2
    const centerX1 = rect1.left + rect1.width / 2;
    const centerY1 = rect1.top + rect1.height / 2;
    const centerX2 = rect2.left + rect2.width / 2;
    const centerY2 = rect2.top + rect2.height / 2;

    // Soustraction par rapport au coordonés du grid
    const relativeX1 = centerX1 - rectGrille.left;
    const relativeY1 = centerY1 - rectGrille.top;

    const longueur = Math.hypot(centerX2 - centerX1, centerY2 - centerY1);
    const angle = Math.atan2(centerY2 - centerY1, centerX2 - centerX1) * 180 / Math.PI;

    ligne.style.width = `${longueur}px`;
    ligne.style.left = `${relativeX1}px`;
    ligne.style.top = `${relativeY1}px`;
    ligne.style.transform = `rotate(${angle}deg)`;
    ligne.style.display = "block";

    // animation
    ligne.style.transition = "none"; // désactive les transitions 
    ligne.style.width = `0px`;
    ligne.style.left = `${relativeX1}px`;
    ligne.style.top = `${relativeY1}px`;
    ligne.style.transform = `rotate(${angle}deg)`;
    ligne.style.display = "block";



// A changer:

    let correctionX = 0;
    let correctionY = 0;

    const angleRadian = Math.atan2(centerY2 - centerY1, centerX2 - centerX1);

    // Décalage compensatoire de moitié de l’épaisseur visible (5px)
    const offset = 3;

    if (Math.abs(angleRadian) < 0.01) {
        // ligne _
        correctionY = -offset;
    } else if (Math.abs(Math.abs(angleRadian) - Math.PI / 2) < 0.01) {
        // ligne |
        correctionX = -offset;
    } else {
        // diagonales : pas de correction 
    }

    ligne.style.left = `${relativeX1 + correctionX}px`;
    ligne.style.top = `${relativeY1 + correctionY}px`;




    // lance animation
    setTimeout(() => {
        ligne.style.transition = "width 0.5s ease";
        ligne.style.width = `${longueur}px`;
    }, 10);
}




function lancerJeu() {
    
    console.log("jeu démarré")

    // Initialisations
    let i = 0
    isPlayer1 =  true
    let finDePartie = false

    let allPo = document.querySelectorAll(".cell");
    document.getElementById("dialogue").innerText = "Au joueur X de jouer";

  

    allPo.forEach(cell => {
        cell.innerHTML = "";
    });
    

    //boucle de jeu
    allPo.forEach(cell => {
        cell.addEventListener("click", () => {
            if (finDePartie){
                return
            }
            if (cell.innerHTML === "") {
                if (isPlayer1) {
                    cell.innerHTML = '<img src="img/X.png" alt="" class="symbole" style="width: 100px; height: 100px;">';
                    cell.classList.add("x");
                } else {
                    cell.innerHTML = '<img src="img/O.png" alt="" class="symbole" style="width: 100px; height: 100px;">';
                    cell.classList.add("o");
                }

                const gagnant = verifierVictoire();

                if (gagnant) {
                finDePartie = true;
                document.getElementById("dialogue").innerText = `${gagnant} a gagné ! 🎉`;
                return;
                }
                majJoueur()
            }else{
                console.log("erreur negga")
            }
        });
    });
    
    let btnrejouer = document.querySelector(".rejouer")
        btnrejouer.addEventListener("click", () => {
            console.log("rejouer")
            document.querySelectorAll(".cell").forEach(cell => {
                cell.innerHTML = "";
                cell.classList.remove("x", "o");
            });
            btnrejouer.classList.add("spin");
            btnrejouer.addEventListener("animationend", () => {
            btnrejouer.classList.remove("spin");
            }, { once: true });
            
            // réinitialisation du dialogue + suppresion de la ligne
            document.getElementById("dialogue").innerText = "Au joueur X de jouer";
            document.getElementById("dialogue").style.color='red';
            document.getElementById("ligneVictoire").style.display = "none";

            // réinitialisation des variables 
            isPlayer1 = true;
            finDePartie = false;
    });
               
}
