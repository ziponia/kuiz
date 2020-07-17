import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Layout from "../components/Layout";
import styled from "styled-components";
import Link from "next/link";

import { useSession, signin, signout } from "next-auth/client";

type Props = {};

const IndexPage: NextPage<Props> = props => {
  const [hover, setHover] = useState(false);
  const [btnMode, setBtnMode] = useState(false);
  const [session, loading] = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  const handleHover = () => {
    setHover(true);
  };
  const handleLeave = () => {
    setHover(false);
  };

  const handleLogoClick = async () => {
    await signin();
    setBtnMode(true);
  };

  return (
    <MainLayout>
      <h1
        className={`animate__animated ${hover ? "animate__rubberBand" : ""}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={handleLogoClick}>
        Kuiz
      </h1>

      {!loading && session && (
        <div className="game_actions">
          <Link href="/create-game">
            <button className="animate__animated animate__backInLeft">
              Create Game
            </button>
          </Link>
          <button className="animate__animated animate__backInRight">
            Join
          </button>
        </div>
      )}
    </MainLayout>
  );
};

const MainLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-family: ${props => props.theme.fonts.second};
    font-weight: 100;
    text-shadow: 2px 2px 3px #000, -1px -1px 0 #000, 1px -1px 0 #000,
      -1px 1px 0 #000, 1px 1px 0 #000;
    color: ${props => props.theme.colors.main}90;
    font-size: 10rem;
    cursor: pointer;
    transition: all 300ms;
  }

  .game_actions {
    button {
      font-size: 2rem;
      cursor: pointer;
      box-shadow: 2px 2px 3px #000, -1px -1px 0 #000, 1px -1px 0 #000,
        -1px 1px 0 #000, 1px 1px 0 #000;
      border: 0;
      background-color: ${props => props.theme.colors.main}90;
      padding: 10px 20px;
      border-radius: 2px;
      font-family: ${props => props.theme.fonts.second};
      font-weight: 100;
      color: ${props => props.theme.colors.main}90;
      text-shadow: 2px 2px 3px #000, -1px -1px 0 #000, 1px -1px 0 #000,
        -1px 1px 0 #000, 1px 1px 0 #000;
      &:nth-of-type(1) {
        margin-right: 1rem;
      }
    }
  }
`;

export default IndexPage;
