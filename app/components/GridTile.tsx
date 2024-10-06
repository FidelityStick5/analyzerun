export default function GridTile({
  title,
  data,
  Icon,
  iconColor,
  gridSpan,
}: {
  title: string;
  data: string | number | string[] | number[];
  Icon?: React.FC<React.SVGProps<SVGElement>>;
  iconColor?: string;
  gridSpan?: string;
}) {
  return (
    <div
      title={title}
      className={`group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded border-2 border-secondary bg-background px-8 transition-colors hover:bg-accent hover:text-background max-xl:min-h-48 ${gridSpan} duration-300`}
    >
      {Icon && (
        <Icon
          className="pointer-events-none absolute -left-20 z-0 h-56 w-auto opacity-100 transition-[height,fill,opacity] duration-300 ease-in-out group-hover:!fill-background group-hover:opacity-20"
          style={{ fill: iconColor ?? "currentcolor" }}
        />
      )}
      <div className="z-10 font-black italic text-primary duration-300 group-hover:text-secondary">
        {title}
      </div>

      {Array.isArray(data) ? (
        data.map((element, index) => (
          <div
            className="z-10 text-3xl font-black text-accent duration-300 group-hover:text-background"
            key={index}
          >
            {element}
          </div>
        ))
      ) : (
        <div className="z-10 text-3xl font-black text-accent duration-300 group-hover:text-background">
          {data}
        </div>
      )}
    </div>
  );
}
