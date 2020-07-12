import React from "react";
import styled from "styled-components";

type LayoutProps = {
  className?: string;
};

const Layout: React.FC<LayoutProps> = props => {
  return <Wrapper {...props}>{props.children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: ${props => `${props.theme.colors.main}80`};
`;

export default Layout;
