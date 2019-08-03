var firebaseConfig = {
	apiKey: "AIzaSyBn1qFhpxz464XZd-Jf6-AlLE71h1ZCRUo",
	authDomain: "crud-elitsoft.firebaseapp.com",
	databaseURL: "https://crud-elitsoft.firebaseio.com",
	projectId: "crud-elitsoft",
	storageBucket: " ",
	messagingSenderId: "591517797525",
  // appId: "1:591517797525:web:73281b786559c824"
};

firebase.initializeApp(firebaseConfig);




window.onload = function(){
	setTimeout (function(){
		$('.preloader').fadeOut(1500);
	}, 500);
	showHotDog();
}


$('.app__button').on('click', function(){
	$('.modal').css({'opacity': '1','z-index': '100'});
});


let cntHD = new Date().getTime();
let form = document.querySelector('.modal__ingridients');
let table = document.querySelector('.modal__table');



form.addEventListener('submit', (e)=>{
	var rool = $('#rool').val();
	var sausage = $('#sausage').val();
	var ingridients = $('#ingridients').val();
	e.preventDefault();
	newHotDog(rool, sausage, ingridients);
	form.reset();
});


function newHotDog(rool, sausage, ingridients){
	cntHD++;
	var hotdog = {
		rool: rool,
		sausage: sausage,
		ingridients: ingridients,
		id: cntHD
	}	
	let db = firebase.database().ref("hotdog/"+cntHD);
	db.set(hotdog);
	table.innerHTML='';
	showHotDog();
}


function showHotDog(){
	let hotDogs = firebase.database().ref("hotdog/");
	hotDogs.on("child_added", function(data){
		var hotDogsValue = data.val();
		table.innerHTML+=`
		<li class="modal__item">
		<p>${hotDogsValue.rool} rool with ${hotDogsValue.sausage} sausage and ${hotDogsValue.ingridients}  </p>
		<button onclick="eatHotDog(${hotDogsValue.id})">eat</button>
		<button onclick="editHotDog(${hotDogsValue.id}, '${hotDogsValue.rool}', '${hotDogsValue.sausage}', '${hotDogsValue.ingridients}');showBtn();">edit</button>
		`;
	});
}


function showBtn(){
	$("#editBtn").toggleClass('hidden');
	$("#createBtn").toggleClass('hidden');
}

function editHotDog(id, rool, sausage, ingridients){

	document.querySelector("#editBtn").addEventListener('click', (e)=>{	editHotDog2(id, document.querySelector('#rool').value, document.querySelector('#sausage').value, document.querySelector('#ingridients').value);
	});

	document.querySelector('#rool').value = rool;
	document.querySelector('#sausage').value = sausage;
	document.querySelector('#ingridients').value = ingridients;

	document.querySelector("#createBtn").classList.remove('hidden');
	document.querySelector("#editBtn").classList.add('hidden');

};


function editHotDog2(id, rool, sausage, ingridients){

	var hotDogUpdated = {
		id: id,
		rool: rool,
		sausage: sausage,
		ingridients: ingridients,
	};

	let db = firebase.database().ref("hotdog/"+ id);
	db.set(hotDogUpdated);
	table.innerHTML='';
	showHotDog();

};


function eatHotDog(id){

	if (window.confirm("Really want eat this hotdog?")){

		let db = firebase.database().ref("hotdog/"+id);	
		db.remove();
		table.innerHTML='';
		showHotDog();

	}
};

