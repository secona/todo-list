export default function toBoolean(value: string | number) {
  return /^(true|1)$/i.test(String(value));
}
