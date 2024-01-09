import { useEdgeStore } from "@/lib/edgestore";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";

type Props = {
  onChange: (value: string) => void;
  content?: string;
  editable?: boolean;
};

const Editor = ({ onChange, content, editable }: Props) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const reponse = await edgestore.publicFiles.upload({
      file,
    });
    return reponse.url;
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: content ? JSON.parse(content) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
