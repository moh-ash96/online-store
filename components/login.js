import useTranslation from "next-translate/useTranslation"
import { useState, useEffect } from "react"
import axios from 'axios'
import Footer from "./footer"
import Main from "./main"
import { Navbar, Container, Button } from "react-bootstrap"
import { DropdownButton, Dropdown, NavDropdown } from "react-bootstrap";
import { useRouter } from "next/dist/client/router";
import Link from 'next/link'

export default function Login() {

    let router = useRouter();

    let { t } = useTranslation();

    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {

        if (localStorage.getItem('token')) {
            setLoggedIn(true);
        };
    }, [])




    function handleUser(event) {
        setUserName(event.target.value)
        localStorage.setItem("user", event.target.value)
    }

    function handlePass(event) {
        setPass(event.target.value);
    }

    async function getToken() {
        const url = 'https://fakestoreapi.com/auth/login';
        const response = axios.post(url, {
            "username": userName,
            "password": pass,
        })
        console.log(await response);
        return response;
    };


    async function handleSubmit(event) {
        event.preventDefault();
        const response = await getToken();
        if ('token' in response.data) {
            console.log(response.data);
            setLoggedIn(true)
            localStorage.setItem('token', response.data)
        } else {
            setLoggedIn(false)
            setMsg(response.data.msg)

        }

    }

    function handleSignOut(e) {
        e.preventDefault()
        setLoggedIn(false)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setMsg('')
    }

    if (loggedIn === false) {
        return (
            <>
                <div className="row-1">
                    <header>
                        <Navbar bg="dark" variant="dark">
                            <Container>
                                <Navbar.Brand href="#home">Online Store</Navbar.Brand>
                            </Container>
                            <NavDropdown id="dropdown-basic-button" title="Language" drop="down">
                                {
                                    router.locales.map((locale) => (
                                        <NavDropdown.Item key={locale} href="#/action-1">
                                            <Link href={router.asPath} locale={locale}>
                                                <a>{locale}</a>
                                            </Link>
                                        </NavDropdown.Item>
                                    ))
                                }
                            </NavDropdown>
                        </Navbar>
                    </header>
                </div>
                <div className="container p-5 mt-5 col-7 bg-dark text-light row-1">

                    <form>
                        <div className="mb-3 row">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">{t("common:username")}</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="inputEmail3" onChange={handleUser}></input>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">{t("common:password")}</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword3" onChange={handlePass}></input>
                            </div>
                        </div>
                        <div className="mb-4 row">
                            <button type="submit" className="btn btn-primary col-sm-2" onClick={handleSubmit}>{t("common:signIn")}</button>
                            <strong><p className="col-sm-5 text-danger">{msg}</p></strong>
                        </div>
                    </form>
                </div>
            </>
        )

    } else {
        return (
            <>
                <Main user={userName} />
                <div className="container">
                    <div className="row">
                        <div className="text-center col">
                            <Button className="mb-5" type="submit" onClick={handleSignOut}>{t("common:signOut")}</Button>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

}