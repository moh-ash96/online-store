import { useRouter } from "next/dist/client/router";
import Footer from "../components/footer";
import Login from "../components/login";
import Header from "../components/header";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";




export default function Home() {

  const [logged, setLogged] = useState(false)

  let { t } = useTranslation();
  
    return (
      <div className="row">
      <Container className="">
      <Login />
      </Container>
      </div>
    )


}
