export default function objectToString(obj: object) {
  let result: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    result.push(`${key} "${value}"`);
  }
  return result.join(', ');
}
