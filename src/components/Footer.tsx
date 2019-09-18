import React from 'react';
import '../styles/Footer.scss';

interface LinkProps {
    href: string,
    text: string
}
const Link: React.FC<LinkProps> = ({href, text}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
    >
        {text}
    </a>
);

const Footer: React.FC = () => (
    <footer className="Footer">
        <div className="Container">
            <h4 className="Footer-title">BOP Movie Night Club</h4>
            <h5 className="Footer-subtitle">Join us in B13 Tavern most Fridays at 7PM</h5>
            <h5 className="Footer-suggestions">Suggestions? <Link
                href="https://forms.gle/fofb9MHWE5TXjw7j7"
                text="Let us know!"
            /></h5>
            <small className="Footer-callout">Designs inspired by <Link
                href="https://dribbble.com/shots/2266601-IMDb-design-concept"
                text="George Vasyagin"
                /> and <Link 
                href="https://dribbble.com/shots/5837867-Daily-UI-025-TV-App"
                text="Neal Hampton" />
            </small>
            <small className="Footer-callout">Icons by <Link
                href="https://www.flaticon.com/free-icon/clapperboard_108884#term=clapperboard&page=1&position=2"
                text="Freepik" /> and <Link
                href="https://fontawesome.com"
                text="Font Awesome" />
            </small>
            <small className="Footer-callout">Made with &#x2764; by <Link
                href="https://github.com/anakorn"
                text="@anakorn" /> and <Link
                href="https://github.com/treeshuh"
                text="@treeshuh" />
            </small>
        </div>
    </footer>
)

export default Footer;