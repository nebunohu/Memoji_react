const mixEmojis = () => {
  let emojis = ['🐰', '🐰', '🐶', '🐶', '🐱', '🐱', '🐼', '🐼', '🐵', '🐵', '🐯','🐯'];

  return emojis.sort(() => Math.random() - 0.5);
}

export default mixEmojis;