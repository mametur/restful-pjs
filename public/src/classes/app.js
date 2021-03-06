import { handlerCheckTodo } from '../handlers/checkedTask.js';
import { handlerDeleteTodo } from '../handlers/deletetask.js';
import { restFulMethods } from '../restful/restful.js';

export class app {
	state = [];
	nexId = 0;

	renderTodos(todosArray) {
		const Tbody = document.createElement('tbody');

		for (const todo of todosArray) {
			const trEl = document.createElement('tr');
			trEl.className = 'today-row';
			const DivEl = document.createElement('div');
			DivEl.className = 'row';
			const divElSecond = document.createElement('div');
			divElSecond.className = 'col-1';

			const TdEl = document.createElement('td');
			const checkBoxEl = document.createElement('input');
			checkBoxEl.type = 'checkbox';
			checkBoxEl.addEventListener('click', handlerCheckTodo);

			checkBoxEl.dataset.index = todo.id;

			TdEl.appendChild(checkBoxEl);
			divElSecond.appendChild(TdEl);

			const divElThird = document.createElement('div');
			divElThird.dataset.index = todo.id;
			divElThird.classList.add('col-10');
			divElThird.classList.add('wrapper-input');
			const inputEl = document.createElement('input');
			inputEl.type = 'text';
			inputEl.addEventListener('change', this.modifyTodoList.bind(this));
			inputEl.placeholder = todo.todoText;
			inputEl.dataset.index = todo.id;

			divElThird.appendChild(inputEl);

			if (todo.completed) {
				checkBoxEl.setAttribute('checked', true);
				inputEl.className = 'line-through';
			}

			const divElFourth = document.createElement('div');
			divElFourth.className = 'col-1 p-0';
			divElFourth.dataset.index = todo.id;

			const tdElLast = document.createElement('td');
			const iEl = document.createElement('i');
			iEl.className = 'fa fa-times';
			tdElLast.appendChild(iEl);
			divElFourth.appendChild(tdElLast);
			tdElLast.addEventListener('click', handlerDeleteTodo);

			DivEl.appendChild(divElSecond);
			DivEl.appendChild(divElThird);
			DivEl.appendChild(divElFourth);

			trEl.appendChild(DivEl);
			Tbody.appendChild(trEl);
		}

		return Tbody;
	}

	set setFetchedData(data) {
		this.state = [...data];
	}

	get allData() {
		return this.state;
	}

	findLastId(data) {
		const lastId = [];
		for (const key of data) {
			lastId.push(key.id);
		}
		lastId.sort(function (a, b) {
			return a - b;
		});
		this.nexId = lastId[lastId.length - 1];
	}

	get lastId() {
		return this.nexId;
	}

	modifyTodoList(event) {
		const target = event.target.value;

		const id = event.target.dataset.index;

		restFulMethods.patchTodo(id, { 'todoText': target, 'id': target });
	}
}
