import React, { useEffect, useState } from "react";
import { Task } from "./task";

export const Todo = () => {
	const [todoVal, setTodoVal] = useState("");
	const [listItems, setListItem] = useState([]);
	const url = "https://assets.breatheco.de/apis/fake/todos/user/wayneb";

	useEffect(() => {
		getTasks();
	}, []);
	//useEffect to get initial todo's from backEnd.

	const putTask = (tasks) => {
		fetch(url, {
			method: "PUT", // or 'POST'
			body: JSON.stringify(tasks), // data can be a `string` or  an {object} which comes from somewhere further above in our application
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then((response) => console.log("Success:", response))
			.catch((error) => console.error(error));
	};

	const getTasks = () => {
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then((jsonResponse) => {
				setListItem(jsonResponse);
			})
			.catch((e) => {
				console.log("Looks like there was a problem:", e);
			});
	};

	// const deleteList = (url) => {
	// 	fetch(url, {
	// 		method: "DELETE",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	});
	// };

	const addTask = (e) => {
		if (e.keyCode == 13 && todoVal != "" && !/^\s*$/.test(todoVal)) {
			let task = {
				label: todoVal.trim(),
				done: false,
			};
			putTask([...listItems, task]);
			setListItem([...listItems, task]);
			setTodoVal("");
		}
	};

	const removeOrMarkTask = (e) => {
		if (e.target.nodeName == "I") {
			listItems.splice(e.target.parentElement.parentElement.id, 1);
			putTask(listItems);
			setListItem([...listItems]);
		}

		if (e.target.nodeName == "LI") {
			let li = listItems[e.target.id];
			if (li.done) li.done = false;
			else li.done = true;
			setListItem([...listItems]);
		}
	};

	return (
		<div>
			<h1 className="display-1 text-center">todo</h1>
			<div className="row mt-3">
				<div className="col-12 col-sm-6 mx-auto">
					<div className="todo paper pb-0 px-3">
						<input
							className="form-control"
							type="text"
							name="todoInput"
							id="todoInput"
							placeholder="What needs to be done?"
							value={todoVal}
							onChange={(e) => setTodoVal(e.target.value)}
							onKeyUp={addTask}
						/>
						<ul
							className="list-group py-2"
							onClick={removeOrMarkTask}>
							{listItems.length > 1 ? (
								listItems.map((task, i) => (
									<Task
										key={i}
										id={i}
										task={task}
										done={task.done}
									/>
								))
							) : (
								<small className="text-muted text-center">
									<em>no tasks</em> &#128546;
								</small>
							)}
						</ul>
						<div className="paper-foot p-0 m-0">
							{listItems.length > 1 ? (
								<small className="count text-muted">
									<em>
										{`${listItems.length - 1} ${
											listItems.length > 1
												? `items`
												: `item`
										} left `}
									</em>
									<span>&#128521;</span>
								</small>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
