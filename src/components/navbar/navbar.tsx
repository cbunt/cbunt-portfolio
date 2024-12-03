import SampleSelect from './sample-select/sample-select';
import PageIcon from './page-icon';
import Link from './link';

import './navbar.module.css';

export default function NavBar() {
    return (
        <aside>
            <PageIcon style={{ transform: 'rotate(180deg)' }} />
            <nav>
                <Link href="/">About</Link>
                <SampleSelect />
                <Link href="/resume">Resume</Link>
            </nav>
            <div>
                <Link href="https://github.com/cbunt" target="_blank" rel="noreferrer noopener">{'\uf092'}</Link>
                <Link href="https://www.linkedin.com/in/cbunt" target="_blank" rel="noreferrer noopener">{'\udb80\udf3b'}</Link>
                <Link href="mailto:cass@cbunt.ing">{'\udb80\uddee'}</Link>
            </div>
        </aside>
    );
}
