import { useRouter } from "next/dist/client/router";
import Link from 'next/link';
import React from "react";
import * as Icon from 'react-bootstrap-icons'
import { DropdownButton, Dropdown, NavDropdown } from "react-bootstrap";

export default function Footer() {
    let router = useRouter()
    return (
        <footer className="p-5 text-white bg-dark">


            <div className="container p-4 pb-0 text-center">
                <section className="mb-3">
                    <a className="m-1 bg-white btn btn-sm" href="https://www.facebook.com" role="button"><Icon.Facebook /></a>
                    <a className="m-1 bg-white btn btn-sm" href="https://www.twitter.com" role="button"><Icon.Twitter /></a>
                    <a className="m-1 bg-white btn btn-sm" href="#" role="button"><Icon.Envelope /></a>
                    <a className="m-1 bg-white btn btn-sm" href="https://www.instagram.com" role="button"><Icon.Instagram /></a>
                    <a className="m-1 bg-white btn btn-sm" href="https://www.linkedin.com" role="button"><Icon.Linkedin /></a>
                    <a className="m-1 bg-white btn btn-sm" href="https://www.github.com" role="button"><Icon.Github /></a>
                </section>
            </div>
            <div className="pt-3 text-center ">
                © 2021 Mohammad Ashour
            </div>
                <NavDropdown id="dropdown-dark-nav" title="Language" drop="up" menuVariant="dark" className="">
                    {
                        router.locales.map((locale) => (
                            <NavDropdown.Item key={locale}>
                                <Link href={router.asPath} locale={locale}>
                                    <a>{locale}</a>
                                </Link>
                            </NavDropdown.Item>
                        ))
                    }
                </NavDropdown>
        </footer>
    );
}