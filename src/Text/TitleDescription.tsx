interface Props {
  title: string;
  description?: string;
  href?: string;
  cta?: string;
}

export const TitleDescription = ({ title, description, href, cta }: Props) => {
  return (
    <div className="lg:px-8 lg:max-w-4xl">
      <div className="text-left px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0 mx-auto">
        <div className="text-2xl font-semibold text-white">{title}</div>
        <div className="mt-3 text-gray-300 text-xl">{description}</div>
      </div>
    </div>
  );
};
