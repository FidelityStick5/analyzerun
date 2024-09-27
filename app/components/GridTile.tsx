export default function GridTile({
  title,
  data,
  Icon,
  iconColor,
  gridSpan,
}: {
  title: string;
  data: string | number;
  Icon?: React.FC<React.SVGProps<SVGElement>>;
  iconColor?: string;
  gridSpan?: string;
}) {
  return (
    <div
      title={title}
      className={`relative flex items-center justify-center gap-4 overflow-hidden rounded border-2 border-dracula-selection bg-dracula-selection px-8 transition-colors hover:bg-dracula-background max-xl:min-h-24 ${gridSpan}`}
    >
      {Icon && (
        <Icon
          className="pointer-events-none absolute -left-20 h-56 w-auto opacity-20 transition-[height] duration-1000 ease-in-out"
          style={{ fill: iconColor ?? "currentcolor" }}
        />
      )}
      <div className="text-2xl">{data}</div>
    </div>
  );
}
