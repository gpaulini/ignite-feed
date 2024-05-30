import styles from "./Reply.module.css";
import { useEffect, useState } from "react";
import { ArrowBendUpLeft, ThumbsUp, Trash } from "phosphor-react";

export const Reply = ({ author, content, datePublished, likes, owner }) => {
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(likes);
  const [removePopup, setRemovePopup] = useState(false);

  const handleRemoveComment = () => {
    setRemovePopup(false);
    alert("A remover comentário...");
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const formatDateToReadable = (date) => {
    const months = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const current = new Date();
    const currentYear = current.getFullYear();

    const d = new Date(date);
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");

    return `${day} de ${month}${
      year !== currentYear ? " de " + year : ""
    }, às ${hours}:${minutes}`;
  };

  const formatDateToDescriptive = (date) => {
    const now = new Date();
    const d = new Date(date);
    const diffInMs = now - d;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let result = "";

    if (seconds < 60) {
      result = `Agora mesmo`;
    } else if (minutes < 60) {
      result = `Há ${minutes} minuto${minutes > 1 ? "s" : ""} atrás`;
    } else if (hours < 24) {
      result = `Há ${hours} hora${hours > 1 ? "s" : ""} atrás`;
    } else if (days < 30) {
      result = `Há ${days} dia${days > 1 ? "s" : ""} atrás`;
    } else if (months < 12) {
      result = `Há ${months} ${months > 1 ? "meses" : "mês"} atrás`;
    } else {
      result = `Há ${years} ano${years > 1 ? "s" : ""} atrás`;
    }

    return result;
  };

  const defaultAvatar =
    "https://images.unsplash.com/photo-1530840197133-665af68f9d71?q=40&w=300&auto=format&fit=crop";

  useEffect(() => {
    setTotalLikes(liked ? likes + 1 : likes);
  }, [liked]);

  return (
    <>
      <div className={styles.reply}>
        <img src={author.avatar || defaultAvatar} />
        <div>
          <div className={styles.contentWrapper}>
            <div className={styles.contentHeader}>
              <div>
                <strong>{author.name}</strong>
                <time
                  title={formatDateToReadable(datePublished)}
                  dateTime={datePublished}
                >
                  {formatDateToDescriptive(datePublished)}
                </time>
              </div>
              {owner && (
                <span className={styles.trashIcon}>
                  <Trash size={24} onClick={() => setRemovePopup(true)} />
                </span>
              )}
            </div>
            <p>{content}</p>
          </div>
          <div className={styles.replyOptions}>
            <button
              className={`${styles.likeButton} ${liked ? styles.active : ""}`}
              onClick={handleLike}
            >
              <ThumbsUp size={20} /> Gostei • {totalLikes}
            </button>
            <button className={styles.replyButton}>
              <ArrowBendUpLeft size={20} /> Responder
            </button>
          </div>
        </div>
      </div>

      {removePopup && (
        <div className={styles.removePopupShadow}>
          <div className={styles.removePopup}>
            <h3>Excluir comentário</h3>
            <p>Você tem certeza que gostaria de excluir esse comentário?</p>
            <div className={styles.removePopupOptions}>
              <button onClick={() => setRemovePopup(false)}>Cancelar</button>
              <button
                onClick={handleRemoveComment}
                className={styles.removeButton}
              >
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
