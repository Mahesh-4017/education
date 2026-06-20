"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./popupbutton.module.css";

export default function Popupbutton() {
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const router = useRouter();

  const createFolder = async () => {
    const res = await fetch("/api/create-folder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folderName,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setIsOpen(false);

     router.push(
  `/editor/${encodeURIComponent(folderName)}/index.html`
);
    }
  };

  return (
    <>
      <button
        className={styles.openBtn}
        onClick={() => setIsOpen(true)}
      >
        Start Coding
      </button>

      {isOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={styles.modalBox}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Create Project</h2>

            <input
              type="text"
              placeholder="Project Name"
              value={folderName}
              onChange={(e) =>
                setFolderName(e.target.value)
              }
              className={styles.projectInput}
            />

            <div className={styles.actions}>
              <button
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>

              <button onClick={createFolder}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}