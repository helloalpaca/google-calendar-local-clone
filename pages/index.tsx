import type { NextPage } from "next";
import React, { useState } from "react";
import _ from "lodash";

import Monthly from "../components/Monthly";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

const MemoHeader = React.memo(Header, _.isEqual);
const MemoMonthly = React.memo(Monthly, _.isEqual);
const MemoSidebar = React.memo(Sidebar, _.isEqual);

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="max-h-screen min-h-screen">
      <MemoHeader isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="grid">
        <div
          className={`row-start-1 col-end-7 col-start-${isOpen ? "2" : "1"}`}
        >
          <MemoMonthly />
        </div>

        <MemoSidebar isOpen={isOpen} />
      </div>
    </div>
  );
};

export default Home;
