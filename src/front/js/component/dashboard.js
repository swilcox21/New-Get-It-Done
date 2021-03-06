import "../../styles/home.scss";
import React, { useState, setStore } from "react";
// import { Link } from "react-router-dom";
// import Clock from "../component/clock";
import { Context } from "../store/appContext";
import TextareaAutosize from "react-textarea-autosize";
import { TodoInfoModal } from "./todoInfoModal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import ReactDatePicker from "react-datepicker";
import { CopyToClipboard } from "react-copy-to-clipboard";
import NumericInput from "react-numeric-input";
import dayjs from "dayjs";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import PropTypes from "prop-types";

const Textarea = ({ children, ...props }) => <textarea {...props}>{children}</textarea>;

export class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showTodoIndex: false,
			hobby: [],
			delta: 0,
			status: {
				color: "success",
				message: ""
			},
			selectedDate: null,
			todo: "",
			color: "black",
			priority: 1,
			dateChange: false,
			taskDate: null
		};
	}

	handleChange = e => {
		this.setState({
			todo: e.target.value
		});
	};

	handleChangeNotes = e => {
		this.setState({
			notes: e.target.value
		});
	};

	resetTextArea = () => {
		this.setState({ todo: "" });
	};

	resetTask = () => {
		this.setState({ task: null });
	};

	CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<a
			href=""
			ref={ref}
			onClick={e => {
				e.preventDefault();
				onClick(e);
			}}>
			{children}
			&#x25bc;
		</a>
	));

	CustomMenu = React.forwardRef(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
		const [value, setValue] = useState("");

		return (
			<div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
				<FormControl
					autoFocus
					className="mx-3 my-2 w-auto"
					placeholder="Type to filter..."
					onChange={e => setValue(e.target.value)}
					value={value}
				/>
				<ul className="list-unstyled">
					{React.Children.toArray(children).filter(
						child => !value || child.props.children.toLowerCase().startsWith(value)
					)}
				</ul>
			</div>
		);
	});

	render() {
		const Tag = this.props.autoSize ? TextareaAutosize : Textarea;
		return (
			<Context.Consumer>
				{({ actions, store }) => {
					return (
						<div className="container text-center">
							{this.props.dashboard.map((todo, index) => (
								<div key={todo.id}>
									<div className="d-flex justify-content-around mx-auto col-md-11 activeTodoDiv inputAndTextArea">
										<input
											className="inputTypeNumber text-center"
											type="number"
											min="1"
											max="7"
											defaultValue={todo.priority}
											onChange={e => {
												this.setState({
													task: {
														label: todo.label,
														date: todo.date,
														completed: todo.completed,
														priority: e.target.value
													}
												});
											}}
											onBlur={() => {
												this.state.task && actions.handleChangeHobby(todo.id, this.state.task);
												this.resetTask();
											}}
										/>
										<Tag
											className={`pl-2 col-12 activeTodo ${
												this.props.priority !== 1 ? "onfucus" : "pb-5"
											}`}
											type="text"
											defaultValue={todo.label}
											placeholder="dont leave me blank!"
											onChange={e => {
												this.setState({
													task: {
														label: e.target.value,
														date: todo.date,
														completed: todo.completed,
														priority: todo.priority
													}
												});
											}}
											onBlur={() => {
												this.state.task && actions.handleChangeHobby(todo.id, this.state.task);
												this.resetTask();
											}}
										/>
										<Dropdown className="mt-2 ml-3">
											<Dropdown.Toggle as={this.CustomToggle} id="dropdown-custom-components">
												<button className="dropdowntoggle">
													{todo.date ? (
														dayjs(todo.date).format("M/D")
													) : (
														<i className="fas fa-list" />
													)}
												</button>
											</Dropdown.Toggle>
											<Dropdown.Menu className="mt-1">
												{todo.date && (
													<div>
														<div className="Absolute">
															{dayjs(todo.date).format("MM/DD/YYYY")}
														</div>
														<span>
															<ReactDatePicker
																className={
																	this.state.selectedDate === null
																		? "Opacity newTaskDatePicker"
																		: "newTaskDatePicker"
																}
																selected={
																	this.state.selectedDate &&
																	this.state.selectedDate.toDate()
																}
																onChange={date => {
																	// this.setState({ dateChange: !this.state.dateChange });
																	this.setState({ selectedDate: dayjs(date) });
																	this.setState({
																		task: {
																			label: todo.label,
																			date: date,
																			completed: todo.completed,
																			priority: todo.priority
																		}
																	});
																}}
																minDate={dayjs.new().toDate()}
															/>
														</span>
													</div>
												)}
												{this.state.task && (
													<Dropdown.Item eventKey="1">
														<button
															className=""
															onClick={() => {
																actions.handleChangeHobby(todo.id, this.state.task);
																this.resetTask();
															}}>
															CONFIRM DATE
														</button>
													</Dropdown.Item>
												)}
												<CopyToClipboard className="ml-4" text={todo.label}>
													<button>Copy to clipboard</button>
												</CopyToClipboard>
												<Dropdown.Item
													eventKey="2"
													onClick={() => {
														let task = {
															label: todo.label,
															date: todo.date,
															dashboard: !todo.dashboard,
															priority: todo.priority
														};
														actions.handleChangeHobby(todo.id, task);
													}}>
													<button className="text-center">DASHBOARD</button>
												</Dropdown.Item>
												{/* <CopyToClipboard text={todo.label}>
														COPY TO CLIPBOARD
													</CopyToClipboard> */}
												<Dropdown.Divider />
												<Dropdown.Item eventKey="4">
													<span
														onClick={() => {
															actions.deleteHobby(todo.id);
														}}
														className="deleteX text-center mt-3">
														&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
														<i className="fab fa-xing" />
													</span>
												</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</div>
								</div>
							))}
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}

Dashboard.contextType = Context;

Dashboard.propTypes = {
	priority: PropTypes.number,
	autoSize: PropTypes.bool,
	tasks: PropTypes.array
};
