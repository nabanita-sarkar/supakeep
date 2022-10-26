import { Button, CloseButton, TextInput } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import Pattern from "components/Pattern";
import SlateEditor from "components/SlateEditor";
import { CustomElement } from "components/SlateEditor/SlateEditor.types";
import { useState } from "react";
import { TbPlus } from "react-icons/tb";
import { Descendant } from "slate";
import { idGen } from "utils/functions";
import { useAllNotes, useUpdateNote } from "utils/services";
import { Note } from "utils/types";
import styles from "./Main.module.scss";

function Main() {
  const initialContent: CustomElement[] = [{ type: "paragraph", children: [{ text: "" }] }];
  const notes = useAllNotes();
  const [isOpen, setIsOpen] = useState(false);

  const [newNote, setNewNote] = useState<Note | null>(null);

  const updateNote = useUpdateNote();
  const queryClient = useQueryClient();

  const updateNoteContent = (value: string | Descendant[], type: "title" | "content") => {
    if (newNote) {
      const note: Note = { ...newNote, [type]: value };
      setNewNote(() => note);
      updateNote.mutate(note);
    }
  };
  const onClose = () => {
    setIsOpen(false);
    setNewNote({ title: "", content: initialContent, tags: [], _id: idGen() });
    queryClient.invalidateQueries(["all-notes"]);
  };

  return (
    <div className={isOpen ? styles["container-shrink"] : styles.container}>
      <div className={styles.wrapper}>
        {notes.data?.map((note) => (
          <button
            onClick={() => {
              setIsOpen(true);
              setNewNote(note);
            }}
            className={styles.card}
            type="button"
            key={note._id}
          >
            <div className={styles["pattern-wrapper"]}>
              <Pattern id={note._id} />
            </div>
            {note.title ? (
              <div className={styles.title}>
                <h5>{note.title}</h5>
              </div>
            ) : null}
            {/* <p>{note.content}</p> */}
            {/* <section className={styles["badges-section"]}>
              {note.tags.map((tag) => (
                <Badge
                  key={tag._id}
                  classNames={{ inner: styles["badge-label"], root: styles.badge }}
                  color={tag.color}
                  variant="dot"
                >
                  {tag.name}
                </Badge>
              ))}
            </section> */}
          </button>
        ))}
        <Button
          onClick={() => {
            setNewNote({ title: "", content: initialContent, tags: [], _id: idGen() });
            setIsOpen(true);
          }}
          className={styles["add-new"]}
        >
          <TbPlus />
          <span>Add new note</span>
        </Button>
      </div>

      <div className={isOpen ? styles.note : styles["note-hidden"]}>
        {newNote ? (
          <>
            <div className={styles["title-area"]}>
              <TextInput
                placeholder="Title"
                aria-label="Title"
                classNames={{ input: styles.title }}
                variant="unstyled"
                value={newNote.title}
                onChange={(e) => updateNoteContent(e.target.value, "title")}
              />
              <CloseButton onClick={onClose} />
            </div>
            <SlateEditor
              key={newNote._id}
              value={newNote.content}
              onChange={(val) => updateNoteContent(val, "content")}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Main;
