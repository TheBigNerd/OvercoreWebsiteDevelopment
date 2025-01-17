import Link from "next/link";

interface HoverableLinkProps {
  href: string;
  children: React.ReactNode;
  underlineColor?: string;
  icon?: React.ReactNode;
}

const HoverableLink: React.FC<HoverableLinkProps> = ({ href, children, underlineColor = "white", icon }) => {
  return (
    <div className="relative group">
      <Link href={href}>
        <div className="flex items-center space-x-2">
          {icon}
          <p className="hover:scale-110 transform transition-transform duration-300">{children}</p>
        </div>
      </Link>
      <div className={`absolute left-0 bottom-0 h-0.5 bg-${underlineColor} w-0 group-hover:w-full transition-all duration-300`}></div>
    </div>
  );
};

export default HoverableLink;