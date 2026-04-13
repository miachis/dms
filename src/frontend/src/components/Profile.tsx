import { useUserContext } from "../contexts/useUserContext";
import styles from "../static/Profile.module.css";
import { useState } from "react";

export function Profile() {
  const { updateProfilePicture, response } = useUserContext();

  const [file, setFile] = useState<File | null>(null);

  const showDialog = () => {
    const dialog = document.getElementById("dialog") as HTMLDialogElement;
    dialog.showModal();
  };

  const closeDialog = () => {
    const dialog = document.getElementById("dialog") as HTMLDialogElement;
    const form = document.getElementById("form") as HTMLFormElement;
    form.reset();
    dialog.close();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      if (response) {
        const apiResponse = await fetch(
          `http://localhost:3000/upload/${response.id}`,
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await apiResponse.json();
        updateProfilePicture(data.response.profilePicture);
        closeDialog();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id={styles.profileContainer}>
      <p id={styles.p}>{response ? response.username : ""}</p>
      <img
        src={
          response?.profilePicture
            ? `${response.profilePicture}`
            : "/profile-picture.png"
        }
        alt="profile_picture"
        className={styles.profilePicture}
      />
      <dialog id="dialog">
        <form id="form" encType="multipart/form-data" onSubmit={uploadFile}>
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
          />
          <button type="submit">Update</button>
          <button type="button" onClick={closeDialog}>
            Close
          </button>
        </form>
      </dialog>
      <button onClick={showDialog}>Change profile picture</button>
    </div>
  );
}
