import { Navbar, Container, Nav } from "react-bootstrap";
import useTranslation from "next-translate/useTranslation";


export default function Header(props) {

    let { t } =useTranslation()

    const user = localStorage.getItem('user')

    return (

        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Online Store</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">{t("common:home")}</Nav.Link>
                        <Nav.Link href="#about">{t("common:about")}</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="text-xs">
                        {t("common:signed in")}: <a href="#login">{user}</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}