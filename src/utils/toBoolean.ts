const consideredTrue: string[] = ['1', 'true'];
export default function toBoolean(value: string | number) {
  return consideredTrue.includes(value.toString().toLowerCase());
}
