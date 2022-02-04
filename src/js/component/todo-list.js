import React, { useState } from "react";

export const Todo = () => {
	const [todoVal, setTodoVal] = useState("");
	const [listItems, setListItem] = useState([]);

	return (
		<div>
			<h1 className="display-1 text-center">todo</h1>
			<div className="row mt-3">
				<div className="col-12 col-sm-3 mx-auto">
					<div className="todo paper">
						<input
							className="form-control"
							type="text"
							name="todoInput"
							id="todoInput"
							placeholder="What needs to be done?"
							value={todoVal}
							onChange={(e) => setTodoVal(e.target.value)}
							onKeyUp={(e) => {
								if (e.keyCode == 13) {
									setListItem([...listItems, todoVal.trim()]);
									setTodoVal("");
								}
							}}
						/>
						<ul
							className="list-group py-2"
							onClick={(e) => {
								if (e.target.nodeName == "I") {
									listItems.splice(
										e.target.parentElement.parentElement.id,
										1
									);
									setListItem([...listItems]);
								}
							}}>
							{listItems.map((task, i) => (
								<li key={i} id={i} className="list-group-item">
									{task}
									<span className="trash">
										<i className="far fa-trash-alt"></i>
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
