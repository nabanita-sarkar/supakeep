import { TextInput } from "@mantine/core";
import SlateEditor from "components/SlateEditor";
import { useLocation } from "react-router-dom";
import { useNote } from "utils/services";
import styles from "./Note.module.scss";

function Note() {
  const { pathname } = useLocation();
  const id = pathname.replace("/", "");
  const note = useNote(id);

  return (
    <div className={styles.container}>
      <TextInput
        placeholder="Title"
        aria-label="Title"
        classNames={{ input: styles.title }}
        variant="unstyled"
        value={note.data?.title}
      />
      <SlateEditor />
    </div>
  );
}

export default Note;
