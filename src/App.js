import "./App.css";
import ContentEditable from "react-contenteditable";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faIndent,
  faItalic,
  faListOl,
  faListUl,
  faOutdent,
  faStrikethrough,
  faSuperscript,
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
  padding: 6px 8px 4px;
`;

const StyledContentEditable = styled(ContentEditable)`
  margin: 30px;
  outline: none;
`;

function App() {
  console.log("메인 App 갱신");
  const [html, setHtml] = useState(
    `<p>Hello <b>W<i>o<u>rld</u>ㅇ</i>ㅇ</b> !</p><p>Paragraph 2</p>`
  );
  const [optionState, setOptionState] = useState([false, false, false, false]);
  // const [keyList, setKeyList] = useState("initial");
  let keysPressed = {};

  const optionList = ["B", "I", "U", "STRIKE"];

  //Event
  const onChangeHtml = (e) => {
    setHtml(e.target.value);
  };

  const selectText = () => {
    let nodeConstruct = [];
    let selectionText = "";
    let targetNode = null;

    if (document.getSelection) {
      selectionText = document.getSelection();
    } else if (document.selection) {
      selectionText = document.selection.createRange().text;
    }
    console.log(selectionText);
    // console.log(selectionText.getRangeAt(0));
    // console.log(selectionText.getRangeAt(0).cloneContents());
    // const range = selectionText.getRangeAt(0);
    // console.log(range.selectNode(range.startContainer));

    // console.log("텍스트 선택----------------------");

    if (selectionText.anchorOffset < selectionText.focusOffset) {
      targetNode = selectionText.anchorNode;
      console.log("anchor", selectionText.anchorNode);
    } else {
      targetNode = selectionText.focusNode;
      console.log("focus", selectionText.focusNode);
    }

    console.log("전", nodeConstruct);
    console.log(targetNode);

    if (targetNode !== null) {
      while (
        targetNode.parentNode.nodeName === "U" ||
        targetNode.parentNode.nodeName === "I" ||
        targetNode.parentNode.nodeName === "B" ||
        targetNode.parentNode.nodeName === "STRIKE"
      ) {
        nodeConstruct.push(targetNode.parentNode.nodeName);
        targetNode = targetNode.parentNode;
      }

      console.log("전처리 전", nodeConstruct);
      let temp = new Array(4).fill(false);
      optionList.forEach((option, index) => {
        if (nodeConstruct.indexOf(option) !== -1) {
          temp[index] = true;
        } else {
          temp[index] = false;
        }
      });
      console.log(nodeConstruct);
      console.log("temp", temp);
      setOptionState(temp);

      return temp;
    }
  };

  const onMouseUpText = () => {
    // Console.current.innerText = selectText();
    selectText();
  };

  const onKeyUpText = (e) => {
    // console.log(keyList);
    delete keysPressed[e.key];
  };

  const onKeyDownKey = (e) => {
    keysPressed[e.key] = true;

    if (keysPressed["Shift"] && e.key === "Tab") {
      e.preventDefault();
      document.execCommand("outdent", false, null);
    } else if (keysPressed["Tab"]) {
      e.preventDefault();
      document.execCommand("indent", false, null);
    }
  };

  return (
    <EditorBlock>
      <EditorBtns onClick={selectText}>
        <EditButton cmd="bold" isClicked={optionState[0]}>
          <FontAwesomeIcon icon={faBold} />
        </EditButton>
        <EditButton cmd="italic" isClicked={optionState[1]}>
          <FontAwesomeIcon icon={faItalic} />
        </EditButton>
        <EditButton cmd="underline" isClicked={optionState[2]}>
          <FontAwesomeIcon icon={faUnderline} />
        </EditButton>
        <EditButton cmd="strikeThrough" isClicked={optionState[3]}>
          <FontAwesomeIcon icon={faStrikethrough} />
        </EditButton>
        <Divider />

        <EditButton cmd="insertOrderedList" isClicked={optionState[3]}>
          <FontAwesomeIcon icon={faListOl} />
        </EditButton>
        <EditButton cmd="insertUnorderedList" isClicked={optionState[3]}>
          <FontAwesomeIcon icon={faListUl} />
        </EditButton>
        <EditButton cmd="indent" isClicked={optionState[3]}>
          <FontAwesomeIcon icon={faIndent} />
        </EditButton>
        <EditButton cmd="outdent" isClicked={optionState[3]}>
          <FontAwesomeIcon icon={faOutdent} />
        </EditButton>
        <Divider />

        <EditButton cmd="superscript" isClicked={optionState[3]}>
          <FontAwesomeIcon icon={faSuperscript} />
        </EditButton>
        <EditButton cmd="fontSize" isClicked={optionState[3]} arg={7}>
          <FontAwesomeIcon icon={faSuperscript} />
        </EditButton>
        <EditButton cmd="superscript" isClicked={optionState[3]}>
          <FontAwesomeIcon icon={faSuperscript} />
        </EditButton>
        {/* <button onClick={() => alert(keyList)}>확인</button> */}
      </EditorBtns>

      <StyledContentEditable
        html={html}
        onChange={onChangeHtml}
        onMouseUp={onMouseUpText}
        onKeyUp={onKeyUpText}
        onKeyDown={onKeyDownKey}
      />
    </EditorBlock>
  );
}

const EditButton = React.memo(function EditButton({
  cmd,
  isClicked,
  arg,
  children,
}) {
  return (
    <EditBtn
      key={cmd}
      onMouseDown={(evt) => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(cmd, false, arg); // Send the command to the browser
      }}
      isClicked={isClicked}
    >
      {children}
    </EditBtn>
  );
});

const EditBtn = styled.button`
  /* display: flex; */
  /* flex-direction: row; */
  /* justify-content: center; */
  /* align-items: center; */
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #e5e5e5;
    border: 1px solid #bcbcbc;
  }

  ${(props) =>
    props.isClicked
      ? css`
          background-color: #ffffff;
          border: 1px solid #bcbcbc;
        `
      : css`
          background-color: #f8f8f8;
          border: 1px solid #f8f8f8;
        `}
`;

const Divider = styled.div`
  width: 1px;
  background-color: #d1d1d1;
  margin: 0 2px;
`;

export default App;
