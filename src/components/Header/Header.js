import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { colors } from "../../assets/colors";

import HeaderNavBtn from "./HeaderNavBtn";

const DropdownItemStyle = {
  padding: 10,
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <h1>헤더</h1>
    </div>
  );
};
export default Header;

// {
//   key: "1",
//   label: (
//     <a
//       target="_blank"
//       rel="noopener noreferrer"
//       href="https://www.antgroup.com"
//       style={{ textDecoration: "none" }}
//     >
//       AI Service Lab
//     </a>
//   ),
// },

// import React, { useState } from "react";
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Button,
// } from "reactstrap";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <Navbar color="light" light expand="md" style={{ paddingLeft: 150 }}>
//         <NavbarBrand href="/">AI Service Lab</NavbarBrand>
//         <NavbarToggler onClick={toggle} />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="ml-auto" navbar>
//             <NavItem>
//               <NavLink href="/intro">Intro</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/notice">Notice </NavLink>
//             </NavItem>
//             <UncontrolledDropdown nav inNavbar>
//               <DropdownToggle nav caret>
//                 Community
//               </DropdownToggle>
//               <DropdownMenu right>
//                 <DropdownItem href="/board">게시판</DropdownItem>
//                 <DropdownItem href="/album">앨범</DropdownItem>
//                 <DropdownItem divider />
//               </DropdownMenu>
//             </UncontrolledDropdown>
//             <NavItem>
//               <NavLink href="/login">로그인</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/join">회원가입</NavLink>
//             </NavItem>
//           </Nav>
//         </Collapse>
//       </Navbar>
//     </>
//   );
// };

// export default Header;
