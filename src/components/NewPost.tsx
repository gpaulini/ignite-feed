import { useState } from 'react';
import styles from './NewPost.module.css';
import { Plus, PaperPlaneRight, X } from '@phosphor-icons/react';

export const NewPost = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleCreatePost = (event: React.MouseEvent<HTMLElement>) => {
    alert('Publicando post...');
    setShowCreatePost(false);
  };

  const handleShowWritePost = (event: React.MouseEvent<HTMLElement>) => {
    setShowCreatePost(!showCreatePost);
  };

  return (
    <>
      <div className={styles.container}>
        <button className={styles.button} onClick={handleShowWritePost}>
          {!showCreatePost ? <><Plus size={20} /> Criar post</> : <><X size={20} /> Cancelar</>}
        </button>

        {showCreatePost && <section className={styles.createPost}>
          <textarea autoFocus placeholder="Compartilhe suas ideias!"></textarea>
          <button onClick={handleCreatePost} title='Publicar'><PaperPlaneRight size={32} /></button>
        </section>}
      </div>
    </>
  )
};