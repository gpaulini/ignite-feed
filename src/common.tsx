export const currentUser = {
  name: 'Gabriel Paulini',
  profession: 'Web Developer',
  avatar: 'https://github.com/gpaulini.png'
};

export const defaultAvatarURL =
  "https://images.unsplash.com/photo-1530840197133-665af68f9d71?q=40&w=300&auto=format&fit=crop";


export const formatDateToReadable = (date: string) => {
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

  return `${day} de ${month}${year !== currentYear ? " de " + year : ""
    }, às ${hours}:${minutes}`;
};

export const formatDateToDescriptive = (date: string) => {
  const now = (new Date()).getTime();
  const d = (new Date(date)).getTime();
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

export const createNewCommentObject = ({
  author,
  content,
  datePublished,
  likes,
  owner,
  replies,
  isReply
}: CommentProps) => {
  return { author, content, datePublished, likes, owner, replies, isReply };
}