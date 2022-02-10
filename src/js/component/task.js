import React from "react";

export const Task = (props) => {
	return (
		<li
			id={props.id}
			className={`list-group-item ${props.task.done ? "marked" : ""}`}>
			{props.task.label}
			<span className="trash">
				<i className="far fa-trash-alt"></i>
			</span>
		</li>
	);
};
