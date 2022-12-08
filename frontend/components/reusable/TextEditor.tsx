import React from 'react';
import {ContentState, Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

export default function TextEditor({text, reportUpdate}:{text:string, reportUpdate: Function}) {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createWithContent(ContentState.createFromText(text) )
  );

  const updateEditorState = (state:EditorState) => {
    
    setEditorState(state);
    reportUpdate(state.getCurrentContent().getPlainText());

  }



  return <Editor editorState={editorState} onChange={updateEditorState} />;
}