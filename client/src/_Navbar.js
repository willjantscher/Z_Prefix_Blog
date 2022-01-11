import React, {Component} from "react";

class _Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MenuItems: [
                {
                    title: "Home",
                    url: "/",
                    cName: "nav-links"
                },
                {
                    title: "Content",
                    url: "/content",
                    cName: "nav-links"
                },
                {
                    title: "MyPosts",
                    url: "/myposts",
                    cName: "nav-links"
                },
                {
                    title: "NewPost",
                    url: "newpost",
                    cName: "nav-links"
                }
            ]
            }
        }
        
    logout = () => {
        localStorage.clear();
    }

    render() {
        // console.log(this.state.MenuItems)
        return(
            <nav className="NavbarItems">
                <ul>
                    {this.state.MenuItems.map((item, index) => {
                        return(
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                    <li key="logout">
                        <a className="" href="/" onClick={this.logout()}>
                            Logout
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default _Navbar