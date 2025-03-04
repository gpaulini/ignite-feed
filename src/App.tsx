import styles from "./App.module.css";

import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import { NewPost } from "./components/NewPost";
import { currentUser } from "./common";

export const App = () => {
  let posts = [
    {
      author: currentUser,
      content: (
        <>
          <p>Fala galeraa 👋</p>
          <p>
            Acabei de subir mais um projeto no meu portifa. É um projeto que fiz
            no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare
            🚀{" "}
          </p>
          <p>
            👉{" "}
            <a href="#" target="_blank" rel="noopener noreferrer">
              jane.design/doctorcare
            </a>
          </p>
          <p>
            <a href="#" target="_blank" rel="noopener noreferrer">
              #novoprojeto
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              #nlw
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              #rocketseat
            </a>
          </p>
        </>
      ),
      comments: [
        {
          author: { name: "Jorgin do Pneu", avatar: null },
          content: "Cola na goma pa nóis dale um raio da braba mermão!!",
          datePublished: "2024-05-25 17:30:50",
          likes: 1,
          owner: false,
          replies: [
            {
              author: currentUser,
              content: "???",
              datePublished: "2024-05-25 17:53:00",
              likes: 0,
              owner: true,
              isReply: true
            },
            {
              author: { name: "Jorgin do Pneu", avatar: null },
              content: "Opa! mandei errado meu patrão",
              datePublished: "2024-05-26 17:45:50",
              likes: 1,
              owner: false,
              isReply: true
            },
          ],
          isReply: false
        },
      ],
      datePublished: "2024-05-22 19:34",
      likes: 4,
      owner: true
    },
    {
      author: {
        name: "Rogerin Matapiogglio",
        profession: "Garoto de Programa",
        avatar:
          "https://plus.unsplash.com/premium_photo-1680020185326-45491267f8da?q=40&w=300&auto=format&fit=crop",
      },
      content: (
        <>
          <p>Alguém sabe como faz pra mudar a profissão do perfil??</p>
          <p>Acho que fui hackeado 😡😡😡</p>
          <p>
            <a href="#" target="_blank" rel="noopener noreferrer">
              #coroassolteiraspertodemim
            </a>
          </p>
        </>
      ),
      comments: [
        {
          author: { name: "Julin do Mangue", avatar: null },
          content: "Quanto tá o programa??",
          datePublished: "2024-05-23 11:30:50",
          likes: 3,
          owner: false,
          replies: [],
          isReply: false
        },
        {
          author: {
            name: "Rogerin Matapiogglio",
            avatar:
              "https://plus.unsplash.com/premium_photo-1680020185326-45491267f8da?q=40&w=300&auto=format&fit=crop",
          },
          content: "Como é amigo?",
          datePublished: "2024-05-23 13:23:02",
          likes: 0,
          owner: false,
          replies: [],
          isReply: false
        },
      ],
      datePublished: "2024-05-22 19:34",
      likes: 1,
      owner: false,
      isReply: false
    },
  ];

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <NewPost />
          {(posts && posts.length) ?
            posts.map((e, i) => (
              <Post
                author={e.author}
                content={e.content}
                datePublished={e.datePublished}
                likes={e.likes}
                owner={e.owner}
                comments={e.comments}
                key={`post-${i}`}
              />
            ))
            : <h1>Não há posts na sua timeline</h1>}
        </main>
      </div>
    </>
  );
};
