// @ts-nocheck
import React, { useState } from 'react'
import Layout from '../components/Layout'
import lyricsStyles from '../styles/modules/Lyrics.module.scss'
import axios from 'axios'

interface LyricsState {
  lyrics: any
  userInput: string
}

export default function Lyrics() {
  const [lyrics, setLyrics] = useState([])
  const [userInput, setUserInput] = useState('')

  const getLyrics = () => {
    let newString = ''
    if (userInput) {
      for (var i = 0; i < userInput.length; i++) {
        if (userInput[i] == ' ') {
          newString += '+'
        } else newString += userInput[i]
      }
    }
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&explaintext&redirects=1&origin=*&titles=${newString}`
      )
      .then(function (response) {
        let pages = response.data.query.pages
        let wikiID = Object.keys(pages)
        let textContent = response.data.query.pages[wikiID[0]].extract // Can log these
        markovMe(textContent)
      })
      .catch(function (error) {
        console.log(`error: ${error}`)
      })
  }

  const mangleLyrics = (lyrics: any) => {
    console.log('lyrics')
    console.log(lyrics)
    console.log('---')
    let individualWords = lyrics.split(' ')
    let newLyrics: string = ''
    for (var i = 0; i < 25; i++) {
      newLyrics +=
        ' ' +
        individualWords[Math.floor(Math.random() * individualWords.length)]
    }
    newLyrics = newLyrics
      .replace(/[.",\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s{2,}/g, ' ')
      .toLowerCase()
    setLyrics(newLyrics)
  }

  const markovMe = (data) => {
    const markovChain = {}
    const textArr = data.split(' ')
    for (let i = 0; i < textArr.length; i++) {
      let word = textArr[i].toLowerCase().replace(/[\W_]/, '')
      if (!markovChain[word]) {
        markovChain[word] = []
      }
      if (textArr[i + 1]) {
        markovChain[word].push(
          textArr[i + 1].toLowerCase().replace(/[\W_]/, '')
        )
      }
    }
    const words = Object.keys(markovChain)
    let word = words[Math.floor(Math.random() * words.length)]
    let result = ''
    //https://medium.com/@alexkrameris/markov-chain-implementation-in-javascript-a698f371d66f
    for (let i = 0; i < words.length; i++) {
      result += word + ' '
      let newWord =
        markovChain[word][Math.floor(Math.random() * markovChain[word].length)]
      word = newWord
      if (!word || !markovChain.hasOwnProperty(word))
        word = words[Math.floor(Math.random() * words.length)]
    }
    console.log(result)
    let finalResultArray = result.split(' ')
    let finalResult = ''
    for (var i = 0; i < 50; i++) {
      finalResult += ` ${finalResultArray[i]}`
    }
    setLyrics(finalResult)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value)
  }

  return (
    <Layout>
      <h1>Generate Lyrics</h1>
      <p>What is your song about?</p>
      <div className='info-holder' style={{ margin: '20px 0px 10px 0px' }}>
        <small>
          <span style={{ color: '#c180ff' }}>BETA:</span> Simple words will work
          better than complex ideas. E.g., &quot;love&quot; will work better
          than &quot;the fading memory of my first love from that fateful summer
          of 1979&quot;
        </small>
      </div>
      <input
        placeholder='Type a song theme here'
        onChange={handleChange}
      ></input>
      <button onClick={() => getLyrics()}>Generate lyrics</button>
      <div className={lyricsStyles.lyricsHolder}>{lyrics}</div>
    </Layout>
  )
}
