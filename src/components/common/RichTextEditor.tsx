import { useEffect } from "react";
import { useQuill } from "react-quilljs";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const RichTextEditor = ({
  onChange,
  defaultValue,
    placeholder,
    className
}: {
  onChange: (value: string) => void;
  defaultValue: string;
  className?:string
  placeholder?:string
}) => {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: toolbarOptions,
    },
    placeholder:placeholder??"Enter body"
  });

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(defaultValue);
      quill.on("text-change", (delta, oldDelta, source) => {
        onChange(quill.root.innerHTML);
        // console.log("Text change!");
        // console.log(quill.getText()); // Get text only
        // console.log(quill.getContents()); // Get delta contents
        // console.log(quill.root.innerHTML); // Get innerHTML using quill
        // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  return (
    <div id="quillContainer" className={`rounded border max-w-screen-xxl ${className}`}>
      <div
        className="max-w-[950px] border-0"
        style={{ height: "200px",borderWidth:0}}
        ref={quillRef}
      />
    </div>
  );
};

export default RichTextEditor;
