const generateQuizQuestion = (verses) => {
  const verse = verses[Math.floor(Math.random() * verses.length)];
  const words = verse.text.split(' ');
  const blankIndex = Math.floor(Math.random() * words.length);
  const answer = words[blankIndex];
  words[blankIndex] = '____';
  return {
    id: verse._id,
    text: `${verse.book} ${verse.chapter}:${verse.verseRange} - ${words.join(' ')}`,
    answer,
  };
};

module.exports = { generateQuizQuestion };