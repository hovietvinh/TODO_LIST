import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function TinyMCE({ value, onChange }) {
  const editorRef = useRef(null);
  const handleEditorChange = (content, editor) => {
    if (onChange) {
        
        onChange(content); 
    }
  };
  return (
    <Editor
      apiKey='r38xmpya9ojgw292yp0uptd1vxm7e4a2948nj8uy6zmdzzwb'
      onInit={(_evt, editor) => editorRef.current = editor}
      value={value}
      onEditorChange={handleEditorChange}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap preview',
          'anchor searchreplace visualblocks code fullscreen',
          'insertdatetime media table code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        readonly: false
      }}
    />
  );
}

export default TinyMCE;
