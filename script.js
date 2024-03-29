  let enter_button = document.getElementsByClassName("enter_button")[0];
  let tbody = document.getElementsByTagName("tbody")[0];
  let header = document.getElementsByTagName("header")[0];

  let num = getRandomIntInclusive(1, 3);	//описать?

  let image = document.createElement("img");
  image.setAttribute("src", "images/" + num + "граф.svg");
  if(num == 2){
	  image.style.width = "300px";
  }
  header.after(image);
  
  answer = { 
	1: ['2/1', '4/0', '3/1', '3/1', '8/1', '2/0', '8/1', '4/0',
		'1/0', '7/1', '5/1', '5/0', '6/0', '1/0', '6/1', '7/0'],

	2: ['3/1', '1/0', '1/0', '4/0',
		'4/1', '3/0', '4/1', '3/1'],
		
	3: ['1/0', '2/0', '2/1', '3/1', '3/0', '3/0',
		'6/1', '4/0', '1/1', '2/0', '1/0', '6/1',
		'5/0', '6/1', '3/1', '6/1', '6/1', '3/0']
  };
	
enter_button.onclick = CreateTable;
let valueOfTable = document.getElementsByClassName('valueOfTable');

  //событие нажата кнопка "подтвердить"
let form = document.getElementById("form");
function retrieveFormValue(event) 
{
	event.preventDefault();

	let table_header = document.getElementsByClassName("table_header")[0];
	let endButton = document.getElementsByClassName("body_end_button")[0];
	if(checkForm(form)) {
		table_header.style.display = "flex";
		endButton.style.display = "flex";
	}

	for(let i=0; i<valueOfTable.length; i++){
		valueOfTable[i].onkeydown = changeFocus;
	}
}
form.addEventListener('submit', retrieveFormValue);

  let popup1 = document.getElementsByClassName("pop-up1")[0];
  let popup2 = document.getElementsByClassName("pop-up2")[0];
  let end_button = document.getElementsByClassName("end_button")[0];
  let bOk1 = document.getElementById("bOk1");
  let bOk2 = document.getElementById("bOk2");

   //событие нажата кнопка "отправить ответ"
  let tableForm = document.getElementById("tableForm");
  function retrieveInputValue(event) 
  {
	event.preventDefault(); //отправлять на сервер не нужно

	//сравниваю два массива
	if(isEqual(answer[num], getUserAnswer())) popup1.style.display = "block";
	else if (checkForm(tableForm)) popup2.style.display = "block";;
  }
  tableForm.addEventListener('submit', retrieveInputValue);
bOk1.onclick = function(){popup1.style.display = "none";}
bOk2.onclick = function(){popup2.style.display = "none";}

//-----------------------------Всякие функции---------------------------//

//сравнение двух массивов
function isEqual(a, b) 
{
	if (a.length != b.length) return false;

	for (let i = 0; i < a.length; i++) {
		if (a[i] != b[i]) return false;
	}

	return true;
}

//создание таблицы
function CreateTable() 
{
	let tbody = document.getElementsByTagName("tbody")[0];

	//---------------УДАЛЕНИЕ ранее созданной таблицы----------------
	let t = tbody.rows.length;
	for (i = 0; i < t; i++) {
		tbody.deleteRow(0);
	}

	if (form.input_characters.value > 0 && form.input_states.value > 0 &&
		form.input_characters.value < 21 && form.input_states.value < 21) 
	{
		//первая строка
		let tr1 = document.createElement("tr");
		tr1.setAttribute("class", "first_row");
		tbody.appendChild(tr1);
		//первая ячейка первой строки
		let th1 = document.createElement("th");
		th1.setAttribute("class", "first_col t_1-1");
		th1.textContent = "I/S";
		tr1.appendChild(th1);

		//создание всех ячеек первой строки
		for (i = 0; i < form.input_states.value; i++) 
		{
			let th = document.createElement("th");
			th.textContent = i + 1;
			tr1.appendChild(th);
		}
		//создание остальных строк
		for (i = 0; i < form.input_characters.value; i++)
		{
			let tr = document.createElement("tr");
			tbody.appendChild(tr);

			let th1 = document.createElement("th");
			th1.style.background = "#F8CBADFF";
			th1.textContent = String.fromCharCode(97 + i);
			tr.appendChild(th1);

			for (j = 0; j < form.input_states.value; j++)
			{
				let th = document.createElement("th");
				let input_value = document.createElement("input");

				input_value.setAttribute('class', 'valueOfTable');
				input_value.type = "text";
				input_value.placeholder = '0/0';
				input_value.name = "input_value";
				input_value.autocomplete="off";

				//анимации
				input_value.addEventListener('mouseover', mouseover);
				input_value.addEventListener('mouseout', mouseout);
				input_value.addEventListener('focus', focus);
				input_value.addEventListener('blur', blur);
				//функции анимаций
				function mouseover() {
					input_value.style.background = "#ACFFFFFF";
					input_value.style.transition = "all 0.15s linear 0s";
				}
				function mouseout() {
					input_value.style.background = "#E6FFFAFF";
					input_value.style.transition = "all 0.8s linear 0s";
				}
				function focus() {
					input_value.style.background = "#08eccef3";
					input_value.style.transition = "all 0.1s linear 0s";
					
				}
				function blur() 
				{
					input_value.style.background = "#E6FFFAFF";
					input_value.style.transition = "all 0.5s linear 0s";
				}

				th.appendChild(input_value);
				tr.appendChild(th);
			}
		}	
	}
	//для маски
	$('.valueOfTable').mask('9/9', {placeholder: "_"});
};

//создание массива с ответами пользователя
function getUserAnswer()
{
	let userAnswer = [];
	let k = 0;
	for (let i = 0; i < tbody.children.length - 1; i++) 
	{
		for (let j = 0; j < tbody.children[i + 1].children.length - 1; j++) 
		{
			if((tbody.children.length == 2) && (tbody.children[0].children.length == 2)){
				userAnswer.push(tableForm.elements.input_value.value);
			} else {
				userAnswer.push(tableForm.elements.input_value[k].value);
			}
			k++;
		}
	}
	return userAnswer;
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

  //проверка полей формы на заполненность
function checkForm(form)
{
	let e = 0;
	
	for (var i = 0; i < form.length - 1; i++) 
	{
		form[i].style.border = "none";
		if (!form[i].value.replace(/^\s+|\s+$/g, "")) 
		{
			form[i].style.border = "1px solid red";
			e = 1;
		}
	}
	
	if (e) 
	{
		alert("Заполните все поля");
		return false;
	} else return true;
}

//переход по таблице с помощью стрелок
function changeFocus(e) 
{
	let text = e.code 
	curFocus = document.activeElement;

	for(let i=0; i<valueOfTable.length; i++)
	{
		if(valueOfTable[i] == curFocus)
		{
			if(text == 'ArrowRight'){
				if(i != valueOfTable.length-1) valueOfTable[i+1].focus();
				else(valueOfTable[0].focus());
				break;
			}
			else if(text == 'ArrowLeft'){
				if(i != 0) valueOfTable[i-1].focus();
				else(valueOfTable[valueOfTable.length-1].focus());
				break;
			}
			else if(text == 'ArrowDown'){
				if(i < valueOfTable.length - form.input_states.value) 
					valueOfTable[i+Number(form.input_states.value)].focus();
				break;
			}
			else if(text == 'ArrowUp'){
				if(i > form.input_states.value-1) 
					valueOfTable[i-form.input_states.value].focus();
				break;
			}
		}
	}
}

