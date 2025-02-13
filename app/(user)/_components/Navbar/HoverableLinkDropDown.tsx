import Link from "next/link";

interface HoverableLinkProps {
  href: string;
  children: React.ReactNode;
  underlineColor?: string;
  icon?: React.ReactNode;
}

const HoverableLinkDropDown: React.FC<HoverableLinkProps> = ({ href, children, icon }) => {
  return (
    <div className="relative group">
      <Link href={href}>
        <div className="flex items-center custom-width">
          {icon}
          <p className="hover:scale-110 transform transition-transform duration-300">{children}</p>
        </div>
      </Link>
    </div>
  );
};

export default HoverableLinkDropDown;