/**
 * File Name: components/reusable/TextEditor.tsx
 * Author: Dhruv Parthasarathy
 * File Created: Dec, 8th, Thu
 * Last Modified: Dec, 8th, Thu
 * 
 * About: 
 * This file contains the reusable text editor component that can be used
 * Anywhere in the application
 * 
 * Currently this is being used in the individual ticket display page, where the ticket description
 * is displayed
 * 
 * Users can directly place the cursor on the description and continue editing the
 * ticket details
 */

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