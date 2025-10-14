import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import './dashbord.css'
import { IoMdAdd } from "react-icons/io";
import { useState, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaCross } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
const API =import.meta.env.VITE_BACKEND_URL;

function Dashbord() {

    const [addFriends, setFriends] = useState(false)
    const styles = useRef()
    const [friendNumber, setFriendNumber] = useState('')
    const [friendsData, setFriendsData] = useState([])
    const [userId, setUserId] = useState();
    const [friendList, setList] = useState();
    const [showProfile, setShowProfile] = useState(false);
    const [showInfo, setInfo] = useState(false)
    let navigate = useNavigate();

    let user = JSON.parse(sessionStorage.getItem('user'))
    //  console.log(id,"id")
    useEffect(() => {
        let id = user._id;
        setUserId(id);
    }, [user])
    useEffect(() => {
        if (userId === user._id) {
            let stored = JSON.parse(localStorage.getItem(`${userId}`)) || [];
            if (!Array.isArray(stored)) {
                stored = [stored];
            }
            setFriendsData(stored);
        }
    }, [userId]);


    function addFriend() {
        setFriends(true)
        //  styles.current.style.display = 'none'
    }
    function removeDisplay() {

        setFriends(false)
    }

    async function sendNumber() {
        console.log(friendNumber)

        let res = await fetch(`${API}/add-friend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ number: friendNumber })
        })
        let friendData = await res.json()
        console.log("data: ", friendData)
        setList(friendData);
        localStorage.setItem(`${friendData.mobileNumber}`, JSON.stringify(friendData))



        setFriends(false)
        setFriendNumber('')
    }
    useEffect(() => {
        if (friendList && userId === user._id) {
            setFriendsData((prev) => {
                const safePrev = Array.isArray(prev) ? prev : []; // prev hamesha array ho
                const update = [...safePrev, friendList];
                localStorage.setItem(`${userId}`, JSON.stringify(update));
                return update;
            });
        }
    }, [friendList, userId]);


    async function handelSubmit(e) {
        e.preventDefault();
        await sendNumber();

    }

    function setIcon(fname, lname) {
        if (!fname || !lname) {
            return " ";
        }
        return `${fname.charAt(0)}${lname.charAt(0)}`
    }
    function removeFriend(id, mobile) {

        setFriendsData((prev) => {

            localStorage.removeItem(`${mobile}`)
            const updated = prev.filter(friend => friend._id !== id);
            localStorage.setItem(`${userId}`, JSON.stringify(updated));
           
            return updated;
        });
         navigate('/dashbord')
    }

    function logOut() {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <>
            <section>
                <aside>
                    <div className="searchBox">

                        {/* Profile Toggle Button */}
                        <div className="profile1">
                            <button
                                className="profileToggle"
                                onClick={() => setShowProfile(!showProfile)}
                            >
                                {user ? setIcon(user.fname, user.lname) : ''}
                            </button>
                            <span>{user ? `${user.fname} ${user.lname}` : ""}</span>



                            {showProfile && (
                                <div className="profileBox">
                                    <p id="cross" onClick={() => setShowProfile(!showProfile)}><RxCross1 /></p>

                                    <h2>My Profile</h2>
                                    <p>
                                        <strong>Name:</strong> {user ? `${user.fname} ${user.lname}` : ""}
                                    </p>
                                    <p>
                                        <strong>Mobile:</strong> {user ? `${user.mobileNumber}` : ""}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {user ? `${user.email}` : ""}
                                    </p>
                                    <button onClick={logOut}>Log-out</button>
                                </div>
                            )}
                        </div>
                        <div className="add">
                            <h2>Chats</h2>
                            <div className="newChat">
                                <h1
                                    id="add"
                                    onMouseEnter={() => setInfo(true)}
                                    onMouseLeave={() => setInfo(false)}
                                >
                                    <IoMdAdd onClick={addFriend} />
                                </h1>
                                {showInfo && (
                                    <>
                                        <div className="info">
                                            <p >New Chat   <span><FaRegEdit /></span></p>
                                            <p>Add Friends</p>
                                        </div>

                                    </>


                                )}
                                {
                                    addFriends && (
                                        <>
                                            <form className='addFriendNumber' onSubmit={handelSubmit}>
                                                <p onClick={removeDisplay}><RxCross1 /></p>
                                                <input type="text"
                                                    placeholder="Enter Number"
                                                    name="mobileNumber"
                                                    value={friendNumber}
                                                    onChange={(e) => setFriendNumber(e.target.value)} />
                                                <button type="submit">Add</button>
                                            </form>
                                        </>
                                    )
                                }
                            </div>



                        </div>


                    </div>
                    <div className="search"><input type="text" placeholder="Search or start a new chat" />
                    </div>


                    {
                        Array.isArray(friendsData) && friendsData.map((e) => {
                            return (
                                <>
                                    <div key={`${e._id}`} className="contact" >
                                        <div className="logo">
                                            {setIcon(e.fname, e.lname)}
                                        </div>
                                        <Link to={`/friend/${e.mobileNumber}`}>
                                            <h2 className="name">
                                                {e.fname} {e.lname}
                                            </h2></Link>
                                        <div className="removeFriend">
                                            <RxCross1 onClick={() => removeFriend(e._id, e.mobileNumber)} />
                                        </div>

                                    </div>
                                </>
                            )
                        })
                    }



                </aside>
                <div className="page">
                    {/* <h3 className="chatboxHead"> chat Box</h3> */}
                    <Outlet />

                </div>
            </section>
        </>
    )

} export default Dashbord