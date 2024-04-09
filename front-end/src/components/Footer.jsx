import { IconBrandGithub } from "@tabler/icons-react";

function Footer() {
  return (
    <div className="px-9 h-24 bg-gray-600 text-white flex justify-between items-center">
      <div>
        <p>&copy; Liver RFA Simulator Inc. All rights reserved.</p>
      </div>
      <div className="flex space-x-8">
        <a href="/">Home</a>
        <a href="/model">Model</a>
        <a href="/about">About</a>
      </div>
      <div>
        <a href="#">
          <IconBrandGithub />
        </a>
      </div>
    </div>
  );
}

export default Footer;
