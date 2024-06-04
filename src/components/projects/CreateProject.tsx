import React, { useContext, useState } from "react";
import { createProject } from "../../store/reducers/projectModule";
import { Project } from "../../models/Projects";
import { useAppDispatch } from "../../store/rootReducer";
import { AuthContext } from "../../Context/AuthProvider";

const CreateProject: React.FC = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContent(e.target.value);
  };
  const handleFirstNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLastName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProject: Project = {
      title: title,
      content: content,
      authorFirstName: firstName,
      authorLastName: lastName,
      userId: user?.email ?? "undefined",
    };

    dispatch(createProject(newProject));
  };

  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Create a New Project</h5>
        <div className="input-field">
          <input type="text" id="title" onChange={handleTitleChange} />
          <label htmlFor="title">Project Title</label>
        </div>
        <div className="input-field">
          <input type="text" id="firstname" onChange={handleFirstNameChange} />
          <label htmlFor="title">Author FirstName</label>
        </div>
        <div className="input-field">
          <input type="text" id="lastname" onChange={handleLastNameChange} />
          <label htmlFor="title">Author LastName</label>
        </div>
        <div className="input-field">
          <textarea
            id="content"
            className="materialize-textarea"
            onChange={handleDescriptionChange}
          ></textarea>
          <label htmlFor="content">Project Content</label>
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
