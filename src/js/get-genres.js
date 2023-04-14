export default function getGenres(arrayId, genres) {
  const arr = [];

  for (const value of genres) {
    if (arrayId === 'N/A' || arrayId.length === 0) {
      arr.push('Other');
      break;
    } else if (arrayId.includes(value.id)) {
      arr.push(value.name);
    }
  }

  if (arr.length > 2) {
    arr.splice(2, arr.length - 2, 'Other');
  }

  return arr.join(', ');
}