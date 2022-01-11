import React, {Component} from "react";

class _Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
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
        console.log("logged out")
    }

    componentDidMount() {
        if(localStorage.getItem("token"))
        {
            this.setState({ loggedIn: true})
        }
    }

    render() {
        // console.log(this.state.MenuItems)
        return(
            <nav className="NavbarItems">
                <div className="row">
                    {this.state.MenuItems.map((item, index) => {
                        return(
                            <div key={index} className="col-sm">
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </div>
                        )
                    })}
                    <div key="logout" className="col-sm">
                        <a className="" href="/" onClick={() => {this.logout()}}>
                            Logout
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default _Navbar