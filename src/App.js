import "./App.css";
import ContentEditable from "react-contenteditable";
import { useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";

const EditorBlock = styled.div`
  margin: 30px 80px;
  border: 1px solid #d1d1d1;
`;

const EditorBtns = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f8f8f8;
  border-bottom: 1px solid #d1d1d1;
  padding: 6px 8px 2px;
`;

const StyledContentEditable = styled(ContentEditable)`
  margin: 30px;
  outline: none;
`;

function App() {
  const [html, setHtml] = useState(
    `<p>Hello <b>Worldㅇㅇ</b> !</p><p>Paragraph 2</p>`
  );
  const [optionState, setOptionState] = useState([false, false, false]);

  const optionList = ["B", "I", "U"];

  const Console = useRef();

  //Event
  const onChangeHtml = (e) => {
    setHtml(e.target.value);
  };

  function selectText() {
    let nodeConstruct = [];
    let selectionText = "";
    let targetNode = null;

    if (document.getSelection) {
      selectionText = document.getSelection();
    } else if (document.selection) {
      selectionText = document.selection.createRange().text;
    }
    console.log(selectionText);

    targetNode = selectionText.anchorNode;
    while (
      targetNode.parentNode.nodeName === "U" ||
      targetNode.parentNode.nodeName === "I" ||
      targetNode.parentNode.nodeName === "B"
    ) {
      nodeConstruct.push(targetNode.parentNode.nodeName);
      targetNode = targetNode.parentNode;
    }

    let temp = new Array(3).fill(false);
    optionList.forEach((option, index) => {
      console.log(option, index, nodeConstruct.indexOf(option));
      if (nodeConstruct.indexOf(option) !== -1) {
        console.log("true", index);
        temp[index] = true;
      } else {
        console.log("false", index);
        temp[index] = false;
      }
    });
    console.log("temp", temp);
    setOptionState(1);
    console.log(optionState);

    // console.log(selectionText.anchorNode);
    // console.log(selectionText.anchorNode.data);
    // console.log(typeof selectionText.anchorNode.data);
    // console.log(selectionText.anchorNode.data[selectionText.anchorOffset - 1]);
    // console.log(selectionText.anchorNode[selectionText.anchorOffset]);
    // const bool = window.getSelection().containsNode("<b></b>");
    // console.log(bool);
    console.log(targetNode);
    console.log(nodeConstruct);
    return optionState;
  }

  const onMouseUpText = () => {
    Console.current.innerText = selectText();
  };

  const onKeyUpText = (e) => {
    Console.current.innerText = selectText();
    console.log(e.key);
  };
  // #E5E5E5
  return (
    <EditorBlock>
      <EditorBtns>
        <EditButton cmd="Bold">
          <FontAwesomeIcon icon={faBold} />
        </EditButton>
        <EditButton cmd="Italic">
          <FontAwesomeIcon icon={faItalic} />
        </EditButton>
        <EditButton cmd="Underline">
          <FontAwesomeIcon icon={faUnderline} />
        </EditButton>
      </EditorBtns>

      <StyledContentEditable
        html={html}
        onChange={onChangeHtml}
        onMouseUp={onMouseUpText}
        onKeyUp={onKeyUpText}
      />
      <div ref={Console}></div>
    </EditorBlock>
  );
}

function EditButton({ cmd, name, arg, children }) {
  return (
    <EditBtn
      key={cmd}
      onMouseDown={(evt) => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(cmd, false, arg); // Send the command to the browser
      }}
    >
      {children}
    </EditBtn>
  );
}

const EditBtn = styled.button`
  background-color: #f8f8f8;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #e5e5e5;
  }
`;

export default App;
