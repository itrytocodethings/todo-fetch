import React, { useState } from "react";
import { Task } from "./task";

export const Todo = () => {
	const [todoVal, setTodoVal] = useState("");
	const [listItems, setListItem] = useState([]);

	const addTask = (e) => {
		if (e.keyCode == 13 && todoVal != "" && !/^\s*$/.test(todoVal)) {
			setListItem([...listItems, todoVal.trim()]);
			setTodoVal("");
		}
	};
	const removeTask = (e) => {
		if (e.target.nodeName == "I") {
			listItems.splice(e.target.parentElement.parentElement.id, 1);
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
						<ul className="list-group py-2" onClick={removeTask}>
							{listItems.length > 0 ? (
								listItems.map((task, i) => (
									<Task key={i} id={i} task={task} />
								))
							) : (
								<small className="text-muted text-center">
									<em>no tasks</em> &#128546;
								</small>
							)}
						</ul>
						<div className="paper-foot p-0 m-0">
							{listItems.length > 0 ? (
								<small className="count text-muted">
									<em>
										{`${listItems.length} ${
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