/**
 * @slug typography
 * @variant list
 * @upstream https://ui.shadcn.com/docs/components/typography
 * @deviations []
 */
export default function TypographyList() {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners : 20 gold coins</li>
    </ul>
  );
}
