import React, { useState } from "react";
import { createProject } from "../../store/reducers/projectModule";
import { Project } from "../../models/Projects";
import { useAppDispatch } from "../../store/rootReducer";

const CreateProject: React.FC = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProject: Project = {
      title: title,
      content: content,
      authorFirstName: "John",
      authorLastName: "Doe",
      userId: "user123", // Replace with the actual user ID
    };

    dispatch(createProject(newProject));

    console.log(title);
    console.log(content);
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
