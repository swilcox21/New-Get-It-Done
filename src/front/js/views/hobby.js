import "../../styles/home.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Clock from "../component/clock";
import { Context } from "../store/appContext";
import { TodoInfoModal } from "../component/todoInfoModal";

export class Hobby extends React.Component {
	constructor() {
		super();
		this.state = {
			showTodoIndex: false,
			hobby: [],
			todo: "",
			color: "black"
		};
	}

	handleshowTodoIndex = index => this.setState({ showTodoIndex: index });

	componentDidMount() {
		// let value = this.context;
		// console.log(value);
		// this.context.store.hobby && this.setState({ hobby: this.context.store.hobby });
		this.context.actions.getAllTasks();
	}

	componentDidUpdate() {
		this.context.store.hobby.name &&
			this.context.store.hobby.name != this.state.hobby.name &&
			this.setState({ hobby: this.context.store.hobby.name });
	}

	handleChange = e => {
		this.setState({
			todo: e.target.value
		});
	};

	resetTextArea = () => {
		this.setState({ todo: "" });
	};

	// handleSetDone = (t, i) => {
	// 	this.setState(
	// 		this.state.hobby.map((td, ind) => {
	// 			if ((ind === i, this.state.color === "black")) {
	// 				this.setState({ color: "grey" });
	// 			} else if ((ind === i, this.state.color === "grey")) {
	// 				this.setState({ color: "black" });
	// 			}
	// 		})
	// 	);
	// };

	handleSetDone = () => {
		if (this.state.color === "black") {
			this.setState({ color: "grey" });
		} else {
			this.setState({ color: "black" });
		}
	};

	handleComplete = () => {
		if (this.state.hobby.complete === false) {
			return "pl-2 col-10 mt-1 activeTodo";
		} else {
			return "pl-2 col-10 mt-1 activeTodo done done2";
		}
	};

	render() {
		return (
			<Context.Consumer>
				{({ actions, store }) =>
					console.log("this is my state", this.state) || (
						<div className="container text-center">
							<TodoInfoModal
								// key={index}
								// index={index}
								// todo={todo}
								show={this.state.showTodoIndex}
								onClose={() => this.setState({ showTodoIndex: false })}
							/>
							<div className="text-center mt-3 mb-5">New Task</div>
							<textarea
								className="pt-4 pl-2 col-md-6 text-center"
								placeholder="Stop being lazy and JUST DO IT!"
								type="text"
								value={this.state.todo}
								onChange={e => this.handleChange(e)}
							/>
							<div className="mb-3 mt-2">
								<button
									onClick={() => {
										let todo = {
											label: this.state.todo,
											date: actions.todaysDate(),
											completed: false
										};
										actions.addHobby(todo);
										this.resetTextArea();
									}}>
									SUBMIT
								</button>
							</div>

							{store.hobby &&
								store.hobby.map((todo, index) => (
									<div key={index}>
										<div className="d-flex justify-content-around mx-auto col-lg-6">
											<textarea
												className={
													todo.completed === false
														? "pl-2 col-10 mt-1 activeTodo"
														: "pl-2 col-10 mt-1 activeTodo done done2"
												}
												type="text"
												value={todo.label}
												placeholder="dont leave me blank!"
												onChange={e => actions.handleChangeHobby(e, index)}
											/>
										</div>
										<div className="d-flex justify-content-around col-10 col-lg-6 mx-auto">
											<span
												onClick={() => actions.hobbySetComplete(todo, index)}
												className="deleteX text-center mt-2 col-1">
												<i className="fas fa-check" />
											</span>
											<span
												onClick={() => this.handleshowTodoIndex(index)}
												className="deleteX text-center mt-2 col-1">
												<i className="fas fa-info-circle" />
											</span>
											<span
												onClick={() => actions.deleteHobby(index)}
												className="deleteX text-center mt-2 col-1">
												<i className="fab fa-xing" />
											</span>
										</div>
									</div>
								))}
							<div className="container text-center mt-5 clock">
								<Clock />
							</div>
						</div>
					)
				}
			</Context.Consumer>
		);
	}
}

Hobby.contextType = Context;
