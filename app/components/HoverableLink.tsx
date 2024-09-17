import Link from "next/link";

interface HoverableLinkProps {
  href: string;
  children: React.ReactNode;
  underlineColor?: string;
}

const HoverableLink: React.FC<HoverableLinkProps> = ({ href, children, underlineColor = "white" }) => {
  return (
    <li className="relative group">
      <Link href={href}>
        <p className="hover:scale-110 transform transition-transform duration-300">{children}</p>
      </Link>
      <div
        className={`absolute left-0 bottom-0 h-0.5 bg-${underlineColor} w-0 group-hover:w-full transition-all duration-300`}
      ></div>
    </li>
  );
};

export default HoverableLink;