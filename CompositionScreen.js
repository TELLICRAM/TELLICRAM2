/* ==================================================================================== */
/* ==================================================================================== */
/* =================               Variables globales                ================== */
/* ==================================================================================== */
/* ==================================================================================== */

var itemsList = [];	// Tableau en mémoire : liste de référence des éléments :
					//    1 ->  3  : N° page, ou 000 pour barre d'action
					//    4        : _
					//    5 ->  8  : 'PAGE' pour en-tête de page, 0000 pour nav, ou N° bloc, ou 9999 pour footer
					//    9        : _
					//   10 -> 39  : Code (nom) du bloc
					
var item = '';		// string utilisé pour composer l'item


var numPage 	 	= 0;		// compteur du n° de page, 
var numPagePad		= "000";	// idem, paddé sur 3 caractères	
								
var totalPages 	 	= 0;		// nombre de pages réellement présentes

var pagesTable 	 	= [];		// Tableau des n° de page présentes 
var navPanTable		= [];		// Tableau de présence des Navigation Panels
var footerTable		= [];		// Tableau de présence des Footers

var selectedPage 	= "000";	// n° de la page courante (sélectionnée par l'utilisateur(compteur numPage)
var	indexPage	 	= -1;		// Index de tableau de la page courante


/* Valeurs par défaut des couleurs de schéma */
/* ----------------------------------------- */
var titleBarDefaultColor	= "#0A7398";	// blue05	0A7398	
var actionBarDefaultColor	= "#FFFFFF";	// white	FFFFFF	
var tabDefaultColor			= "#FFFFFF";	// white	FFFFFF
var selectedTabDefaultColor	= "#C5D9EC";	// blue02 	C5D9EC
var navPanDefaultColor		= "#444455";	// grey07	444455
var blocksAreaDefaultColor	= "#0A7398";	// blue05  	0A7398
var blockDefaultColor		= "#FFFFFF";	// white	FFFFFF
var footerDefaultColor		= "#888888";	// grey04	888888

/* Valeurs courantes des couleurs de schéma */
/* ---------------------------------------- */
var titleBarColor	= "";
var actionBarColor	= "";
var tabColor		= "";
var selectedTabColor= "";
var navPanColor		= "";
var blocksAreaColor	= "";
var blockColor		= "";
var footerColor		= "";

/* Valeurs par défaut des noms d'items */
/* ----------------------------------- */
var actionBarDefaultName	= "Action_bar";	
var pageDefaultName			= "MyPage_&p";	
var blockDefaultName		= "Page_&p-Block_&b";	
var navPanDefaultName		= "NavPan_&p";
var footerDefaultName		= "Footer_&p";

/* Valeurs courantes des noms d'items */
/* ---------------------------------- */
var actionBarName	= "";	
var pageName		= "";	
var blockName		= "";	
var navPanName		= "";
var footerName		= "";

var transactionBidonName = "My first coloured screen";	// Sera passé en paramètre d'appel de la transaction par la suite


/* ==================================================================================== */
/* ==================================================================================== */
/* ==========      Fonction appelée à l'ouverture de la page				 ========== */
/* ==================================================================================== */
/* ==================================================================================== */


(function(){
		
	document.getElementById("titleBarBlock").addEventListener("load", initScreen(event), false);
		
function initScreen()
{
	console.log("initScreen : Récupération valeurs par défaut");
		
// Récupération des valeurs par défaut des couleurs de schéma		// S'il y a une valeur stockée en mémoire, on la récupère
// ----------------------------------------------------------		// Sinon, on prend la valeur par défaut et on la stocke en mémoire

	if (localStorage.getItem("titleBarColorLS")) {				
		titleBarColor = localStorage.getItem("titleBarColorLS");
	} else {								
		titleBarColor = titleBarDefaultColor;
		localStorage.setItem("titleBarColorLS", titleBarDefaultColor);
	}

	if (localStorage.getItem("actionBarColorLS")) {			
		actionBarColor = localStorage.getItem("actionBarColorLS");	
	} else {						
		actionBarColor = actionBarDefaultColor;
		localStorage.setItem("actionBarColorLS", actionBarDefaultColor);	
	}

	if (localStorage.getItem("tabColorLS")) {
		tabColor = localStorage.getItem("tabColorLS");	
	} else {														
		tabColor = tabDefaultColor;							
		localStorage.setItem("tabColorLS", tabDefaultColor);	
	}
	
	if (localStorage.getItem("selectedTabColorLS")) {	
		selectedTabColor = localStorage.getItem("selectedTabColorLS");		
	} else {														
		selectedTabColor = selectedTabDefaultColor;			
		localStorage.setItem("selectedTabColorLS", selectedTabDefaultColor);
	}
	
	if (localStorage.getItem("navPanColorLS")) {			
		navPanColor = localStorage.getItem("navPanColorLS");		
	} else {							
		navPanColor = navPanDefaultColor;
		localStorage.setItem("navPanColorLS", navPanDefaultColor);
	}
	
	if (localStorage.getItem("blocksAreaColorLS")) {		
		blocksAreaColor = localStorage.getItem("blocksAreaColorLS");		
	} else {												
		blocksAreaColor = blocksAreaDefaultColor;	
		localStorage.setItem("blocksAreaColorLS", blocksAreaDefaultColor);
	}
	
	if (localStorage.getItem("blockColorLS")) {			
		blockColor = localStorage.getItem("blockColorLS");		
	} else {															
		blockColor = blockDefaultColor;							
		localStorage.setItem("blockColorLS", blockDefaultColor);
	}
	
	if (localStorage.getItem("footerColorLS")) {	
		footerColor = localStorage.getItem("footerColorLS");		
	} else {												
		footerColor = footerDefaultColor;						
		localStorage.setItem("footerColorLS", footerDefaultColor);
	}
	
	document.getElementById("titleBarColorField").value 	= titleBarColor;
	document.getElementById("actionBarColorField").value 	= actionBarColor;
	document.getElementById("tabColorField").value 			= tabColor;
	document.getElementById("selectedTabColorField").value 	= selectedTabColor;
	document.getElementById("navPanColorField").value 		= navPanColor;
	document.getElementById("blocksAreaColorField").value 	= blocksAreaColor;
	document.getElementById("blockColorField").value 		= blockColor;
	document.getElementById("footerColorField").value 		= footerColor;
	
//	Colorisation barre de titre & item transaction
// -----------------------------------------------
	document.getElementById("schemaTitleBarBlock").style.backgroundColor = titleBarColor;
	document.getElementById("itemTransactionBlock").style.backgroundColor = titleBarColor;
	
//	Colorisation de la Main Area par défaut       
// -----------------------------------------------
	document.getElementById("schemaBlocksAreaInitBlock").style.backgroundColor = blocksAreaColor;


// Récupération des valeurs par défaut des noms d'éléments
// -------------------------------------------------------

	if (localStorage.getItem("actionBarNameLS")) {				
		actionBarName = localStorage.getItem("actionBarNameLS");
	} else {								
		actionBarName = actionBarDefaultName;
		localStorage.setItem("actionBarNameLS", actionBarDefaultName);
	}

	if (localStorage.getItem("pageNameLS")) {				
		pageName = localStorage.getItem("pageNameLS");
	} else {								
		pageName = pageDefaultName;
		localStorage.setItem("pageNameLS", pageDefaultName);
	}
	
	if (localStorage.getItem("blockNameLS")) {				
		blockName = localStorage.getItem("blockNameLS");
	} else {								
		blockName = blockDefaultName;
		localStorage.setItem("blockNameLS", blockDefaultName);
	}

	if (localStorage.getItem("navPanNameLS")) {				
		navPanName = localStorage.getItem("navPanNameLS");
	} else {								
		navPanName = navPanDefaultName;
		localStorage.setItem("navPanNameLS", navPanDefaultName);
	}

	if (localStorage.getItem("footerNameLS")) {				
		footerName = localStorage.getItem("footerNameLS");
	} else {								
		footerName = footerDefaultName;
		localStorage.setItem("footerNameLS", footerDefaultName);
	}

	document.getElementById("actionBarNameField").value = actionBarName;
	document.getElementById("pageNameField").value 		= pageName;
	document.getElementById("blockNameField").value 	= blockName;
	document.getElementById("navPanNameField").value 	= navPanName;
	document.getElementById("footerNameField").value 	= footerName;


// Récupération du nom de la transaction
// -------------------------------------
	if (localStorage.getItem("transactionNameLS")) {				
		transactionName = localStorage.getItem("transactionNameLS");
	} else {								
		transactionName = transactionBidonName;
		localStorage.setItem("transactionNameLS", transactionBidonName);
	}

	document.getElementById("schemaTitleBarBlock").firstChild.nodeValue = transactionName;	// Schéma
	document.getElementById("itemTransactionInputField").value = transactionName;			// Volet des items
}

})();


/* ==================================================================================== */
/* ==================================================================================== */
/* ==========  Actions sur les boutons de la barre de titre					 ========== */
/* ==================================================================================== */
/* ==================================================================================== */

function iconHomeProcessing()	// Home
	{alert('Vous avez appuyé sur le bouton Home');}

function iconUndoProcessing()	// Undo
	{alert('Vous avez appuyé sur le bouton Undo');}

function iconRedoProcessing()	// Redo
	{alert('Vous avez appuyé sur le bouton Redo');}

function wrongClickProcessing()	// Clic erroné sur zone de titre
	{alert('Economisez votre souris : Cela ne sert à rien de cliquer ici');}

function traitementValidation()	// Validation
	{alert('TODO Action sur le bouton Validation');}

/* ==================================================================================== */
/* SETTINGS	 		 																	*/
/* ==================================================================================== */

/* ------------------------------------------------------------------------------------ */
/* Afficher / Masquer la fenêtre	 		 												*/
/* ------------------------------------------------------------------------------------ */

function iconSettingsProcessing()	
{
	document.getElementById("settingsWindow").style.display='flex';		// Rendre la fenêtre visible
	document.getElementById("greyShadowWindow").style.display='flex';; 	// Rendre le voile gris visible
}

function settingsWindowCancelProcessing()
{
	document.getElementById("settingsWindow").style.display='none';		// Rendre la fenêtre invisible
	document.getElementById("greyShadowWindow").style.display='none';; 	// Rendre le voile gris invisible
}

/* ------------------------------------------------------------------------------------ */
/* Gestion de l'accordéon : Expansion/Réduction des blocs								*/
/* ------------------------------------------------------------------------------------ */

function settingsWindowExpandProcessing(numBlock)
{
	document.getElementById("settingsWindowButtonDown_" + numBlock).style.display 	='none';	
	document.getElementById("settingsWindowButtonUp_" + numBlock).style.display 	='flex';	
	document.getElementById("settingsWindowContentBlock_" + numBlock).style.display	='flex';	
}

function settingsWindowReduceProcessing(numBlock)
{
	document.getElementById("settingsWindowButtonDown_" + numBlock).style.display = 'flex';	
	document.getElementById("settingsWindowButtonUp_" + numBlock).style.display = 'none';	
	document.getElementById("settingsWindowContentBlock_" + numBlock).style.display = 'none';	
}


/* ------------------------------------------------------------------------------------ */
/* Modification des couleurs - Prise en compte immédiate (pas de Validation)			*/
/* ------------------------------------------------------------------------------------ */

function changeColorProcessing(elm)
{
	var newColor = document.getElementById(elm.id).value;	// Récupération du code couleur saisi (suite à blur)
	var i = 0;
	var toto = '';
	var tata = '';
	var titi = '';
	let tabElem = [];
	
	// Couleur de la barre de titre
	// ----------------------------
	if(elm.id == "titleBarColorField"){
		console.log("changeColorProcessing :\n... New titleBarColorField = " + newColor);
		titleBarColor = newColor;
		document.getElementById("schemaTitleBarBlock").style.backgroundColor = newColor;
		document.getElementById("itemTransactionBlock").style.backgroundColor = newColor;
		// Stockage en mémoire
		localStorage.setItem("titleBarColorLS", newColor);
	}
	
	// Couleur de la barre d'action
	// ----------------------------
	else if (elm.id == "actionBarColorField"){
		console.log("changeColorProcessing :\n... New actionBarColorField = " + newColor);
		actionBarColor = newColor;
		document.getElementById("schemaActionBarFilledBlock").style.backgroundColor = newColor;
		// Si barre d'action présente, modifier couleur de fond du bloc des onglets
		if(document.getElementById("000_0000")) {
			console.log("changeColorProcessing :\n...Action bar ON");
			document.getElementById("schemaTabBarBlock").style.backgroundColor = newColor;	
		}
			
		tabElem = document.getElementsByClassName("itemActionBarBlock");		// Page of item list	
		for (i = 0, c = tabElem.length ; i < c; i++) {document.getElementById(tabElem[i].id).style.backgroundColor = newColor;}	
		// Stockage en mémoire
		localStorage.setItem("actionBarColorLS", newColor);	
	}
	// Couleur des onglets non sélectionnés
	// ------------------------------------
	else if (elm.id == "tabColorField"){
		console.log("changeColorProcessing :\n... New tabColorField = " + newColor);
		tabColor = newColor;
		tabElem = document.getElementsByClassName("tabBarBlock");		// Onglet	
		for (i = 0, c = tabElem.length ; i < c; i++) 
		{
			toto = document.getElementById(tabElem[i].id);  
			if(toto.id.substring(22,25) !== selectedPage) {document.getElementById(tabElem[i].id).style.backgroundColor = newColor;}
			
			console.log('changeColorProcessing :\n...Onglet = ' + toto.id.substring(22,25));  //schemaTabBarPageBlock_001
			console.log('changeColorProcessing :\n...selectedPage = ' + selectedPage);			
		}
		// Stockage en mémoire
		localStorage.setItem("tabColorLS", newColor);		
	}
	
	// Couleur de l'onglet sélectionné
	// -------------------------------
	else if (elm.id == "selectedTabColorField"){
		console.log("changeColorProcessing :\n... New selectedTabColorField = " + newColor);
		selectedTabColor = newColor;
		tabElem = document.getElementsByClassName("tabBarBlock");		// Onglet	
		for (i = 0, c = tabElem.length ; i < c; i++) 
		{
			toto = document.getElementById(tabElem[i].id);  
			if(toto.id.substring(22,25) == selectedPage) {document.getElementById(tabElem[i].id).style.backgroundColor = newColor;}
			
			console.log('changeColorProcessing :\n...Onglet S = ' + toto.id.substring(22,25));  //schemaTabBarPageBlock_001
			console.log('changeColorProcessing :\n...selectedPage = ' + selectedPage);			
		}
		// Stockage en mémoire
		localStorage.setItem("selectedTabColorLS", newColor);			
	}
	
	// Couleur du panneau de navigation
	// --------------------------------
	else if (elm.id == "navPanColorField"){
		console.log("changeColorProcessing :\n... New navPanColorField = " + newColor);
		navPanColor = newColor;
		tabElem = document.getElementsByClassName("schemaNavPanFilledBlock");		// Navigation panel "Filled"	
		for (i = 0, c = tabElem.length ; i < c; i++) {document.getElementById(tabElem[i].id).style.backgroundColor = newColor;}	
		
		tabElem = document.getElementsByClassName("itemNavPanBlock");		// Items de type Nav Pan
		for (i = 0, c = tabElem.length ; i < c; i++) {
			document.getElementById(tabElem[i].id + '_itemDeco').style.backgroundColor = newColor;
		}	
		// Stockage en mémoire
		localStorage.setItem("navPanColorLS", newColor);
	}
	
	// Couleur de la zone des blocs
	// ----------------------------
	else if (elm.id == "blocksAreaColorField"){
		console.log("changeColorProcessing :\n... New blocksAreaColorField = " + newColor);
		blocksAreaColor = newColor;
		tabElem = document.getElementsByClassName("schemaBlocksAreaBlock");		// Block Area		
		for (i = 0, c = tabElem.length ; i < c; i++) {document.getElementById(tabElem[i].id).style.backgroundColor = newColor;}	
		
		tabElem = document.getElementsByClassName("itemPageBlock");		// Page of item list	
		for (i = 0, c = tabElem.length ; i < c; i++) {document.getElementById(tabElem[i].id).style.backgroundColor = newColor;}	
		// Stockage en mémoire
		localStorage.setItem("blocksAreaColorLS", newColor);
	}
	
	// Couleur des blocs
	// -----------------
	else if (elm.id == "blockColorField"){
		console.log("changeColorProcessing :\n... New blockColorField = " + newColor);
		blockColor = newColor;
		tabElem = document.getElementsByClassName("schemaBlockBlock");		// Block 	
		for (i = 0, c = tabElem.length ; i < c; i++) {document.getElementById(tabElem[i].id).style.backgroundColor = newColor;}	
		
		tabElem = document.getElementsByClassName("itemBlockBlock");		// Items de type Bloc
		for (i = 0, c = tabElem.length ; i < c; i++) {document.getElementById(tabElem[i].id + '_itemDeco').style.backgroundColor = newColor;}
		// Stockage en mémoire
		localStorage.setItem("blockColorLS", newColor);	
	}
	
	// Couleur des pieds de page
	// -------------------------
	else if (elm.id == "footerColorField"){
		console.log("changeColorProcessing :\n... New footerColorField = " + newColor);
		footerColor = newColor;	
		tabElem = document.getElementsByClassName("schemaFooterFilledBlock");		// Footer "Filled"			
		for (i = 0, c = tabElem.length ; i < c; i++) {document.getElementById(tabElem[i].id).style.backgroundColor = newColor;}	
		
		tabElem = document.getElementsByClassName("itemFooterBlock");		// Items de type Footer
		for (i = 0, c = tabElem.length ; i < c; i++) {document.getElementById(tabElem[i].id + '_itemDeco').style.backgroundColor = newColor;}
		// Stockage en mémoire
		localStorage.setItem("footerColorLS", newColor);	
	}
}

/* ------------------------------------------------------------------------------------ */
/* Modification des codes des éléments par défaut - Prise en compte immédiate			*/
/* ------------------------------------------------------------------------------------ */

function changeNameProcessing(elm)
{

	var newName = document.getElementById(elm.id).value;	// Récupération du nom saisi (suite à blur)
	var i = 0;
	var schemaLabel = '';
	var texte = ' ';
	var toto = '';
	var tata = '';
	var titi = '';
	let tabElem = [];
	
	// Nom de barre d'action
	// ---------------------
	if(elm.id == "actionBarNameField"){
		console.log("changeNameProcessing :\n... New actionBarNameField = " + newName);
		actionBarName = newName;
		
		// Modification du libellé du schéma, si la barre n'est pas créée
		if(document.getElementById("schemaActionBarFilledBlock").style.display == 'none') {
			
			console.log("changeNameProcessing :\n...Action bar absente");
			schemaLabel = document.getElementById("000_0000_Label");	
			texte = document.createTextNode(newName);	
			
			if (schemaLabel.lastChild.nodeType == 1) {					
				schemaLabel.appendChild(texte);							// Le dernier enfant n'est pas du texte --> on ajoute
			} else {
				schemaLabel.replaceChild(texte, schemaLabel.lastChild);	// Sinon on remplace
			}  
		}
		// Stockage en mémoire
		localStorage.setItem("actionBarNameLS", newName);
	}
	// Nom de page
	// -----------
	else if (elm.id == "pageNameField"){
		console.log("changeNameProcessing :\n... New pageNameField = " + newName);
		pageName = newName;
		// Stockage en mémoire
		localStorage.setItem("pageNameLS", newName);
	}	
	// Nom de bloc
	// -----------
	else if (elm.id == "blockNameField"){
		console.log("changeNameProcessing :\n... New blockNameField = " + newName);
		blockName = newName;
		// Stockage en mémoire
		localStorage.setItem("blockNameLS", newName);
	}
	// Nom de panneau de navigation
	// ----------------------------
	else if (elm.id == "navPanNameField"){
		console.log("changeNameProcessing :\n... New navPanNameField = " + newName);
		navPanName = newName;
				
		// Modification du libellé du schéma, si la barre n'est pas créée
		
		var tableNavPan = document.getElementsByClassName("schemaNavPanFilledBlock");
	
		for (var i = 0, c = tableNavPan.length ; i < c; i++) {
		
			toto = document.getElementById(tableNavPan[i].id);		// schemaNavPanFilledBlock_nnn
			titi = toto.id.substring(24, 27) + "_0000_Label";			// nnn_0000_Label
		
			if(toto.style.display == 'none') {
			
				console.log("changeNameProcessing :\n...Nav bar " + i + " absente");
				var schemaLabel = document.getElementById(titi);

				
				texte = document.createTextNode(newName);	
				
				if (schemaLabel.lastChild.nodeType == 1) {					
					schemaLabel.appendChild(texte);							// Le dernier enfant n'est pas du texte --> on ajoute
				} else {
					schemaLabel.replaceChild(texte, schemaLabel.lastChild);	// Sinon on remplace
				}  
			}	
		}
		// Stockage en mémoire
		localStorage.setItem("navPanNameLS", newName);
		
	}
	// Nom de footer
	// -------------
	else if (elm.id == "footerNameField"){
		console.log("changeNameProcessing :\n... New footerNameField = " + newName);
		footerName = newName;
		
				
		// Modification du libellé du schéma, si la barre n'est pas créée
		
		var tableFooter = document.getElementsByClassName("schemaFooterFilledBlock");
	
		for (var i = 0, c = tableFooter.length ; i < c; i++) {
		
			toto = document.getElementById(tableFooter[i].id);		// schemaFooterFilledBlock_nnn
			titi = toto.id.substring(24, 27) + "_9999_Label";			// nnn_9999_Label
		
			if(toto.style.display == 'none') {
			
				console.log("changeNameProcessing :\n...Footer " + i + " absent");
				var schemaLabel = document.getElementById(titi);

				
				texte = document.createTextNode(newName);	
				
				if (schemaLabel.lastChild.nodeType == 1) {					
					schemaLabel.appendChild(texte);							// Le dernier enfant n'est pas du texte --> on ajoute
				} else {
					schemaLabel.replaceChild(texte, schemaLabel.lastChild);	// Sinon on remplace
				}  
			}	
		}		
		// Stockage en mémoire
		localStorage.setItem("footerNameLS", newName);
	}
	else{
		console.log("changeNameProcessing :\n...BUG !!! elm.id = " + elm.id);
	}
}


/* ------------------------------------------------------------------------------------ */
/* Réinitialisation des paramètres														*/
/* ------------------------------------------------------------------------------------ */

function defaultValuesProcessing()
{
	console.log("defaultValuesProcessing : REINITIALISATION PARAMETRES");
	
	// Réinitialisation des couleurs
	// -----------------------------
	
	// Purge mémoire
	localStorage.clear();	// Un peu violent, à affiner
	
	// Réinitialisation des valeurs courantes
	titleBarColor	= titleBarDefaultColor;
	actionBarColor	= actionBarDefaultColor;
	tabColor		= tabDefaultColor;
	selectedTabColor= selectedTabDefaultColor;
	navPanColor		= navPanDefaultColor;
	blocksAreaColor	= blocksAreaDefaultColor;
	blockColor		= blockDefaultColor;
	footerColor		= footerDefaultColor;
	
	// Réinitialisation des valeurs de la fenêtre Settings
	document.getElementById("titleBarColorField").value 	= titleBarDefaultColor;
	document.getElementById("actionBarColorField").value 	= actionBarDefaultColor;
	document.getElementById("tabColorField").value 			= tabDefaultColor;
	document.getElementById("selectedTabColorField").value 	= selectedTabDefaultColor;
	document.getElementById("navPanColorField").value 		= navPanDefaultColor;
	document.getElementById("blocksAreaColorField").value 	= blocksAreaDefaultColor;
	document.getElementById("blockColorField").value 		= blockDefaultColor;
	document.getElementById("footerColorField").value 		= footerDefaultColor;
	
	// Réinitialisation de l'ensemble des items du schéma 
	changeColorProcessing(titleBarColorField);
	changeColorProcessing(actionBarColorField);
	changeColorProcessing(tabColorField);
	changeColorProcessing(selectedTabColorField);
	changeColorProcessing(navPanColorField);
	changeColorProcessing(blocksAreaColorField);
	changeColorProcessing(blockColorField);
	changeColorProcessing(footerColorField);	
		
		
	// Réinitialisation des noms par défaut
	// -----------------------------
	
	// Réinitialisation des valeurs courantes
	actionBarName	= actionBarDefaultName;
	pageName		= pageDefaultName;
	blockName		= blockDefaultName;
	navPanName		= navPanDefaultName;
	footerName		= footerDefaultName;
		
	// Réinitialisation des valeurs de la fenêtre Settings
	document.getElementById("actionBarNameField").value = actionBarDefaultName;
	document.getElementById("pageNameField").value 		= pageDefaultName;
	document.getElementById("blockNameField").value 	= blockDefaultName;
	document.getElementById("navPanNameField").value 	= navPanDefaultName;
	document.getElementById("footerNameField").value 	= footerDefaultName;
}


/* ==================================================================================== */
/* HELP	 		 																		*/
/* ==================================================================================== */

function iconHelpProcessing()	// Help
{
	document.getElementById("helpWindow").style.display='flex';			// Rendre la fenêtre visible
	document.getElementById("greyShadowWindow").style.display='flex';; 	// Rendre le voile gris visible
}

function helpWindowCancelProcessing()	// Help
{
	document.getElementById("helpWindow").style.display='none';			// Rendre la fenêtre invisible
	document.getElementById("greyShadowWindow").style.display='none';; 	// Rendre le voile gris invisible
}


/* ==================================================================================== */
/* ==================================================================================== */
/* ================   Gestion des ajouts d'élements dans le schéma    ================= */
/* ==================================================================================== */
/* ==================================================================================== */

/* ==================================================================================== */
/* Ajout de la barre d'action	 		 												*/
/* ==================================================================================== */

function addActionBarProcessing()	
{
	// Schéma : Modification aspect
	// ----------------------------
	document.getElementById("schemaActionBarEmptyBlock").style.display	= 'none';					// Faire disparaitre le "bloc en mode non créé" 
	document.getElementById("schemaActionBarFilledBlock").style.display	= 'flex';					// Faire apparaître le "bloc en mode créé" 
	document.getElementById("schemaActionBarFilledBlock").style.backgroundColor	= actionBarColor;			// Modifier couleur du  bloc contenant les onglets
	document.getElementById("schemaTabBarBlock").style.backgroundColor	= actionBarColor;			// Modifier couleur du  bloc contenant les onglets
	document.getElementById("000_0000_Label").value	= actionBarName;							// Actualiser le nom de la barre d'action

	console.log('addActionBarProcessing :\n...actionBarDefaultName = ' + actionBarName);
	
	// Tableau en mémoire : Ajout de l'item en début de tableau
	// --------------------------------------------------------
	item = '000_0000_ActionBar';
	itemsList.unshift(item);
	
	// Panneau de gauche : Ajout du bloc dans la liste  (mode "input")
	// -----------------------------------------------
	var itemBlock 		= document.createElement('div');		// Création de l'élément conteneur
	itemBlock.id 		= item.substring(0,8);		
	itemBlock.className = 'itemActionBarBlock';
	itemBlock.style.backgroundColor = actionBarColor;

	var itemInput 		= document.createElement('Input');		// Création du champ input
	itemInput.id 		= item.substring(0,8) + '_Input';
	itemInput.className = 'itemActionBarInputField';
	itemInput.type		= 'text';
	itemInput.value		= actionBarName;
	itemInput.addEventListener('change', function(e) { modificationItem(e.target.parentNode.id);}, false);		

	itemBlock.appendChild(itemInput);
			
	var ilmb = document.getElementById("itemsListMainBlock");	// Insertion de l'ensemble dans le DOM
	ilmb.insertBefore(itemBlock, ilmb.firstChild);			

	console.log('addActionBarProcessing : \n...item = ' + item + ' \n...itemsList = ' + itemsList);
}

/* ==================================================================================== */
/* Ajout d'une page				 		 												*/
/* ==================================================================================== */

function addPageProcessing()	
{

	// Initialisations
	// ---------------
	numPage 	+= 1;									// Incrémente le n° de page
	numPagePad	 = ('' + numPage).padStart(3, "0");	
	totalPages 	+= 1;									// Incrémente le nombre de pages 
	selectedPage = numPagePad;							// La page créée est considérée comme sélectionnée
	indexPage	+= 1;		

	if (totalPages > 14) {document.getElementById("schemaTabBarAddButton").style.display='none'; };	// Limite de 5 pages --> effacer bouton add

	console.log('addPageProcessing : \n...indexPage = ' + indexPage + '\n...numPagePad = ' + numPagePad);

	// Création de l'onglet dans le schéma
	// -----------------------------------
	var schemaTabBarPageBlock_n 			= document.createElement('div');			// Création de l'élément conteneur
	schemaTabBarPageBlock_n.id 				= 'schemaTabBarPageBlock_' + numPagePad;
	schemaTabBarPageBlock_n.className 		= 'tabBarBlock';
	schemaTabBarPageBlock_n.style.backgroundColor	= tabColor;

	var schemaTabBarLabel_n 				= document.createElement('div');			// Création de l'élément Libellé de l'onglet
	schemaTabBarLabel_n.id		 			= numPagePad + '_PAGE' + '_Label';
	
	schemaTabBarLabel_n.className 			= 'tabBarLabel';
	schemaTabBarLabel_n.addEventListener('click', selectPageProcessing, false);			// Pose d'un listener pour gérer la sélection de la page
		
	var schemaTabBarText_n 					= document.createTextNode(formatItemName(pageName,numPagePad,-1));	// Création du texte du libellé

	var schemaTabBarDeleteButton_n 			= document.createElement('button');			// Création de l'élément bouton Cancel
	schemaTabBarDeleteButton_n.id 			= 'schemaTabBarDeleteButton_' + numPagePad;				
	schemaTabBarDeleteButton_n.className	= 'deleteIconButton';
	schemaTabBarDeleteButton_n.onclick		= deletePageProcessing;
	
	var schemaTabBarImg_n 					= document.createElement('img');			// Création de l'élément image du bouton Cancel
	schemaTabBarImg_n.src 					= 'svg/cancel_646970.svg';
	schemaTabBarImg_n.style.height 			= '12px';
	schemaTabBarImg_n.style.width  			= '12px';	
	
	schemaTabBarLabel_n.appendChild(schemaTabBarText_n);								// Création des liens entre les éléments créés
	schemaTabBarDeleteButton_n.appendChild(schemaTabBarImg_n);					
	schemaTabBarPageBlock_n.appendChild(schemaTabBarLabel_n);
	schemaTabBarPageBlock_n.appendChild(schemaTabBarDeleteButton_n);
			
	var stbb = document.getElementById("schemaTabBarListBlock");						// Insertion de l'ensemble dans le DOM, avant le bouton "Add page"
	var iab  = document.getElementById("schemaTabBarAddButton");
	stbb.insertBefore(schemaTabBarPageBlock_n, iab);	

	// Création de la Main Area associée à la page créée
	// -------------------------------------------------
	var schemaMainAreaBlock_n 				= document.createElement('div');			// Création de l'élément conteneur - mode Empty
	schemaMainAreaBlock_n.id 				= 'schemaMainAreaBlock_' + numPagePad;	
	schemaMainAreaBlock_n.className 		= 'schemaMainAreaBlock';

	// Création du volet de navigation associé à la page créée (2 éléments / Empty affiché, Filled masqué)
	// ---------------------------------------------------------------------------------------------------
	var schemaNavPanEmptyBlock_n 			= document.createElement('div');				// Création de l'élément conteneur - mode Empty
	schemaNavPanEmptyBlock_n.id 			= 'schemaNavPanEmptyBlock_' + numPagePad;	
	schemaNavPanEmptyBlock_n.className		= 'schemaNavPanEmptyBlock';
	schemaNavPanEmptyBlock_n.style.display	= 'flex';										// visible

	var schemaNavPanAddButton_n 			= document.createElement('input');				// Création du bouton ajout
	schemaNavPanAddButton_n.id 				= 'schemaNavPanAddButton_' + numPagePad;				
	schemaNavPanAddButton_n.className		= 'addButton';
	schemaNavPanAddButton_n.type			= 'button';
	schemaNavPanAddButton_n.value			= 'Add panel';
	schemaNavPanAddButton_n.onclick			= addNavPanProcessing;

	schemaNavPanEmptyBlock_n.appendChild(schemaNavPanAddButton_n);							// Ajout du bouton au panneau			
	schemaMainAreaBlock_n.appendChild(schemaNavPanEmptyBlock_n);							// Ajout du panneau au bloc Main Area

	var schemaNavPanFilledBlock_n 			= document.createElement('div');				// Création de l'élément conteneur - mode Filled
	schemaNavPanFilledBlock_n.id 			= 'schemaNavPanFilledBlock_' + numPagePad;
	schemaNavPanFilledBlock_n.className		= 'schemaNavPanFilledBlock';
	schemaNavPanFilledBlock_n.style.display	= 'none';										// masqué
	schemaNavPanFilledBlock_n.style.backgroundColor	= navPanColor;					// 


	var schemaNavPanLabel_n 				= document.createElement('div');				// Création de l'élément conteneur du label
	schemaNavPanLabel_n.id 					= numPagePad + '_0000' + '_Label';
	schemaNavPanLabel_n.className			= 'schemaWhiteLabel';

	var schemaNavPanText_n 					= document.createTextNode(formatItemName(navPanName,numPagePad,-1));			// Création du texte du libellé

	var schemaNavPanDeleteButton_n 			= document.createElement('button');				// Création de l'élément bouton Cancel
	schemaNavPanDeleteButton_n.id 			= 'schemaNavPanDeleteButton_' + numPagePad;				
	schemaNavPanDeleteButton_n.className 	= 'deleteIconButton';
	schemaNavPanDeleteButton_n.onclick		= deleteNavPanProcessing;
	
	var schemaNavPanImg_n 					= document.createElement('img');				// Création de l'élément image du bouton Cancel
	schemaNavPanImg_n.src 					= 'svg/cancel_FFFFFF.svg';
	schemaNavPanImg_n.style.height 			= '12px';
	schemaNavPanImg_n.style.width  			= '12px';	
	schemaNavPanImg_n.style.title  			= 'Delete nav.panel';	

	schemaNavPanLabel_n.appendChild(schemaNavPanText_n);
	schemaNavPanFilledBlock_n.appendChild(schemaNavPanLabel_n);
	schemaNavPanDeleteButton_n.appendChild(schemaNavPanImg_n);
	schemaNavPanFilledBlock_n.appendChild(schemaNavPanDeleteButton_n);
	schemaMainAreaBlock_n.appendChild(schemaNavPanFilledBlock_n);

	// Création de la zone des blocs associée à la page créée
	// ------------------------------------------------------
	var schemaBlocksAreaBlock_n 			= document.createElement('div');				// Création de l'élément conteneur
	schemaBlocksAreaBlock_n.id 				= 'schemaBlocksAreaBlock_' + numPagePad;	
	schemaBlocksAreaBlock_n.className		= 'schemaBlocksAreaBlock';		
	schemaBlocksAreaBlock_n.style.backgroundColor = blocksAreaColor;					// 

	var schemaBlockAddButton_n 				= document.createElement('input');				// Création du bouton ajout
	schemaBlockAddButton_n.id 				= 'schemaBlockAddButton_' + numPagePad;				
	schemaBlockAddButton_n.className		= 'addButton2';
	schemaBlockAddButton_n.type				= 'button';
	schemaBlockAddButton_n.value			= 'Add block';
	schemaBlockAddButton_n.onclick			= addBlockProcessing;

	schemaBlocksAreaBlock_n.appendChild(schemaBlockAddButton_n);							// Création des liens entre les éléments créés
	schemaMainAreaBlock_n.appendChild(schemaBlocksAreaBlock_n);

	// Création du footer associé à la page créée (2 éléments / Empty affiché, Filled masqué)
	// --------------------------------------------------------------------------------------
	var schemaFooterEmptyBlock_n 			= document.createElement('div');				// Création de l'élément conteneur - mode Empty
	schemaFooterEmptyBlock_n.id 			= 'schemaFooterEmptyBlock_' + numPagePad;
	schemaFooterEmptyBlock_n.className 		= 'schemaFooterEmptyBlock';		
	schemaFooterEmptyBlock_n.style.display	= 'flex';										// visible

	var schemaFooterAddButton_n 			= document.createElement('input');				// Création du bouton ajout
	schemaFooterAddButton_n.id 				= 'schemaFooterAddButton_' + numPagePad;				
	schemaFooterAddButton_n.className		= 'addButton';
	schemaFooterAddButton_n.type			= 'button';
	schemaFooterAddButton_n.value			= 'Add footer';
	schemaFooterAddButton_n.onclick			= addFooterProcessing;

	schemaFooterEmptyBlock_n.appendChild(schemaFooterAddButton_n);					
	schemaMainAreaBlock_n.appendChild(schemaFooterEmptyBlock_n);

	var schemaFooterFilledBlock_n 			= document.createElement('div');				// Création de l'élément conteneur - mode Filled
	schemaFooterFilledBlock_n.id 			= 'schemaFooterFilledBlock_' + numPagePad;
	schemaFooterFilledBlock_n.className 	= 'schemaFooterFilledBlock';
	schemaFooterFilledBlock_n.style.display	= 'none';										// masqué
	schemaFooterFilledBlock_n.style.backgroundColor	= footerColor;					// 

	var schemaFooterLabel_n 				= document.createElement('div');				// Création de l'élément conteneur du label
	schemaFooterLabel_n.id 					= numPagePad + '_9999' + '_Label';
	schemaFooterLabel_n.className			= 'schemaWhiteLabel';

	var schemaFooterText_n 					= document.createTextNode(formatItemName(footerName,numPagePad,-1));	// Création du texte du libellé

	var schemaFooterDeleteButton_n 			= document.createElement('button');				// Création de l'élément bouton Cancel
	schemaFooterDeleteButton_n.id 			= 'schemaFooterDeleteButton_' + numPagePad;				
	schemaFooterDeleteButton_n.className 	= 'deleteIconButton';
	schemaFooterDeleteButton_n.onclick		= deleteFooterProcessing;
	
	var schemaFooterImg_n 					= document.createElement('img');				// Création de l'élément image du bouton Cancel
	schemaFooterImg_n.src 					= 'svg/cancel_FFFFFF.svg';
	schemaFooterImg_n.style.height 			= '12px';
	schemaFooterImg_n.style.width  			= '12px';	
	schemaFooterImg_n.style.title  			= 'Delete footer';	

	schemaFooterLabel_n.appendChild(schemaFooterText_n);
	schemaFooterFilledBlock_n.appendChild(schemaFooterLabel_n);
	schemaFooterDeleteButton_n.appendChild(schemaFooterImg_n);
	schemaFooterFilledBlock_n.appendChild(schemaFooterDeleteButton_n);
	schemaMainAreaBlock_n.appendChild(schemaFooterFilledBlock_n);

	// Insertion de l'ensemble dans le DOM
	// -----------------------------------
	var smab = document.getElementById("schemaBlock");				
	var ite  = document.getElementById("idTheEnd");
	
	smab.insertBefore(schemaMainAreaBlock_n, ite);								
	smab.insertBefore(schemaFooterEmptyBlock_n, ite);	
	smab.insertBefore(schemaFooterFilledBlock_n, ite);

	console.log('addPageProcessing :  \n...schemaBlocksAreaBlock_n.id = ' + schemaBlocksAreaBlock_n.id +
									 '\n...schemaBlockAddButton_n.id = ' + schemaBlockAddButton_n.id +
									 '\n...listener du bouton = ' + schemaBlockAddButton_n.onclick.name);	//NB : si j'enlève ".name", la console affiche le source de la fonction

	// Ajout de la page dans les tableaux
	// ----------------------------------
	pagesTable[pagesTable.length] = numPagePad; 
	navPanTable[navPanTable.length]	= 'empty';
	footerTable[footerTable.length]	= 'empty'; 

	console.log('addPageProcessing : \n...pagesTable['  + pagesTable.length +  '] = ' +  pagesTable + 
									'\n...navPanTable[' + navPanTable.length + '] = ' +  navPanTable +
									'\n...footerTable[' + footerTable.length + '] = ' +  footerTable);		
									
	// Masquage des blocsArea des éventuelles autres pages	
	// ---------------------------------------------------
	var tableMainArea = document.getElementsByClassName("schemaMainAreaBlock");
	
	for (var i = 0, c = tableMainArea.length ; i < c; i++) {
		
		var tmai = document.getElementById(tableMainArea[i].id);	
		if (schemaMainAreaBlock_n.id !== tmai.id){tmai.style.display ='none';}
	}
	
	var tableFooterEmpty = document.getElementsByClassName("schemaFooterEmptyBlock");		
	
	for (var i = 0, c = tableFooterEmpty.length ; i < c; i++) {
		
		var tfei = document.getElementById(tableFooterEmpty[i].id);	
		if (schemaFooterEmptyBlock_n.id !== tfei.id){tfei.style.display ='none';}
	}
	
	var tableFooterFilled = document.getElementsByClassName("schemaFooterFilledBlock");		
	
	for (var i = 0, c = tableFooterFilled.length ; i < c; i++) {
		
		var tffi = document.getElementById(tableFooterFilled[i].id);	
		if (schemaFooterFilledBlock_n.id !== tffi.id){tffi.style.display ='none';}
	}
	
	// Masquage des blocsArea des blocs "Init"
	// ---------------------------------------
	document.getElementById("schemaMainAreaInitBlock").style.display = 'none';
	document.getElementById("schemaFooterInitBlock").style.display = 'none';
	
	// Changer couleur de l'onglet	(A FACTORISER)
	// -------------------------------
	var tableTabs = document.getElementsByClassName("tabBarBlock");		
	for (var i = 0, c = tableTabs.length ; i < c; i++) {						// Commencer par tout blanchir
		var tti = document.getElementById(tableTabs[i].id);
		if (tti !== null) {tti.style.backgroundColor = tabColor};	
	}
	var idTab = numPagePad + '_PAGE' + '_Label';					
	document.getElementById(idTab).parentNode.style.backgroundColor = selectedTabColor;	// Ensuite, bleuir l'onglet sélectionné
	
	// Mise à jour de la liste des éléments
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	item = numPagePad + '_' + 'PAGE' + '_' + 'MyPage_' + numPagePad;	// Nom de l'item stocké dans le tableau itemsList

	itemsList.push(item);	// Ajout de l'item en fin de tableau
				
	var itemBlock 		= document.createElement('div');		// Création de l'élément conteneur
	itemBlock.id 		= item.substring(0,8);
	itemBlock.className = 'itemPageBlock';
	itemBlock.style.backgroundColor = blocksAreaColor;

	var itemInput 		= document.createElement('Input');		// Création du champ input
	itemInput.id 		= item.substring(0,8) + '_Input';		// id = nnn_PAGE_Input
	itemInput.className = 'itemPageInputField';
	itemInput.type		= 'text';
	itemInput.value		= formatItemName(pageName,numPagePad,-1);			
	itemInput.addEventListener('change', function(e) { modificationItem(e.target.parentNode.id);}, false);		

	itemBlock.appendChild(itemInput);			
	
	var ilmb = document.getElementById("itemsListMainBlock");	// Insertion de l'ensemble dans le DOM
	var lastItem = document.getElementById("lastItem");

	ilmb.insertBefore(itemBlock, lastItem);	
	
	console.log('addPageProcessing : \n...item = ' + item + '\n...itemsList = ' + itemsList);
}

/* ==================================================================================== */
/* Ajout du panneau de navigation 		 												*/
/* ==================================================================================== */

function addNavPanProcessing()	
{
	// Affichage du bloc 
	// -----------------
	document.getElementById("schemaNavPanEmptyBlock_"  + selectedPage).style.display = 'none';	// Faire disparaitre le "bloc en mode non créé" 
	document.getElementById("schemaNavPanFilledBlock_" + selectedPage).style.display = 'flex';	// Faire apparaître le "bloc en mode créé" 
	
	// Sauvegarde dans le tableau de présence des Nav.pan
	// --------------------------------------------------
	navPanTable[indexPage]	= 'filled';		
	
	console.log('addNavPanProcessing : \n...selectedPage = '   + selectedPage + '\n...indexPage = ' + indexPage);	
		
	// Mise à jour de la liste des éléments
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	item = selectedPage + '_' + '0000' + '_' + 'NavPan_' + selectedPage;	// Nom de l'item stocké dans le tableau itemsList
	
	var iPage  = '000';
	var iBlock = '0000';
	
	console.log('addNavPanProcessing :');
	for (var i = 0, c = itemsList.length ; i < c; i++) {
		
		iPage  = itemsList[i].substring(3,0); 
		iBlock = itemsList[i].substring(4,8); 	console.log('...i = ' + i + ' | iPage = '  + iPage + ' | iBlock = '  + iBlock);
		
		if (iPage == selectedPage) {
			itemsList.splice(i+1, 0, item);		// Insertion de l'item dans le tableau
			console.log('...itemsList = ' + itemsList + ' ' + i);
			break;
		}
	}

	var itemBlock 			= document.createElement('div');	// Création de l'élément conteneur
	itemBlock.id 			= item.substring(0,8) ;
	itemBlock.className 	= 'itemNavPanBlock';
	
	var itemDeco			= document.createElement('div');
	itemDeco.id				= item.substring(0,8) + '_itemDeco';
	itemDeco.className		= 'itemDeco';
	itemDeco.style.backgroundColor	= navPanColor;
	
	var itemInput 			= document.createElement('Input');		// Création du champ input
	itemInput.id 			= item.substring(0,8) + '_Input';		// id = nnn_PAGE_Input
	itemInput.className 	= 'itemNavPanInputField';
	itemInput.type			= 'text';
	itemInput.value			= formatItemName(navPanName,selectedPage,-1);
	
	
	itemInput.addEventListener('change', function(e) { modificationItem(e.target.parentNode.id);}, false);		
	
	itemBlock.appendChild(itemDeco);
	itemBlock.appendChild(itemInput);
			
	var ilmb = document.getElementById("itemsListMainBlock");	
		
	i += 2;					
	
	if (itemsList[i] == undefined) {
		var lastItem = document.getElementById("lastItem");
	}else{
		var lastItem = document.getElementById(itemsList[i].substring(0,8));	
	}
	
	ilmb.insertBefore(itemBlock, lastItem);
	
	console.log('addNavPanProcessing :\n...item = ' + item + '\n...itemsList = ' + itemsList);
}

/* ==================================================================================== */
/* Ajout d'un bloc				 		 												*/
/* ==================================================================================== */

var nbbk 		= 0;		// compteur du n° de bloc
var nbbkPad		= "0000";	// idem, paddé sur 4 caractères	
var totalBlocks = 0;		// nombre de blocs

function addBlockProcessing()	
{
	// Initialisations
	// ---------------
	nbbk 		+= 1; 
	nbbkPad	 	= ('' + nbbk).padStart(4, "0");
	totalBlocks += 1;	
	
	//if (totalBlocks > 39) {document.getElementById("schemaBlockAddButton_" + selectedPage).style.display='none'; }	// Limiter le nombre de blocs

	console.log('addBlockProcessing : \n...selectedPage = ' +  selectedPage + '\n...nbbkPad = ' + nbbkPad + '\n...totalBlocks = ' + totalBlocks);

	// Création du bloc
	// ----------------
	var addedBloc = document.createElement('div');									// Création de l'élément conteneur
	addedBloc.id 			= 'schemaBlock_' + selectedPage + '_' + nbbkPad;				
	addedBloc.className 	= 'schemaBlockBlock';
	addedBloc.style.backgroundColor = blockColor;

	var addedLabel = document.createElement('div');									// Création de l'élément Libellé de l'onglet
	addedLabel.id 			= selectedPage + '_' + nbbkPad + '_Label';
	addedLabel.className	='schemaGreyLabel';

	var addedText = document.createTextNode(formatItemName(blockName, selectedPage, nbbkPad));	// Création du texte du libellé

	var addedButton = document.createElement('button');									// Création de l'élément bouton
	addedButton.id 			= 'schemaBlockDeleteButton_' + selectedPage + '_' + nbbkPad;		
	addedButton.className 	= 'deleteIconButton';
	addedButton.onclick		= deleteBlockProcessing;
		
	var addedImg = document.createElement('img');									// Création de l'élément image
	addedImg.src 			= 'svg/cancel_646970.svg';
	addedImg.style.height 	= '12px';
	addedImg.style.width  	= '12px';	
	
	addedLabel.appendChild(addedText);												// Création des liens entre les éléments créés
	addedButton.appendChild(addedImg);					
	addedBloc.appendChild(addedLabel);
	addedBloc.appendChild(addedButton);
		
	var sbab = document.getElementById("schemaBlocksAreaBlock_" + selectedPage);			// Insertion de l'ensemble dans le DOM, avant la div "theEnd"
	var iab  = document.getElementById("schemaBlockAddButton_"  + selectedPage);
	sbab.insertBefore(addedBloc, iab);								

	// Mise à jour de la liste des éléments
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	item = selectedPage + '_' + nbbkPad + '_' + ('Page ' + selectedPage + ' - Block ' + nbbkPad);	// Nom de l'item stocké dans le tableau itemsList

	var iPage  = '000';
	var iBlock = '0000';
				
	for (var i = 0, c = itemsList.length ; i < c; i++) {
		
		iPage  = itemsList[i].substring(3,0); 
		iBlock = itemsList[i].substring(4,8); 	
		
		console.log('addBlockProcessing : \n...i = ' + i + ' | iPage = '  + iPage + ' | iBlock = '  + iBlock + ' | c = '  + c);
		
		if ((iPage > selectedPage) || (iPage == selectedPage && iBlock > nbbkPad && iBlock !== 'PAGE')){
			itemsList.splice(i,0,item);		// Insertion de l'item dans le tableau
			break;
		}
	}
	
	if (i==c) { 
		itemsList.push(item); 		// Si dernier de la liste, Ajout de l'item en fin de tableau
		console.log('addBlockProcessing : \n...push');
	}

	var itemBlock 			= document.createElement('div');	// Création de l'élément conteneur
	itemBlock.id 			= item.substring(0,8) ;
	itemBlock.className 	= 'itemBlockBlock';

	var itemDeco			= document.createElement('div');
	itemDeco.id				= item.substring(0,8) + '_itemDeco';
	itemDeco.className		= 'itemDeco';
	itemDeco.style.backgroundColor	= blockColor;
	itemDeco.style.border	= '1px solid lightgrey';
	
	var itemInput 			= document.createElement('Input');		// Création du champ input
	itemInput.id 			= item.substring(0,8) + '_Input';		// id = nnn_PAGE_Input
	itemInput.className 	= 'itemBlockInputField';
	itemInput.type			= 'text';
	itemInput.value			= formatItemName(blockName,selectedPage,nbbkPad);
	itemInput.addEventListener('change', function(e) { modificationItem(e.target.parentNode.id);}, false);		
	
	itemBlock.appendChild(itemDeco);
	itemBlock.appendChild(itemInput);
		
	var ilmb = document.getElementById("itemsListMainBlock");	
		
	i += 1;
	
	if (itemsList[i] == undefined) {
		console.log('addBlockProcessing :\n...undefined TRUE'); 
		var lastItem = document.getElementById("lastItem");
	}else{
		var lastItem = document.getElementById(itemsList[i].substring(0,8));	
	}
	
	ilmb.insertBefore(itemBlock, lastItem);
	
	console.log('addBlockProcessing :\n...item = ' + item + '\n...itemsList = ' + itemsList);
}

/* ==================================================================================== */
/* Ajout du pied de page		 		 												*/
/* ==================================================================================== */

function addFooterProcessing()	
{
	// Affichage du bloc 
	// -----------------
	document.getElementById("schemaFooterEmptyBlock_"  + selectedPage).style.display = 'none';	// Faire disparaitre le "bloc en mode non créé" 
	document.getElementById("schemaFooterFilledBlock_" + selectedPage).style.display='flex';	// Faire apparaître le "bloc en mode créé" 

	// Sauvegarde dans le tableau de présence des Footers
	// --------------------------------------------------
	footerTable[indexPage]	= 'filled';		
	
	// Mise à jour de la liste des éléments
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	item = selectedPage + '_' + '9999' + '_' + 'Footer_' + selectedPage;	// Nom de l'item stocké dans le tableau itemsList
	
	var iPage  = '000';
	var iBlock = '0000';
				
	for (var i = 0, c = itemsList.length ; i < c; i++) {
		
		iPage  = itemsList[i].substring(3,0); 
		iBlock = itemsList[i].substring(4,8); 	
		
		console.log('addFooterProcessing :\n...i = ' + i + ' | iPage = '  + iPage + ' | iBlock = '  + iBlock + ' | c = '  + c);
		
		if (iPage > selectedPage) {
			itemsList.splice(i,0,item);		// Insertion de l'item dans le tableau
			break;
		}
	}
	
	if (i==c) { 
		itemsList.push(item); 		// Si dernier de la liste, Ajout de l'item en fin de tableau
	}
	
	var itemBlock 			= document.createElement('div');	// Création de l'élément conteneur
	itemBlock.id 			= item.substring(0,8) ;
	itemBlock.className 	= 'itemFooterBlock';

	var itemDeco			= document.createElement('div');
	itemDeco.id				= item.substring(0,8) + '_itemDeco';
	itemDeco.className		= 'itemDeco';
	itemDeco.style.backgroundColor	= footerColor;
	
	var itemInput 			= document.createElement('Input');		// Création du champ input
	itemInput.id 			= item.substring(0,8) + '_Input';		// id = nnn_PAGE_Input
	itemInput.className 	= 'itemFooterInputField';
	itemInput.type			= 'text';
	itemInput.value			= formatItemName(footerName,selectedPage,-1);
		
	itemInput.addEventListener('change', function(e) { modificationItem(e.target.parentNode.id);}, false);	
	
	itemBlock.appendChild(itemDeco);
	itemBlock.appendChild(itemInput);
			
	var ilmb = document.getElementById("itemsListMainBlock");	
		
	if (i==c) {
		var lastItem = document.getElementById("lastItem");	
		console.log('addFooterProcessing :\n...(a) lastItem.id = ' + lastItem.id);
	}else{
		var lastItem = document.getElementById(itemsList[i+1].substring(0,8));	
		console.log('addFooterProcessing :\n...(b) lastItem.id = ' + lastItem.id);
	}
	
	ilmb.insertBefore(itemBlock, lastItem);	

	console.log('addFooterProcessing :\n...item = ' + item + '\n...itemsList = ' + itemsList);
}

/* ==================================================================================== */
/* ==================================================================================== */
/* =============   Gestion des suppressions d'élements dans le schéma    ============== */
/* ==================================================================================== */
/* ==================================================================================== */

/* ==================================================================================== */
/* Suppression de la barre d'action 	 												*/
/* ==================================================================================== */

function deleteActionBarProcessing()	
{
	// Schéma : Modification aspect
	// ----------------------------
	document.getElementById("schemaActionBarEmptyBlock").style.display  = 'flex';		// Faire apparaître le "bloc en mode non créé" 
	document.getElementById("schemaActionBarFilledBlock").style.display = 'none';		// Faire disparaitre le "bloc en mode créé" 
	document.getElementById("schemaTabBarBlock").style.backgroundColor  = 'inherit';	// Supprimer couleur du bloc contenant les onglets
		
	// Réinitialiser le libellé "Action bar" sur le schéma
	// ---------------------------------------------------
	var schemaLabel = document.getElementById("000_0000_Label");	
	var texte = document.createTextNode(actionBarName);	
	
	if (schemaLabel.lastChild.nodeType == 1) {					
		schemaLabel.appendChild(texte);							// Le dernier enfant n'est pas du texte --> on ajoute
	} else {
		schemaLabel.replaceChild(texte, schemaLabel.lastChild);	// Sinon on remplace
	}  
		
	// Panneau de gauche : Effacement du bloc dans la liste 
	// ----------------------------------------------------
	item = itemsList[0];
	var itemBlock = document.getElementById(item.substring(0,8));
	itemBlock.parentNode.removeChild(itemBlock);	
	
	// Tableau en mémoire : Retrait du 1er élément
	// -------------------------------------------
	itemsList.shift();
	
	console.log('deleteActionBarProcessing :\n...item = ' + item + '\n...itemsList = ' + itemsList);
}

/* ==================================================================================== */
/* Suppression d'une page				 												*/
/* ==================================================================================== */

function deletePageProcessing()	
{
	// Initialisations
	// ---------------
	totalPages -= 1;
	
	if (totalPages < 15) {document.getElementById("schemaTabBarAddButton").style.display='flex'; };

	// Suppression de l'onglet
	// -----------------------
	var idBoutonClicke = this.id;		

	var Sibc = new String(idBoutonClicke);				// Récupération du n° de page
	var lpnid = Sibc.length;		
	var nPage = Sibc.substr(25, lpnid-25); 	
	
	var tabClicke = document.getElementById('schemaTabBarPageBlock_' + nPage);		
	tabClicke.parentNode.removeChild(tabClicke);		// Suppression de l'onglet
	
	console.log('deletePageProcessing :\n...tabClicke = ' + tabClicke + ' | idBoutonClicke = ' +  idBoutonClicke); 

	// Suppression de la page dans le DOM
	// ----------------------------------
	var smabn = document.getElementById('schemaMainAreaBlock_' + nPage);		
	smabn.parentNode.removeChild(smabn);
	
	var sfebn = document.getElementById('schemaFooterEmptyBlock_' + nPage);
	sfebn.parentNode.removeChild(sfebn);
		
	var sffbn = document.getElementById('schemaFooterFilledBlock_' + nPage);
	sffbn.parentNode.removeChild(sffbn);
		
	console.log('deletePageProcessing :\n...smabn = ' + smabn.id + '\n...sfebn = ' + sfebn.id + '\n...sffbn = ' + sffbn.id); 	
		
	// Suppression de la page dans les tableaux
	// ----------------------------------------
	var ptl = pagesTable.length

	for(var i = 0; i < pagesTable.length; i++) {
				
		console.log('deletePageProcessing :\n...pagesTable[' + i + '] = ' +  pagesTable[i]);
		
		if (pagesTable[i] == nPage) { 
			pagesTable.splice(i,1);  	// Tableau des n° de page
			navPanTable.splice(i,1); 	// Tableau des nav.panels
			footerTable.splice(i,1); 	// Tableau des footers
			break; 
		}		
	}
	
	// Si on vient de supprimer la dernière page, remettre les blocs "Init"
	// --------------------------------------------------------------------
	if (totalPages == 0)	{
		console.log('deletePageProcessing :\n...totalPages = ' +  totalPages);

		document.getElementById("schemaMainAreaInitBlock").style.display = 'flex';
		document.getElementById("schemaFooterInitBlock").style.display = 'flex';
	}
	
	// Si on vient de supprimer LA page sélectionnée, remettre les blocs "Init"
	// ------------------------------------------------------------------------
	if (nPage == selectedPage) {
		console.log('deletePageProcessing :\n...nPage = ' +  nPage  + ' | selectedPage = ' + selectedPage);

		document.getElementById("schemaMainAreaInitBlock").style.display = 'flex';
		document.getElementById("schemaFooterInitBlock").style.display = 'flex';
		
		selectedPage = '000';  // et RAZ du n° de page sélectionnée
	}
	
	// Mise à jour de la liste des éléments
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	var iPage  = '000';
	var itemBlock = '';
	
	for (var i = 0, c = itemsList.length ; i < c; i++) {
		
		iPage  = itemsList[i].substring(3,0);
		
		if (iPage == nPage) {
			itemBlock = document.getElementById(itemsList[i].substring(0,8));
			itemBlock.parentNode.removeChild(itemBlock);	
			itemsList.splice(i,1);		// Suppression de l'item du tableau (1 élément)
			
			i -= 1;	// Un pas en arrière car on vient de supprimer un élément du tableau	
			c -= 1;
		}
	}
	
	console.log('deletePageProcessing :\n...item = ' + item + '\n...itemsList = ' + itemsList);
}


/* ==================================================================================== */
/* Suppression du panneau de navigation	 												*/
/* ==================================================================================== */

function deleteNavPanProcessing()	
{
	// Affichage du bloc 
	// -----------------
	document.getElementById("schemaNavPanEmptyBlock_"  + selectedPage).style.display='flex';	// Faire apparaître le "bloc en mode non créé" 
	document.getElementById("schemaNavPanFilledBlock_" + selectedPage).style.display='none';	// Faire disparaitre le "bloc en mode créé" 
	
	// Restitution du libellé par défaut dans le schéma
	// ------------------------------------------------
	document.getElementById(selectedPage + '_0000_Label').firstChild.nodeValue = formatItemName(navPanName,selectedPage,-1);	

	// Sauvegarde dans le tableau de présence des Nav.pan
	// --------------------------------------------------
	navPanTable[indexPage]	= 'empty';		console.log('deleteNavPanProcessing :\n...selectedPage = '   + selectedPage + ' | indexPage = ' + indexPage);	
	
	// Mise à jour de la liste des éléments
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	
	var iPage  = '000';
	var iBlock = '0000';
				
	for (var i = 0, c = itemsList.length ; i < c; i++) {
		
		console.log('deleteNavPanProcessing :\n...i = ' + i + ' | iPage = '  + iPage + ' | iBlock = '  + iBlock + ' | c = '  + c);
		
		iPage  = itemsList[i].substring(3,0); 
		iBlock = itemsList[i].substring(4,8); 	
		
		if (iPage == selectedPage && iBlock == '0000' ) {
			
			itemBlock = document.getElementById(itemsList[i].substring(0,8)); 
			itemBlock.parentNode.removeChild(itemBlock);	
			
			itemsList.splice(i,1);		// Suppression de l'item du tableau (1 élément)
			break;
		}
	}
	
	console.log('deleteNavPanProcessing :\n...item = ' + item + '\n...itemsList = ' + itemsList);
}


/* ==================================================================================== */
/* Suppression d'un bloc	 		 													*/
/* ==================================================================================== */

function deleteBlockProcessing()	
{
	// Initialisations
	// ---------------
	totalBlocks -= 1;
	
	// if (totalBlocks < 40) {document.getElementById("schemaBlockAddButton_" + selectedPage).style.display='flex'; };
	
	var idBoutonClicke = this.id;					
	var classBoutonClicke = this.className;			

	var blocClicke = document.getElementById(idBoutonClicke).parentNode;	// Récupération du bloc contenant le bouton cliqué

	var idBlocClicke = blocClicke.id;	// Récupération de l'Id de ce bloc (pour test)     
	
	blocClicke.parentNode.removeChild(blocClicke);	// Suppression du bloc cliqué
	
	nbbkPad = idBlocClicke.substring(16,20);	// Récupération du n° de block
	
	
	// Mise à jour de la liste des éléments
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	
	var iPage  = '000';
	var iBlock = '0000';
				
	for (var i = 0, c = itemsList.length ; i < c; i++) {
		
		console.log('deleteBlockProcessing :\n...i = ' + i + ' | iPage = '  + iPage + ' | iBlock = '  + iBlock + ' | c = '  + c);
		
		iPage  = itemsList[i].substring(3,0); 
		iBlock = itemsList[i].substring(4,8); 	
		
		if (iPage = selectedPage && iBlock == nbbkPad ) {
			
			itemBlock = document.getElementById(itemsList[i].substring(0,8));  
			itemBlock.parentNode.removeChild(itemBlock);
			
			itemsList.splice(i,1);		// Suppression de l'item du tableau (1 élément)
			break;
		}
	}
	
	console.log('deleteBlockProcessing :\n...item = ' + item + '\n...itemsList = ' + itemsList);
}


/* ==================================================================================== */
/* Suppression du pied de page		 	 												*/
/* ==================================================================================== */

function deleteFooterProcessing()	
{
	// Affichage du bloc 
	// -----------------
	document.getElementById("schemaFooterEmptyBlock_"  + selectedPage).style.display='flex';	// Faire apparaître le "bloc en mode non créé" 
	document.getElementById("schemaFooterFilledBlock_" + selectedPage).style.display='none';	// Faire disparaitre le "bloc en mode créé" 

	// Restitution du libellé par défaut dans le schéma
	// ------------------------------------------------
	document.getElementById(selectedPage + '_9999_Label').firstChild.nodeValue = formatItemName(footerName,selectedPage,-1);
	
	// Sauvegarde dans le tableau de présence des Footer
	// --------------------------------------------------
	footerTable[indexPage]	= 'empty';
		
	// Mise à jour de la liste des éléments
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	var iPage  = '000';
	var iBlock = '0000';
				
	for (var i = 0, c = itemsList.length ; i < c; i++) {
		
		console.log('deleteFooterProcessing :\n...i = ' + i + ' | iPage = '  + iPage + ' | iBlock = '  + iBlock + ' | c = '  + c);
		
		iPage  = itemsList[i].substring(3,0); 
		iBlock = itemsList[i].substring(4,8); 	
		
		if ( (iPage == selectedPage) && (iBlock == '9999') ) {
			itemBlock = document.getElementById(itemsList[i].substring(0,8)); 
			itemBlock.parentNode.removeChild(itemBlock);	
			itemsList.splice(i,1);		// Suppression de l'item du tableau (1 élément)
			break;
		}
	}
	
	console.log('deleteFooterProcessing :\n...item = ' + item + '\n...itemsList = ' + itemsList);
}

/* ==================================================================================== */
/* ==================================================================================== */
/* =====================================  DIVERS  ===================================== */
/* ==================================================================================== */
/* ==================================================================================== */

/* ==================================================================================== */
/* Volet gauche de l'écran : bouton "Déplier-Replier" 									*/
/* ==================================================================================== */

function manageNav()
{

/* Récupérer la largeur du volet */	

	var elb     = document.getElementById("itemsListBlock");	
	var taille 	= parseInt(window.getComputedStyle(elb,null).getPropertyValue("width"));
	var elmb    = document.getElementById("itemsListMainBlock");	
	var elhl    = document.getElementById("itemsListHeaderLabel");	


/* Agrandir ou retrécir la largeur du volet, et faire apparaitre ou disparaitre le contenu */	

	if(taille > 48)
	{
		elb.style.width='30px';
		elmb.style.display='none';
		elhl.style.display='none';
	}
	else
	{
		elb.style.width='300px';	
		elmb.style.display='flex';	
		elhl.style.display='flex';		
	}
}

/* ==================================================================================== */
/* Modification d'un item de la liste	 												*/
/* ==================================================================================== */

function modificationItem(item)	
{
	// Cas particulier du nom de la transaction
	// ----------------------------------------
	if(item == 0){
		var tName = document.getElementById("itemTransactionInputField").value;
		if (tName.trim() == '') {tName = "???"};
		document.getElementById("schemaTitleBarBlock").firstChild.nodeValue = tName;
		// Stockage en mémoire
		localStorage.setItem("transactionNameLS", tName);
		return;}
		
	// Récupérer l'item dans la liste du volet gauche
	// ----------------------------------------------
	var itemObject = document.getElementById(item.substring(0,8) +  '_Input');	
	console.log('modificationItem :\n...item = ' + item + ' | value = ' + itemObject.value); // = texte saisi
	
	if (itemObject.value.trim() == '') {itemObject.value = "???"};

		
	// Récupérer le libellé correspondant dans le schéma
	// -------------------------------------------------
	var schemaObject = document.getElementById(item.substring(0,8) + '_Label');	
 
	// Création d'un noeud contenant le texte saisi
	// --------------------------------------------
	var texte = document.createTextNode(itemObject.value);	
	
	// Récupération du type du dernier noeud du conteneur du texte
	// -----------------------------------------------------------
	var lastType = schemaObject.lastChild.nodeType;					
	console.log('modificationItem :\n...lastType = ' + lastType );

	if (lastType == 1) {					
		schemaObject.appendChild(texte);								// Le dernier enfant n'est pas du texte --> on ajoute
	} else {
		schemaObject.replaceChild(texte, schemaObject.lastChild);	// Sinon on remplace
	}  
	
	// Mise à jour du tableau en mémoire (itemsList) : remplacement de la partie de droite par le nouveau libellé 
	// ----------------------------------------------------------------------------------------------------------
	for (var i = 0, c = itemsList.length ; i < c; i++) {
		if (itemsList[i].substring(0,8) == item.substring(0,8)) {
			itemsList[i] = itemsList[i].substring(0,8) + '_' + itemObject.value;	
			break;
		}
	}
	
	console.log('modificationItem :\n...itemsList [' + i + '] = ' + itemsList[i]);
}

/* ==================================================================================== */
/* Sélection d'une page 																*/
/* ==================================================================================== */

function selectPageProcessing()	
{
	// Récupérer TOUS les éléments "onglet" et leur remettre la couleur "white"
	// ------------------------------------------------------------------------
	var tableTabs = document.getElementsByClassName("tabBarBlock");

	for (var i = 0, c = tableTabs.length ; i < c; i++) {
		
		var tti = document.getElementById(tableTabs[i].id);
		if (tti !== null) {tti.style.backgroundColor = tabColor};
	}
		
	// Repérer l'élément cliqué et modifier la couleur de l'onglet cliqué
	// ------------------------------------------------------------------------
	var idLabelClick = this.id;											

	var pn = document.getElementById(idLabelClick).parentNode
	pn.style.backgroundColor = selectedTabColor;	

	console.log('selectPageProcessing :\n...idLabelClick = ' + idLabelClick);
			
	// Récupérer le n° de page formatté iii et son indice dans les tableaux de données
	// -------------------------------------------------------------------------------
	var Spnid = new String(pn.id);	
	var lpnid = Spnid.length;		
	var npage = Spnid.substr(22, lpnid-22);
	
	selectedPage = npage;	// Mise à jour du n° de page sélectionnée
	
	for (var i = 0, c = pagesTable.length ; i < c; i++) {
		if (pagesTable[i] == npage) {
			indexPage = i;	
			break;}	
	}
	
	// Masquage des MainArea des éventuelles autres pages	
	// ---------------------------------------------------
	var tableMainArea = document.getElementsByClassName("schemaMainAreaBlock");	
	var smabi  = 'schemaMainAreaBlock_' + npage;
	
	for (var i = 0, c = tableMainArea.length ; i < c; i++) {
		
		var tbai = document.getElementById(tableMainArea[i].id);
				
		if (smabi == tbai.id){
			tbai.style.display ='flex';	
		}else{
			tbai.style.display ='none';}
	}

	// Masquage des footerArea des éventuelles autres pages	
	// ----------------------------------------------------
	var tableFooterEmpty = document.getElementsByClassName("schemaFooterEmptyBlock");	// Footer "Empty"
	var sfebi  = 'schemaFooterEmptyBlock_' + npage;	

	for (var i = 0, c = tableFooterEmpty.length ; i < c; i++) {
		
		var tfei = document.getElementById(tableFooterEmpty[i].id);
		
		if ((sfebi == tfei.id)  && (footerTable[indexPage] == 'empty') ){
			tfei.style.display ='flex';
		}else{
			tfei.style.display ='none'}		
	}
	
	var tableFooterFilled = document.getElementsByClassName("schemaFooterFilledBlock");		// Footer "Filled"		
	var sffbi  = 'schemaFooterFilledBlock_' + npage;
		
	for (var i = 0, c = tableFooterFilled.length ; i < c; i++) {
		
		var tffi = document.getElementById(tableFooterFilled[i].id);
		
		if ((sffbi == tffi.id)  && (footerTable[indexPage] == 'filled') ){
			tffi.style.display ='flex';		console.log('flex');
		}else{
			tffi.style.display ='none'}		
	}

	// Masquage des blocsArea des blocs "Init"
	// ---------------------------------------
	document.getElementById("schemaMainAreaInitBlock").style.display = 'none';
	document.getElementById("schemaFooterInitBlock").style.display = 'none';
}

/* ======================================================================== */
/* Formattage d'un nom d'item avec n°bloc et/ou n°page						*/
/* ======================================================================== */

function formatItemName(txt, ppp, bbb)
{
	var indexP = -1;
	var indexB = -1;
	
	if(ppp !== -1) {indexP = txt.indexOf('&p');}	// Recherche du wildcard "n° de page"
	if(bbb !== -1) {indexB = txt.indexOf('&b');}	// Recherche du wildcard "n° de bloc"
	
	console.log('formatItemName :\n...txt = ' + txt + '\n...bbb = ' + bbb + '\n...ppp = ' + ppp + '\n...indexB = ' + indexB + '\n...indexP = ' + indexP);
	
	if(indexB == -1 && indexP == -1) 		// Aucun des deux
		{return txt}
	
	else if(indexB !== -1 && indexP !== -1) {	// Les deux sont présents
		if(indexP > indexB)
			{return(txt.substring(0,indexB) + bbb + txt.substring(indexB + 2,indexP) + ppp + txt.substring(indexP + 2) )}
		else 
			{return(txt.substring(0,indexP) + ppp + txt.substring(indexP + 2,indexB) + bbb + txt.substring(indexB + 2) )}
		}
		
	else if(indexB !== -1)	// N° de bloc seul
		{return(txt.substring(0,indexB) + bbb + txt.substring(indexB + 2));}
	
	else if(indexP !== -1)	// N° de page seul
		{return(txt.substring(0,indexP) + ppp + txt.substring(indexP + 2));}
	
	else	
		{return("BUG")}
		
}	

/* ======================================================================== */
/* Test bidon : récupération des dimensions de l'écran 						*/
/* ======================================================================== */

function testScreenSize()
{
	alert( 	'Taille écran physique l,L : ' + screen.width + ' ' + screen.height + '\n' +
			'Taille de la fenêtre     l,L : ' + window.innerWidth + ' ' + window.innerHeight	);	/**/
}


