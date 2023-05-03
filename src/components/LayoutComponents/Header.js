
function Header(){
    return(
        <nav className="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow" id="header">
            <a className="navbar-brand col-sm-3 col-md-2 mr-0" id="Logo" src="#">
                <strong>URL MONITORING</strong>
            </a>
            <input className="form-control form-control-dark w-100 " id="um-nav-search" type="text" 
                placeholder="Search..." aria-label="Search" />
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <a className="nav-link um-signout" href="#">Sign out</a>
                </li>
            </ul>
        </nav>
    )
}

export default Header;