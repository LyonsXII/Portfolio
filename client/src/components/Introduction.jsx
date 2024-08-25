import React, { useState, useContext } from "react";

import IntroButton from "./IntroButton";
import { ThemeContext } from "../context/ThemeContext";

function Introduction() {
  const { theme } = useContext(ThemeContext);

  const [initial, setInitial] = useState(true);
  const [songGuesser, setSongGuesser] = useState(false);
  const [faraday, setFaraday] = useState(false);
  const [bookNotes, setBookNotes] = useState(false);

  function choiceSongGuesser() {
    setInitial(false);
    setFaraday(false);
    setBookNotes(false);
    setSongGuesser(true);
  }

  function choiceFaraday() {
    setInitial(false);
    setSongGuesser(false);
    setBookNotes(false);
    setFaraday(true);
  }

  function choiceBookNotes() {
    setInitial(false);
    setSongGuesser(false);
    setFaraday(false);
    setBookNotes(true);
  }

  return (
    <div style={{
      display: "flex",
      height: "100%",
      width: "90.5%"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center",
        width: "70%"
      }}>
        {/* Initial config */}
        {initial === true ?
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center"
          }}>
            <h1>Portfolio</h1>
            <h2>Michael Lyons</h2>
            <h3 style={{marginTop: "40px"}}>Hey here's some text</h3>
          </div>
        : null
        }
        {/* Song Guesser */}
        {songGuesser === true ?
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center",
          }}>
            <h1>Song Guesser</h1>
            <div style={{
              height: "300px",
              width: "80%",
              border: "4px solid black",
              borderRadius: "20px",
              marginTop: "30px"
            }}>
            </div>
            <h3 style={{marginTop: "40px", paddingLeft: "40px",}}>
              An online game you can play in which you have to guess where the song playing is from based off a short clip. Choose from a few different categories including "Anime", "Indie", "TV Shows", and "Disney" and see how well you do.
              <br />
              <br />
              Song names and where they're from are given whether you get the answer right or wrong so this can be a good chance to find some new music you might like from a genre you're unfamilar with, or rediscover some tracks you'd forgotten about. Well that's if you share my taste in music at any rate.
            </h3>
          </div>
        : null
        }
        {/* Faraday Cage */}
        {faraday === true ?
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center"
          }}>
            <h1>Faraday Cage</h1>
            <div style={{
              height: "300px",
              width: "80%",
              border: "4px solid black",
              borderRadius: "20px",
              marginTop: "30px"
            }}>
            </div>
            <h3 style={{marginTop: "40px", paddingLeft: "40px",}}>
              My dissertation at university was centered around getting to grips with and expanding upon a two dimensional model of a Faraday cage using Matlab. I had a surprising amount of fun putting it together way back when so I thought it might be interesting to update it a little and put it into a package other people can mess around with.
              <br />
              <br />
              Here you'll find an interactive webpage that lets you tinker with the conditions and see how changing the configuration of a Faraday Cage changes the shielding it provides.
            </h3>
          </div>
        : null
        }
        {/* Book Notes */}
        {bookNotes === true ?
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center"
          }}>
            <h1>Book Notes</h1>
            <div style={{
              height: "300px",
              width: "80%",
              border: "4px solid black",
              borderRadius: "20px",
              marginTop: "30px"
            }}>
            </div>
            <h3 style={{marginTop: "40px", paddingLeft: "40px",}}>
              When I went on holiday this year I found myself getting back into reading after a longer break than I would've liked. In the interest of keeping organised I thought it might be fun to keep a record of the books I've been reading and my thoughts on them as I go. It's interesting how your thoughts on a book can change once you no longer have to deal with the author waxing lyrical about what clothes someone is wearing for pages on end.
              <br />
              <br />
              One of my first projects when I started learning about web development was putting together a book notes app, so I had a lot of fun with this one seeing how much progress I'd made.
            </h3>
          </div>
        : null
        }
      </div>
        
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center",
        width: "30%",
        gap: "40px"
      }}>
        <IntroButton name="Song Guesser" choice={choiceSongGuesser}/>
        <IntroButton name="Faraday Cage" choice={choiceFaraday}/>
        <IntroButton name="Book Notes" choice={choiceBookNotes}/>
      </div>
    </div>
  )
}

export default Introduction