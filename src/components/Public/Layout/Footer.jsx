import React from "react";
import Logo from "../../../jobseeker-logos.png";
import "../../../styles/utility.css";
import Linkedin from "../../../styles/svg/linkedin.svg";
import Twitter from "../../../styles/svg/twitter.svg";
import Instagram from "../../../styles/svg/instagram.svg";
import Facebook from "../../../styles/svg/facebook-square.svg";
import Email from "../../../styles/svg/envelope-solid.svg";
import { faLinkedin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IoLogoLinkedin,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoMailOutline,
} from "react-icons/io5";
const Footer = () => {
  return (
    <div className="">
      <div className="bg-[#0f2765] w-full p-3 h-auto">
        <div className="">
          <div className="text-xl text-center text-gray-200">Follow Us</div>
        </div>
        <div className="py-2">
          <ul className="md:flex md:items-center items-center justify-center flex md:justify-center md:gap-2">
            <li>
              <IoLogoLinkedin className="text-3xl text-gray-200 cursor-pointer" />
            </li>
            <li>
              <IoLogoFacebook className="text-3xl text-gray-200 cursor-pointer" />
            </li>
            <li>
              <IoLogoInstagram className="text-3xl text-gray-200 cursor-pointer" />
            </li>
            <li>
              <IoLogoTwitter className="text-3xl text-gray-200 cursor-pointer" />
            </li>
            <li>
              <IoMailOutline className="text-3xl text-gray-200 cursor-pointer" />
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-[#062551] w-full p-3 md:p-12 h-auto">
        <div className="md:flex md:flex-nowrap text-gray-200 md:justify-center md:text-left">
          <div className="md:w-60 md:border-r mr-12 pr-8">
            <div className="text-xl">About Us</div>
            <div className="text-base p-2 px-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus in error ab? Officiis beatae ipsa non quis deserunt,
              voluptas harum aut pariatur eveniet.
            </div>
          </div>
          <div className="md:border-r mr-14 pr-14 mt-2 md:mt-0">
            <div className="text-xl">Product & Services</div>
            <div className="text-base">
              <ul className="p-2 px-0">
                <li className="cursor-pointer">Lowongan Pekerjaan</li>
                <li className="cursor-pointer">Blog</li>
              </ul>
            </div>
          </div>
          <div className="md:border-r mr-14 pr-14 mt-2 md:mt-0">
            <div className="text-xl">Perusahaan</div>
            <div className="text-base">
              <ul className="p-2 px-0">
                <li>Address</li>
                <li>Email</li>
                <li>Phone</li>
              </ul>
            </div>
          </div>
          <div className="md:w-60 mt-2 md:mt-0">
            <div className="text-xl">Contact Us</div>
            <div className="text-base">
              <ul className="p-2 px-0">
                <li>
                  <strong>Address</strong>: Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Fugiat neque minima numquam!
                </li>
                <li>
                  <strong>Email</strong>: mejixx@mejixxx.my.id
                </li>
                <li>
                  <strong>Phone</strong>: +628123122
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#031732] w-full md:px-20 h-auto p-3 px-4 md:flex md:items-center md:text-left text-center">
        <div className="text-gray-200 mb-4 md:mb-0 md:flex-1">
          Copyright &copy; 2023 JobSeeker. All Rights Reserved.
        </div>
        <div className="text-gray-200 md:ml-auto">
          <ul className="md:flex md:justify-end md:static">
            <li className="mx-2 cursor-pointer">Terms and Conditions</li>
            <li className="mx-2 cursor-pointer">Privacy Policy</li>
            <li className="mx-2 cursor-pointer">Sitemap</li>
            <li className="mx-2 cursor-pointer">About</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
