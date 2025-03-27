import React from "react";
import Link from "next/link";

// Copyright
// |
// Privacy Policy this should be a link
function Footer() {
  return (
    <div>
      <span className="text-xs">
        © 2025 FlexiConvertIt |{" "}
        <Link href="/privacyPolicy">Privacy Policy</Link>
      </span>
    </div>
  );
}

export default Footer;
