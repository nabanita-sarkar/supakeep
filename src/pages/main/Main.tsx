import { Badge, Button, Card, Modal, Textarea, TextInput } from "@mantine/core";
import Pattern from "components/Pattern";
import React, { useState } from "react";
import { TbPlus } from "react-icons/tb";
import { Link } from "react-router-dom";
import styles from "./Main.module.scss";
import { Note } from "utils/types";
import { useAllNotes, useUpdateNote } from "utils/services";
import { idGen } from "utils/functions";
import { useQueryClient } from "@tanstack/react-query";

function AddNewCard() {
  const [newNote, setNewNote] = useState<Note>({ title: "", content: "", tags: [], _id: idGen() });
  const [isOpen, setIsOpen] = useState(false);

  const updateNote = useUpdateNote();
  const queryClient = useQueryClient();

  return (
    <>
      <Button variant="white" onClick={() => setIsOpen(true)} className={styles["add-new"]}>
        <TbPlus />
        <span>Add new note</span>
      </Button>
      <Modal
        title={
          <TextInput
            placeholder="Title"
            value={newNote.title}
            onChange={(e) => {
              const note = { ...newNote, title: e.target.value };
              setNewNote(note);
              updateNote.mutate(note);
              queryClient.invalidateQueries(["all-notes"]);
            }}
          />
        }
        opened={isOpen}
        onClose={() => {
          setIsOpen(false);
          setNewNote({ title: "", content: "", tags: [], _id: idGen() });
        }}
      >
        <Textarea
          placeholder="Write a note"
          value={newNote.content}
          onChange={(e) => {
            const note = { ...newNote, content: e.target.value };
            setNewNote(note);
            updateNote.mutate(note);
          }}
        />
      </Modal>
    </>
  );
}

function Main() {
  const notes = useAllNotes();

  return (
    <div>
      <div className={styles.container}>
        {notes.data?.map((note) => (
          <Card component={Link} to={`/note/${note._id}`} className={styles.card} shadow="sm" key={note._id}>
            <Card.Section>
              <Pattern id={note._id} />
            </Card.Section>
            {note.title ? (
              <div className={styles.title}>
                <h5>{note.title}</h5>
              </div>
            ) : null}
            <p>{note.content}</p>
            <section className={styles["badges-section"]}>
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
            </section>
          </Card>
        ))}
        <AddNewCard />
      </div>
    </div>
  );
}

export default Main;
