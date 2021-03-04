  let enter_button = document.getElementsByClassName("enter_button")[0];
  let tbody = document.getElementsByTagName("tbody")[0];
  
  let answer = ['2/1', '4/0', '3/1', '3/1', '8/1', '2/0', '8/1', '4/0',
				'1/0', '7/1', '5/1', '5/0', '6/0', '1/0', '6/1', '7/0']
	
  enter_button.onclick = CreateTable;

  //событие нажата кнопка "подтвердить"
  let form = document.getElementById("form");
  function retrieveFormValue(event) 
  {
	event.preventDefault();
  
	const {
	  input_states,
	  input_characters
	} = form;
  
	const values = {
	  states: input_states.value,
	  characters: input_characters.value,
	};
  
	console.log(values);
	checkForm(form);
  }
  form.addEventListener('submit', retrieveFormValue);

   //событие нажата кнопка "отправить ответ"
  let tableForm = document.getElementById("tableForm");
  function retrieveInputValue(event) 
  {
	event.preventDefault(); //отправлять на сервер не нужно

	//сравниваю два массива
	if(isEqual(answer, getUserAnswer())) alert("Correct answer");
	else if (checkForm(tableForm)) alert("Incorrect answer! Try it again.");
  }
  tableForm.addEventListener('submit', retrieveInputValue);

//-----------------------------Всякие функции---------------------------//

//сравнение двух массивов
  function isEqual(a, b)
  {
	  if(a.length != b.length) return false;

	  for(let i=0; i<a.length; i++){
		  if(a[i] != b[i]) return false;
	  }

	  return true;
  }

//создание таблицы
  function CreateTable() 
  {
	  let tbody = document.getElementsByTagName("tbody")[0];
	  
	  //---------------УДАЛЕНИЕ ранее созданной таблицы----------------
	  let t = tbody.rows.length;
	  for(i=0; i<t; i++) {
		  tbody.deleteRow(0);
	  }
	 
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
	  for(i=0; i<form.input_states.value; i++)
	  {
		  let th = document.createElement("th");
		  th.textContent = i+1;
		  tr1.appendChild(th);
	  }
	  //создание остальных строк
	  for (i = 0; i < form.input_characters.value; i++) 
	  {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);

		let th1 = document.createElement("th");
		th1.style.background =  "#F8CBADFF";
		th1.textContent = String.fromCharCode(97 + i);
		tr.appendChild(th1);

        for(j=0; j<form.input_states.value; j++)
        {
			let th = document.createElement("th");
			let input_value = document.createElement("input");

			input_value.setAttribute('class', 'valueOfTable');
			input_value.type = "text";
			input_value.placeholder = '0/0';
			input_value.name = "input_value";
			input_value.addEventListener('mouseover', mouseover);
			input_value.addEventListener('mouseout', mouseout);

			function mouseover(){
				input_value.style.background = "#ACFFFFFF";
				input_value.style.transition = "all 0.2s linear 0s";
			}
			function mouseout(){
				input_value.style.background = "#E6FFFAFF";
				input_value.style.transition = "all 0.5s linear 0s";
			}

			th.appendChild(input_value);
			tr.appendChild(th);
		}
      }
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
			userAnswer.push(tableForm.elements.input_value[k].value);
			k++;
		}
	}
	return userAnswer;
}

  //проверка полей формы на заполненность
function checkForm(form)
{
	let e = 0;
	for (var i = 0; i < form.length - 1; i++) 
	{
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
