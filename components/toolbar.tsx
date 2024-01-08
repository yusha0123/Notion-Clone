import { Doc } from "@/convex/_generated/dataModel";
import IconPicker from "./icon-picker";
import { Button } from "@/components/ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";
import useCoverImage from "@/hooks/use-cover-image";

type Props = {
  data: Doc<"documents">;
  preview?: boolean;
};

const Toolbar = ({ data, preview }: Props) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(data.title);
  const update = useMutation(api.documents.updateDocument);
  const removeIcon = useMutation(api.documents.removeIcon);
  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setValue(data.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: data._id,
      title: value || "Untitled",
    });
  };

  const handleIconSelect = (icon: string) => {
    update({
      id: data._id,
      icon,
    });
  };

  const handleRemoveIcon = () => {
    removeIcon({
      id: data._id,
    });
  };

  return (
    <div className="pl-[54px] group relative">
      {!!data && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={handleIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">{data.icon} </p>
          </IconPicker>
          <Button
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant={"outline"}
            size={"icon"}
            onClick={handleRemoveIcon}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!data.icon && preview && <p className="text-6xl pt-6">{data.icon}</p>}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!data.icon && !preview && (
          <IconPicker asChild onChange={handleIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!data.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={handleKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {data.title}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
