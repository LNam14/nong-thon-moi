import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "60px",
  width: "250px",
  overflow: "hidden",
  display: "block",
  marginLeft: 5
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image
        src="/images/logo/logo_ql.png"
        alt="logo"
        height={60}
        width={250}
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
