export default function toBoolean(value: string) {
  return value === '1' || /^true$/i.test(value);
}