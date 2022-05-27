import React from "react";
import { NavLink } from 'react-router-dom';


function Header() {
    return (
        <>
            <header className="p-3 bg-dark text-white">
                <div className="container">

                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                        <nav className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <NavLink className="nav-link active" aria-current="page" to="/home">Home</NavLink>
                            <NavLink className="nav-link px-2 text-secondary" to="/profil">Profil</NavLink>
                            <NavLink className="nav-link px-2 text-white" to="/cryptomonaie">Cryptomonaie</NavLink>
                        </nav>
                        
                            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                                <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
                            </form>

                                <button type="button" className="btn btn-warning">Log Out</button>
                    </div>
                </div>
            </header>

        </>
    )
}

export default Header