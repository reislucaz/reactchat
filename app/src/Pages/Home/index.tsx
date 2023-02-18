import { useState } from "react";
import Chat from "../../Components/Home/Chat";
import Config from "../../Components/Home/Config";
import LeftBar from "../../Components/Home/LeftBar";
import RightBar from "../../Components/Home/RightBar";
import HomeProvider from "../../Contexts/home";
import './index.css';

function Home() {
    const [page, setPage] = useState("chat");

    return (
        <HomeProvider>
            <div className="home-screen">
                <LeftBar />
                { page === "chat" ? <Chat /> : <Config/>}
                <RightBar />
            </div>
        </HomeProvider>
    )
}

export default Home;
