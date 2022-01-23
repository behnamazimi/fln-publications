import styled from "@emotion/styled";

const StylesNavbar = styled.div(props => ({
  background: "#f0f0f0",
  padding: "1rem",
  display: "flex",
  justifyContent: "between",
  alignItems: "center",
  ".qAccess": {
    flex: 1,
    textAlign: "right"
  },
  "a": {
    textDecoration: "none",
    marginLeft: ".5rem"
  }
}))

export default function Navbar() {
  return (
      <StylesNavbar>
        <strong>App</strong>
        <div className={"qAccess"}>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </StylesNavbar>
  )
}