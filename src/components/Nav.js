import React, { useState } from "react";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import {FaWeixin, FaEnvelope, FaGithub, FaRss, FaTwitter} from "react-icons/fa";

export default function Nav() {
  return (
    <div
      className="navbar fixed w-full flex md:flex-col px-4 md:px-6 py-2 md:py-6 md:pb-7 z-30 bg-sky text-paper md:h-full justify-between
                md:static md:w-auto md:bg-sky md:text-paper md:max-h-screen md:justify-between
                      child:pl-2 child:md:pl-0 child:text-lg "
    >
      <div>
        <Link href="/">
          <p className="text-4xl md:text-7xl cursor-pointer font-bold pl-0 md:pb-3">
            VERL
          </p>
        </Link>
        <div
          className="md:flex child:pl-3 md:text-xl child:md:pl-1 child:md:pt-2 hidden md:flex-col 
          child:brightness-100  child:transition"
        >
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <a
            href="https://verl.readthedocs.io/en/latest/index.html"
            target="_blank"
            rel="noopener noreferrer">
            Documentation
          </a>
        </div>
      </div>
      <div className="child:mr-3 -ml-0.5 child:w-8 child:brightness-100 child:transition hidden md:flex">
        <a
          href="mailto:haibin.lin@bytedance.com"
          target="_blank"
          rel="noopener noreferrer"
        >
        <FaEnvelope />
        </a>
        <a
          href="https://raw.githubusercontent.com/eric-haibin-lin/verl-community/refs/heads/main/WeChat.JPG"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWeixin />
        </a>
        <a
          href="https://github.com/volcengine/verl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://twitter.com/verl_project"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://zdjeffrey.github.io/verl-blog/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaRss />
        </a>
      </div>
      <Hamburger />
    </div>
  );
}

function Hamburger() {
  const [isOpen, setOpen] = useState(false);

  var style = {
    bmBurgerButton: {
      position: "fixed",
      width: "1.2em",
      height: "1.0em",
      right: "1.2rem",
      top: "1em",
    },
    bmBurgerBars: {
      background: "#fff",
    },
    bmBurgerBarsHover: {
      background: "#fff",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#fff",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
      top: "0px",
    },
    bmMenu: {
      background: "#1d1d1f",
      padding: "2.5em 1.5em 0",
    },
    bmMorphShape: {
      fill: "#fff",
    },
    bmItemList: {
      color: "#fff",
      padding: "0.8em",
    },
    bmItem: {
      display: "inline-block",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
      position: "fixed",
      top: "0px",
      left: "0px",
    },
  };

  return (
    <div className="md:hidden">
      <Menu
        right
        styles={style}
        isOpen={isOpen}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div>
          <div
            className="child:pb-2 child:child:text-2xl"
            onClick={() => {
              setOpen(false);
            }}
          >
            <p>
              <Link href="/blog">Blog</Link>
            </p>
            <p>
              <Link href="/about">About</Link>
            </p>
            <p>
              <a
                href="https://verl.readthedocs.io/en/latest/index.html"
                target="_blank"
                rel="noopener noreferrer">
                Documentation
              </a>
            </p>
          </div>
          <div className="child:mr-3 pt-4 child:w-8 child:brightness-100 hover:child:brightness-90 child:transition flex">
            <a
              href="mailto:haibin.lin@bytedance.com"
              target="_blank"
              rel="noopener noreferrer"
            >
            <FaEnvelope />
            </a>
            <a
              href="https://raw.githubusercontent.com/eric-haibin-lin/verl-community/refs/heads/main/WeChat.JPG"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWeixin />
            </a>
            <a
              href="https://github.com/volcengine/verl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://twitter.com/verl_project"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://zdjeffrey.github.io/verl-blog/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaRss />
            </a>
          </div>
        </div>
      </Menu>
    </div>
  );
}
