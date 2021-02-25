const {form} = document.forms;
  
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

  let enter_button = document.getElementsByClassName("enter_button")[0];
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
			//добавить анимацию?
			input_value.setAttribute('class', 'valueOfTable');
			input_value.type = "text";
			input_value.placeholder = '0/0';
			th.appendChild(input_value);
			tr.appendChild(th);
		}
      }
  };
  enter_button.onclick = CreateTable;

  

  function checkForm(form){
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
