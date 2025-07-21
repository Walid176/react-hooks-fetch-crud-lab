import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDeleteQuestion(id));
  }

  function handleSelectChange(e) {
    const updatedIndex = parseInt(e.target.value);

   
    const updatedQuestion = { ...question, correctIndex: updatedIndex };
    onUpdateQuestion(updatedQuestion);

    
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: updatedIndex }),
    })
      .then((r) => r.json())
      .then((serverResponse) => {
       
        if (serverResponse.correctIndex !== updatedIndex) {
          onUpdateQuestion(serverResponse);
        }
      });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex.toString()} onChange={handleSelectChange}>
          {answers.map((answer, index) => (
            <option key={index} value={index.toString()}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;